import sys, os
from time import sleep

from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
logger_init(logging.DEBUG)

print("retrieveing coords from file")
coords = []

with open("40by40flip.png.coords", 'r') as f:
    for line in f:
        x, y = line.strip().split(",")
        coords.append((float(x), float(y)))

sleep(2)
swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}

current_liquid = 0
release_step = 0.025
total_liquid = release_step * (len(coords) + 500)
step_proportional = 2
protection_sip = 1.5
starting_x = 164.36
starting_y = -19
printing_z = 28.5

print('sleep 2 sec ...')
sleep(2)

print('device info: ')
print(swift.get_device_info())

print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")

print('get_position:', swift.get_position())
swift.set_wrist(90)
swift.set_position(120, 0, 50, speed=15000, wait=True) # Home
swift.set_position(131, -5, 90, speed=15000, wait=True)

#swift.set_position(139.88, -112.31, 60.24, speed=30000, timeout=30, wait=True) # Center in first pippet
#swift.set_position(z=-43.25, speed=30000, timeout=30, wait=True)  # Acquire pippet
#swift.set_position(z=-60, speed=300, timeout=30, wait=True)  # Acquire pippet
#swift.set_position(z=-65, speed=300, timeout=30, wait=True)  # Acquire pippet
#swift.set_position(z=-69, speed=300, timeout=30, wait=True)  # Acquire pippet
#sleep(0.1)
#swift.set_position(z=60.24, speed=30000, timeout=30, wait=True)

swift.set_position(x=221, y=-114.5, z=80, speed=30000, timeout=30, wait=True) # Center to water
swift.set_position(z=62, speed=30000, timeout=30, wait=True)  # Get close
swift.set_position(z=57, speed=700, timeout=30, wait=True)  # Smooth in

swift.set_position(e=-total_liquid, speed=1500, timeout=30, wait=True)
current_liquid = -total_liquid
swift.set_position(z=80, speed=30000, timeout=30, wait=True)

swift.set_position((step_proportional * coords[0][0] ) + starting_x, (step_proportional * coords[0][1] )+ starting_y, speed=30000, timeout=30, wait=True)
# swift.set_position(z=printing_z, wait=True)

picture = coords
total_len = len(picture)
current_step = 0
for x, y in picture:
    current_step += 1
    print("{c_step}/{total}".format(c_step=current_step, total=total_len))
    current_liquid += release_step
    swift.set_position(z=printing_z, wait=True)
    swift.set_position(e=current_liquid, wait=True, speed=500)
    swift.set_position(z=printing_z + 3, wait=True)
    print(x, y)
    swift.set_position(x=starting_x + (step_proportional * x), y=starting_y + (step_proportional * y), wait=True, speed=1500)
    sleep(0.1)

# Last step that was not printed
current_liquid -= release_step
swift.set_position(z=printing_z, wait=True)
swift.set_position(e=current_liquid, wait=True, speed=300)
swift.set_position(z=printing_z+3, wait=True)

# Protection Sip
swift.set_position(e=current_liquid+protection_sip)

# Go up
swift.set_position(z=-40, wait=True)
swift.set_position(z=85, speed=30000, wait=True)

# Dispose pipet
swift.set_position(300, -175, 85, speed=30000, timeout=20, wait=True)
swift.set_position(300, -175, 50, speed=30000, timeout=20, wait=True)
swift.set_position(300, -175, 10, speed=3000, timeout=20, wait=True)
swift.set_wrist(0, wait=True)
sleep(1)
swift.set_wrist(90, wait=True)
sleep(2)
swift.set_position(z=85, speed=30000, wait=True)

swift.set_position(e=0, timeout=60)
swift.set_position(z=85, speed=30000, wait=True)

# Homing
swift.set_position(120, 0, 50, speed=30000, timeout=30, wait=True)
sleep(5)
