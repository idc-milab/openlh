import logging
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D


def grid_generator(top_left, top_right, bottom_left, bottom_right, size):
    # casting parameters
    size = int(size)
    top_left = dict(top_left)
    top_right = dict(top_right)
    bottom_left = dict(bottom_left)
    bottom_right = dict(bottom_right)

    # init variables
    num_of_columns = int(np.sqrt(size * 3 / 2))
    num_of_rows = int(size / num_of_columns)
    first_row_x = np.linspace(top_left['x'], top_right['x'], num_of_columns)
    first_row_y = np.linspace(top_left['y'], top_right['y'], num_of_columns)
    first_row_z = np.linspace(top_left['z'], top_right['z'], num_of_columns)
    last_row_x = np.linspace(bottom_left['x'], bottom_right['x'], num_of_columns)
    last_row_y = np.linspace(bottom_left['y'], bottom_right['y'], num_of_columns)
    last_row_z = np.linspace(bottom_left['z'], bottom_right['z'], num_of_columns)
    max_z = max(max(first_row_z), max(last_row_z))

    coordinates_dict = {}
    fig = plt.figure()
    fig.canvas.set_window_title('Microplate Modeling')
    ax = Axes3D(fig)
    ax.set_zlim(bottom=0, top=max_z*2)
    ax.set_title('3D Modeling of the grid')
    logging.getLogger('matplotlib.font_manager').disabled = True
    logging.getLogger('matplotlib.axes._base').disabled = True

    # iterate and build columns
    for i in range(num_of_columns):
        column_x = np.linspace(first_row_x[i], last_row_x[i], num_of_rows)
        column_y = np.linspace(first_row_y[i], last_row_y[i], num_of_rows)
        column_z = np.linspace(first_row_z[i], last_row_z[i], num_of_rows)
        ax.scatter(column_x, column_y, column_z, c='black')
        column_x, column_y, column_z = list(column_x), list(column_y), list(column_z)
        char = 'A'
        for coord in (zip(column_x, column_y, column_z)):
            coordinates_dict[f"{char}{i+1}"] = {'x': coord[0], 'y': coord[1], 'z': coord[2]}
            char = chr(ord(char) + 1)

    # find the center of the grid
    center_points_x = []
    center_points_y = []
    center_points_z = []
    center_rows_indices = [chr(ord('A') + num_of_rows // 2)]
    if num_of_rows % 2 == 0:
        center_rows_indices.append(chr(ord('A') - 1 + num_of_rows//2))
    center_columns_indices = [num_of_columns // 2 + 1]
    if num_of_columns % 2 == 0:
        center_columns_indices.append(num_of_columns//2)
    for i in center_rows_indices:
        for j in center_columns_indices:
            center_points_x.append(coordinates_dict[f"{i}{j}"]['x'])
            center_points_y.append(coordinates_dict[f"{i}{j}"]['y'])
            center_points_z.append(coordinates_dict[f"{i}{j}"]['z'])
    average_x = np.average(np.array(center_points_x))
    average_y = np.average(np.array(center_points_y))
    average_z = np.average(np.array(center_points_z))
    coordinates_dict[f"center"] = {'x': average_x, 'y': average_y, 'z': average_z}

    # plotting
    ax.scatter(average_x, average_y, average_z)
    plt.grid()
    plt.show()

    return coordinates_dict


if __name__ == '__main__':
    print(grid_generator(top_left={'x': -5, 'y': -2, 'z': 2, 'e': None, 'speed': None},
                         top_right={'x': 5, 'y': 0, 'z': 7, 'e': None, 'speed': None},
                         bottom_left={'x': -4, 'y': -7, 'z': 2, 'e': None, 'speed': None},
                         bottom_right={'x': 6, 'y': -5, 'z': 5, 'e': None, 'speed': None},
                         size=96))
