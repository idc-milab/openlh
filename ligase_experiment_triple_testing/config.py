import itertools
import string


def build_config(amount_of_wells_per_stage: int = 24):
    z = itertools.combinations(['Z' + str(i) for i in range(amount_of_wells_per_stage)], 1)
    z = [i[0] for i in z]

    config = {
        'num_of_rows': 12,
        'num_of_columns': 8,
        'num_of_molecules_per_z': 3,
        'z': z,
        'stage_1_columns_names': ['A', 'B'],
        'stage_2_columns_names': ['D', 'E'],
        'stage_3_columns_names': ['G', 'H'],
        'ejecting_or_loading_extra_amount_delta': 15,
        'stage_1_amount': 60,
        'stage_2_amount': 60,
        'moving_speed': 25000
        }

    config['amount_of_wells_per_stage'] = config['num_of_rows'] * 2

    # generate pipette columns indices
    column_names = list(string.ascii_uppercase)[0:config['num_of_columns']]
    pipette_indices = []
    for column_name in column_names:
        p = itertools.combinations([column_name + str(i) for i in range(1, config['num_of_rows'] + 1)], 1)
        pipette_indices += [i[0] for i in p]
    config['pipette_indices'] = pipette_indices

    return config


config = build_config()
