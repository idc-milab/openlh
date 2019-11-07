
import sys, os
from time import sleep

from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *

#logger_init(logging.VERBOSE)
logger_init(logging.DEBUG)
# logger_init(logging.INFO)

print("retrieveing coords from file")
coords = []
with open("coords_pepe.txt", 'r') as f:
    for line in f:
        x, y = line.strip().split(",")
        coords.append({'x': x, "y": y})

print("Will process {} BioDots".format(len(coords)))
print('setup swift ...')

#swift = SwiftAPI(dev_port = '/dev/ttyACM0')
#swift = SwiftAPI(filters = {'hwid': 'USB VID:PID=2341:0042'})
swift = SwiftAPI() # default by filters: {'hwid': 'USB VID:PID=2341:0042'}


print('sleep 2 sec ...')
sleep(2)

print('device info: ')
print(swift.get_device_info())
print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")
print('get_position:', swift.get_position())
print('\nset X10 Y193 z50 F1500 ...')
current_z = swift.get_position()[2]
swift.set_position(10, 193, 50, speed = 1500, timeout = 20)
swift.se
# swift.flush_cmd() # avoid follow 5 command timeout

offset_x = 0
offset_y = 193
total = len(coords)
i = 0
for i in range(50):
    print("e={}".format(i/2))
    swift.set_position(10, 193, 50, extrude=i/2, wait=True, speed=500, timeout = 30)
    sleep(1)
    swift.set_wrist()

# for coord in coords:
#     xcord = str(int(coord['x']) + offset_x)
#     ycord = str(int(coord['y']) + offset_y)
#     print(xcord, ycord)
#     swift.set_position(x=xcord, y=ycord, speed=1500, wait=True)
#     print('get_position:', swift.get_position())
#     swift.set_position(z=40, wait=True, speed=500)
#     print('get_position:', swift.get_position())
#     swift.set_position(z=45, wait=True, speed=500)
#     print("{i}/{total}".format(i=i, total=total))
#     i+=1
#
#

# swift.flush_cmd() # avoid follow 5 command timeout
#
# print('set X340 ...')
# swift.set_position(x = 340)
# print('set X320 ...')
# swift.set_position(x = 320)
# print('set X300 ...')
# swift.set_position(x = 300)
# print('set X200 ...')
# swift.set_position(x = 200)
# print('set X190 ...')
# swift.set_position(x = 190)
#
# # wait all async cmd return before send sync cmd
# swift.flush_cmd()
#
# print('set Z100 ...')
# swift.set_position(z = 100, wait = True)
# print('set Z150 ...')
# swift.set_position(z = 150, wait = True)
#
# swift.set_buzzer()

print('done ...')
while True:
    sleep(1)

