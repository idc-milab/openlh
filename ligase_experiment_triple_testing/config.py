import itertools
import string


def build_config(amount_of_wells_per_stage: int = 24):
    z = itertools.combinations(['Z' + str(i) for i in range(amount_of_wells_per_stage)], 1)
    z = [i[0] for i in z]

    config = {
        'pipettes_plate_num_of_rows': 12,
        'pipettes_plate_num_of_columns': 8,
        'materials_plate_num_of_rows': 12,
        'materials_plate_num_of_columns': 8,
        'num_of_molecules_per_z': 3,
        'z': z,
        'stage_1_columns_names': ['A', 'B', 'C'],
        'stage_2_columns_names': ['D', 'E', 'F'],
        'stage_3_columns_names': ['A', 'B', 'C'],  # we are using two 96 wells micro plates. stage 3 is on the second plate
        'ejecting_or_loading_extra_amount_delta': 15,
        'stage_1_amount': 60,
        'stage_2_amount': 60,
        'mixing_amount': 50,
        'mixing_num_of_iterations': 3,
        'moving_speed': 25000
    }

    config['amount_of_wells_per_stage'] = config['materials_plate_num_of_rows']

    # generate pipette columns indices
    column_names = list(string.ascii_uppercase)[0:config['pipettes_plate_num_of_columns']]
    pipette_indices = []
    for column_name in column_names:
        p = itertools.combinations([column_name + str(i) for i in range(1, config['pipettes_plate_num_of_rows'] + 1)], 1)
        pipette_indices += [i[0] for i in p]
    config['pipette_indices'] = pipette_indices

    return config


config = build_config()
