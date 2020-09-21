import sys
import liquid_handling_methods as lh
from grid_generator import grid_generator
from ligase_experiment_triple_testing.config import config
from ligase_experiment_triple_testing import utils
sys.path.append('pyuf/')
from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep


def get_well_name(well_idx: int, stage_i_column_name: str):
    # if well_idx <= config['materials_plate_num_of_rows']:
    #     well_name = stage_i_columns_names[0]  # + str(well_idx)
    # else:
    #     well_name = stage_i_columns_names[1]  # + str((well_idx) % config['num_of_rows'])
    #
    div, mod = divmod(well_idx, config['materials_plate_num_of_rows'])
    if mod == 0:
        well_name = str(stage_i_column_name) + str(config['materials_plate_num_of_rows'])
    else:
        well_name = str(stage_i_column_name) + str((well_idx) % config['materials_plate_num_of_rows'])

    return well_name


if __name__ == '__main__':

    # initialize the Uarm
    # logger_init(logging.DEBUG)
    # global swift
    # swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
    # sleep(2)
    # print("Allowing extrusion")
    # swift.send_cmd_sync("M302 S0")
    # swift.send_cmd_sync("G2204 X0.5")

    pipette_grid = None
    materials_grid = None

    pipette_grid_1 = grid_generator({'x': 280.21, 'y': (-120.62), 'z': 35.08, 'e': None, 'speed': None}
                                  , {'x': 183.47, 'y': (-116.18), 'z': 35.24, 'e': None, 'speed': None}
                                  , {'x': 278.31, 'y': (-63.4), 'z': 34.86, 'e': None, 'speed': None}
                                  , {'x': 179.86, 'y': (-60.34), 'z': 34.26, 'e': None, 'speed': None}
                                  , 96)

    pipette_grid_2 = grid_generator({'x': 280.21, 'y': (-120.62), 'z': 35.08, 'e': None, 'speed': None}
                                  , {'x': 183.47, 'y': (-116.18), 'z': 35.24, 'e': None, 'speed': None}
                                  , {'x': 278.31, 'y': (-63.4), 'z': 34.86, 'e': None, 'speed': None}
                                  , {'x': 179.86, 'y': (-60.34), 'z': 34.26, 'e': None, 'speed': None}
                                  , 96)

    # we needed a bigger plate, therefore we used 2 micro plates
    materials_grid_stages_1_and_2 = grid_generator({'x': 225.39, 'y': 25.34, 'z': 37.33, 'e': None, 'speed': None}
                                                   , {'x': 125.49, 'y': 22.57, 'z': 36.64, 'e': None, 'speed': None}
                                                   , {'x': 226.17, 'y': 81.71, 'z': 37.31, 'e': None, 'speed': None}
                                                   , {'x': 128.95, 'y': 73.83, 'z': 37.84, 'e': None, 'speed': None}
                                                   , 96)
    materials_grid_stage_3 = grid_generator({'x': 225.39, 'y': 25.34, 'z': 37.33, 'e': None, 'speed': None}
                                            , {'x': 125.49, 'y': 22.57, 'z': 36.64, 'e': None, 'speed': None}
                                            , {'x': 226.17, 'y': 81.71, 'z': 37.31, 'e': None, 'speed': None}
                                            , {'x': 128.95, 'y': 73.83, 'z': 37.84, 'e': None, 'speed': None}
                                            , 96)

    pipette_indices_generator = utils.pipette_indices_generator(num_of_columns=config['pipettes_plate_num_of_columns'],
                                                                num_of_rows=config['pipettes_plate_num_of_rows'])
    trash = {'x': 172.31, 'y': 134.48, 'z': 161.31, 'e': None, 'speed': None}
    pipette_grid = pipette_grid_1
    amount_of_used_pipettes = 0


    # lh.robot_move_relative(swift=swift, position={'x': 10, 'y': 0, 'z': 0, 'e': None, 'speed': None})
    # lh.set_speed(swift=swift, speed=config['moving_speed'])

    print(f"*********\n*********\nSTAGE 1 -> 2\n*********\n*********\n")
    print("\n____________________________________________________________\n")
    # STAGE 1 -> 2
    for column_name_stage_1, column_name_stage_2 in zip(config['stage_1_columns_names'], config['stage_2_columns_names']):
        for z_idx in range(1, config['amount_of_wells_per_stage'] + 1):
            for molecule_idx in range(config['num_of_molecules_per_z']):
                materials_grid_name_stage_1 = get_well_name(z_idx + molecule_idx, column_name_stage_1)

                pipette_to_pick = next(pipette_indices_generator)
                print(f"pick pipette {pipette_to_pick}")
                # lh.pick_pipette(swift=swift, position=pipette_grid[pipette_to_pick])
                amount_of_used_pipettes += 1
                if amount_of_used_pipettes == config['pipettes_plate_num_of_rows'] * config['pipettes_plate_num_of_columns']:
                    pipette_grid = pipette_grid_2
                    amount_of_used_pipettes = 0

                print(f"*********\nload {materials_grid_name_stage_1}\n*********")
                # lh.load_material(swift=swift, amount=config['stage_1_amount'],
                #                  position=materials_grid_stages_1_and_2[materials_grid_name_stage_1])

                materials_grid_name_stage_2 = get_well_name(z_idx, column_name_stage_2)
                print(f"#########\neject {materials_grid_name_stage_2}\n#########")
                # lh.eject_material(swift=swift,
                #                   amount=config['stage_1_amount'] + config['ejecting_or_loading_extra_amount_delta'],
                #                   position=materials_grid_stages_1_and_2[materials_grid_name_stage_2])

                print(f"drop pipette {pipette_to_pick}")
                # lh.drop_pipette(swift=swift, position=trash)

                print(f"load extra amount delta")
                # lh.load_material(swift=swift, amount=config['ejecting_or_loading_extra_amount_delta'],
                #                  position=trash)

            print("\n____________________________________________________________\n")

    print(f"*********\n*********\nSTAGE 2 -> 3\n*********\n*********\n")
    print("\n____________________________________________________________\n")

    # STAGE 2 -> 3
    for column_name_stage_2, column_name_stage_3 in zip(config['stage_2_columns_names'],
                                                        config['stage_3_columns_names']):
        for z_idx in range(1, config['amount_of_wells_per_stage'] + 1):
            materials_grid_name_stage_2 = get_well_name(z_idx, column_name_stage_2)

            # Mixing stage 2 well
            pipette_to_pick = next(pipette_indices_generator)
            print(f"pick {pipette_to_pick}")
            # lh.pick_pipete(swift=swift, position=pipette_grid[pipette_to_pick])
            amount_of_used_pipettes += 1
            if amount_of_used_pipettes == config['pipettes_plate_num_of_rows'] * config['pipettes_plate_num_of_columns']:
                pipette_grid = pipette_grid_2
                amount_of_used_pipettes = 0

            print(f"mix {materials_grid_name_stage_2}")
            # lh.mix_material(swift=swift,
            #                 position=materials_grid_stages_1_and_2[column_name_stage_2],
            #                 amount=config['mixing_amount'],
            #                 iterations=config['mixing_num_of_iterations'],
            #                 ejecting_delta=config['ejecting_or_loading_extra_amount_delta'],
            #                 position_for_delta_injection=trash)

            # Move 2 -> 3
            print(f"*********\nload {materials_grid_name_stage_2}\n*********")
            # lh.load_material(swift=swift, amount=config['stage_2_amount'],
            #                  position=materials_grid_stages_1_and_2[materials_grid_name_stage_2])

            materials_grid_name_stage_3 = get_well_name(z_idx, column_name_stage_3)
            print(f"#########\neject {materials_grid_name_stage_3}\n#########")
            # lh.eject_material(swift=swift,
            #                   amount=config['stage_2_amount'] + config['ejecting_or_loading_extra_amount_delta'],
            #                   position=materials_grid_stage_3[materials_grid_name_stage_3])

            print(f"drop pipette {pipette_to_pick}")
            # lh.drop_pipette(swift=swift, position=trash)

            print(f"load extra amount delta")
            # lh.load_material(swift=swift, amount=config['ejecting_or_loading_extra_amount_delta'],
            #                  position=trash)

            print("\n____________________________________________________________\n")
    # swift.close_case()

    sleep(1)
    # swift.close_conn()
