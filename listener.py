import argparse
import traceback

from pythonosc import dispatcher
from pythonosc import osc_server

ADDRESS = "/Instructions"


message = ""
swift = None

# def init_swift(swift):
#     response = None
#     if(not swift):
#         logger_init(logging.DEBUG)
#         response = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
#         print('sleep 2 sec ...')
#         sleep(2)
#         print('device info: ')
#         print(response.get_device_info())
#         print("Allowing extrusion")
#         response.send_cmd_sync("M302 S0")
#     return response


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

