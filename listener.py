"""
A listener registered to receive messages being sent from the app through SimpleUDPClient.
The message will include one of the following:
1. python code with instructions for the arm - using the SwiftAPI and generated on the Blockly environment.
2. an abort command to stop the running thread.
messages will always end with "xxx" string, indicating that the whole message was received successfully
transferred.
"""

import threading
import argparse
import time
import traceback
import sys

from pythonosc import dispatcher
from pythonosc import osc_server

sys.path.append('pyuf/')
address = "/Instructions"
message = ""
thread = None
swift = None


class ArmStoppableThread(threading.Thread):
    """
    A stoppable thread, stop using the 'kill' method.
    """

    def __init__(self, *args, **keywords):
        threading.Thread.__init__(self, *args, **keywords)
        self.killed = False

    def start(self):
        self.__run_backup = self.run
        self.run = self.__run
        threading.Thread.start(self)

    def __run(self):
        sys.settrace(self.globaltrace)
        self.__run_backup()
        self.run = self.__run_backup

    def globaltrace(self, frame, event, arg):
        if event == 'call':
            return self.localtrace
        else:
            return None

    def localtrace(self, frame, event, arg):
        if self.killed:
            if event == 'line':
                # after aborting the running program, return to init state
                time.sleep(1)
                # move to starting position
                swift.set_position(120, 0, 50, speed=1500,
                                   timeout=30, wait=True)
                # eject remaining liquid (if exists)
                swift.set_position(e=0, speed=1500, timeout=30, wait=True)
                # close port
                time.sleep(1)
                swift.close_conn()
                raise SystemExit()
        return self.localtrace

    def kill(self):
        self.killed = True


def execute_code(code):
    """
    exec wrapper
    :param code: String representing Python code to execute
    """
    exec(code)


def callback(address="default", data="default"):
    try:
        print("__ Message Received ___")
        global message, thread
        message += data

        # the message is python code to run with arm
        if message[-10:] == "___code___":
            print("\t+ execute code")
            print(message)

            # Execute code.
            thread = ArmStoppableThread(
                target=execute_code, args=(message[:-10],))
            thread.start()

            # Clean message buffer
            message = ""

        # the message is an abort command (stop the running program)
        elif message[-10:] == "___kill___":
            print("\t+ abort code running")
            if thread is not None:
                thread.kill()
                thread.join()
                if not thread.isAlive():
                    print('thread killed')
            else:
                print("no thread to kill")
            # Clean message buffer
            message = ""

    except Exception as e:
        print('Error, Msg: %s, %s' % (e, traceback.format_exc()))


# Set up address and port.
parser = argparse.ArgumentParser()
parser.add_argument("--ip",
                    default="127.0.0.1", help="The ip to listen on")
parser.add_argument("--port",
                    type=int, default=5001, help="The port to listen on")
args = parser.parse_args()

dispatch = dispatcher.Dispatcher()
dispatch.map(address, callback)

server = osc_server.ThreadingOSCUDPServer(
    (args.ip, args.port), dispatch)
print("Serving on {}".format(server.server_address))
server.serve_forever()
