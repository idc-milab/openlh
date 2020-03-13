import sys

sys.path.append('pyuf/')
from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep

logger_init(logging.DEBUG)
global swift
swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
sleep(2)
print("Allowing extrusion")
swift.send_cmd_sync("M302 S0")

swift.set_position(**dict_args)

sleep(1)
swift.close_conn()
