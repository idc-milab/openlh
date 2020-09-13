from time import sleep

from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
logger_init(logging.DEBUG)

def report_position(position):
    print("x:{x} y:{y} z:{z} ".format(x=position[0], y=position[1], z=position[2]))


swift = SwiftAPI() # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
sleep(2)
swift.send_cmd_sync("M2019")
"""Normally, all joint could be attach by command:

M17        # for all, or
M2201 N0~3 # for specified joint
detach by:

M2019      # for all, or
M2202 N0~3 # for specified joint
"""
swift.register_report_position_callback(report_position)
swift.set_report_position(1)

while(True):
    pass

