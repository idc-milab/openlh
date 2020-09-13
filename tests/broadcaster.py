from pythonosc.udp_client import SimpleUDPClient
import time

address = "/Instructions"

c = SimpleUDPClient('127.0.0.1', 5001)

time.sleep(2)

message = "print(\"this is my message and"
# Can only pass up to 9000 characters.
c.send_message(address, message)

time.sleep(1)

message = "it is being executed!!\")"
# Can only pass up to 9000 characters.
c.send_message(address, message)


time.sleep(1)
c.send_message(address, "___code___")
