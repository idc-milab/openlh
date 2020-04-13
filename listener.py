"""
A listener registered to receive messages which was sent from the app through SimpleUDPClient.
The message will include strings with python code including instructions for the arm - using SwiftAPI and generated
on the Blockly environment. messages will always end with "xxx" string, indicating that the whole message successfully
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


class threadWithTrace(threading.Thread):
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
                swift.set_position(e=0, speed=1500, timeout=30, wait=True)  # eject remaining liquid (if exists)
                swift.set_position(120, 0, 50, speed=1500, timeout=30, wait=True)  # move to starting position
                time.sleep(1)
                swift.close_conn()  # close port
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


def print_function(address="default", data="default"):
    try:
        print("__ Message Received ___")
        global message, thread
        message += data

        if message[-10:] == "___code___":  # the message is a code to run with arm
            print("\t+ execute code")
            print(message)

            # Execute code.
            thread = threadWithTrace(target=execute_code, args=(message[:-10],))
            thread.start()

            # Clean message buffer
            message = ""

        elif message[-10:] == "___kill___":  # the message is abort command (stop the running program)
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
dispatch.map(address, print_function)

server = osc_server.ThreadingOSCUDPServer(
    (args.ip, args.port), dispatch)
print("Serving on {}".format(server.server_address))
server.serve_forever()
