import itertools
import string
from itertools import chain
from ligase_experiment import config


def pipette_indices_generator(num_of_columns: int, num_of_rows: int):
    # generate pipette columns indices
    column_names = list(string.ascii_uppercase)[0:num_of_columns]
    pipette_indices = iter([])
    for column_name in column_names:
        p = itertools.combinations([column_name + str(i) for i in range(1, num_of_rows + 1)], 1)
        pipette_indices = chain(pipette_indices, p)
    while True:
        try:
            yield "".join(next(pipette_indices))
        except StopIteration:
            return

if __name__ == '__main__':
    generator = pipette_indices_generator(8, 12)
    for i in range (100000):
        print(next(generator))
