#
# A listener registered to receive messages which was sent from the app through SimpleUDPClient.
# The message will include strings with python code including instructions for the arm - using SwiftAPI and generated
# on the Blockly environment. messages will always end with "xxx" string, indicating that the whole message successfully
# transferred.
#

import argparse
import traceback
import sys
sys.path.append('pyuf/')
from pythonosc import dispatcher
from pythonosc import osc_server


ADDRESS = "/Instructions"
message = ""
swift = None


def print_function(address="default", data="default"):
    try:
        print("__ Message Received ___")
        global message
        message += data
        if message[-3:] == "xxx":
            print("\t+ Message completed do whatever you want.")
            print(message)

            # Execute code.
            exec(message[:-3])

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
dispatch.map(ADDRESS, print_function)

server = osc_server.ThreadingOSCUDPServer(
    (args.ip, args.port), dispatch)
print("Serving on {}".format(server.server_address))
server.serve_forever()
