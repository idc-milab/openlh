from uf.wrapper.swift_api import SwiftAPI
from uf.utils.log import *
from time import sleep
import numpy as np
import matplotlib.path as mplPath
import matplotlib.pyplot as plt

'''
Below here define the parameters
protocol parameters
================
rows - how many rows in the grid
cols - how many cols in the grid
speed - at what speed to do the extrusion
vol - how much extrusion to proudce on each point of the grid
pipette - how much extrusion to capture for the pipette
distance - space between each row and each column
height - at which z the dispensing should occure
===============

setup parameters
===============

a = x,y of the first corner
b = x,y of the second corner
c = x,y of the third corner
d = x,y of the fourth corner
l = x,y,z of the liquid deposit
'''

# Grid dimensions
rows = 3
cols = 3

# Extrusion parameters
speed = 5000
# vol = 0.8 # How much on each dispensing

# pipette is how much is on the ppipete,
# max volume
# pipette = (vol * rows * cols * 1.2) * -1  # Ensure there's 10% extra volume to pipette NEEDS to be negative
pipette = -60
vol = (pipette/(rows*cols)) * -1
print(pipette)
print(vol)
distance = 3  # Distance between points
height = 29.9  # Z-axis height for dispensing
# Corner points of the grid
a = (205, 40)
b = (218, 40)
c = (220, 54)
d = (205, 54)
l = (190.4, -16.66, 36) # Where is the liquid
corners = [a, b, c, d, a]  # Loop back to a to close the shape

def calc_points(corners, rows, cols, distance):
    # Create path from corners to form a polygon
    poly_path = mplPath.Path(np.array(corners[:-1]))  # Remove the last point used for visual closure

    # Calculate the center of the polygon
    center_x = np.mean([point[0] for point in corners])
    center_y = np.mean([point[1] for point in corners])
    # Calculate the starting point of the grid so that the grid will be centered on the polygon center
    start_x = center_x - (cols - 1) / 2 * distance
    start_y = center_y - (rows - 1) / 2 * distance

    # Generate points
    points = []
    for i in range(rows):
        for j in range(cols):
            x = start_x + j * distance
            y = start_y + i * distance
            # Check if the point is inside the polygon
            points.append((x, y, height))
            # if poly_path.contains_point((x, y)):
            #     print(f"Point ({x}, {y}) is ON outside the boundary.")

    return points

def euclidean_distance(p1, p2):
    """Calculate the Euclidean distance between two points."""
    return np.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def nearest_neighbor(points, start_index=0):
    """Sort points by the nearest neighbor algorithm starting from the given index."""
    if not points:
        return points

    # Start from the initial point
    path = [points.pop(start_index)]
    while points:
        last_point = path[-1]
        # Find the nearest point to the last point in the path
        nearest_index = np.argmin([euclidean_distance(last_point, p) for p in points])
        # Add the nearest point to the path and remove it from the remaining points
        path.append(points.pop(nearest_index))
    
    return path


# Calculate the points
grid_points = calc_points(corners[:-1], rows, cols, distance)  # Exclude the repeated corner
# print(grid_points)

sorted_points = nearest_neighbor(grid_points.copy())
# print("Optimal path through points:", sorted_points)
def plot_points():
    # Plotting
    plt.figure(figsize=(8, 6))
    # Plot the polygon
    plt.plot([p[0] for p in corners], [p[1] for p in corners], label='Boundary')
    # Plot the points
    for point in grid_points:
        plt.plot(point[0], point[1], 'ro')  # 'ro' stands for red circles
    xl,yl,zl = l 
    plt.plot(xl, yl, 'bo')  # 'ro' stands for red circles

    plt.xlabel('X Coordinate')
    plt.ylabel('Y Coordinate')
    plt.title('Visualization of Grid Points within the Boundary')
    plt.legend()
    plt.grid(True)
    plt.axis('equal')  # Ensures equal scaling on both axes
    plt.show()

def plot_sorted():
    # Plotting
    plt.figure(figsize=(8, 6))
    # Plot the path
    for i in range(len(sorted_points) - 1):
        plt.plot([sorted_points[i][0], sorted_points[i+1][0]], [sorted_points[i][1], sorted_points[i+1][1]], 'b-o')  # Path lines

    # Annotate points with their indices
    for idx, point in enumerate(sorted_points):
        plt.plot(point[0], point[1], 'ro')  # Red points
        plt.text(point[0], point[1], f' {idx}', color='blue', fontsize=12, ha='right')  # Show index near each point

    plt.xlabel('X Coordinate')
    plt.ylabel('Y Coordinate')
    plt.title('Visualization of Optimized Path with Indices')
    plt.grid(True)
    plt.axis('equal')  # Ensures equal scaling on both axes
    plt.show()

def print_points():
    print("Will start printing soon")
    print("MAKE SURE PIPETE IS ON")
    sleep(5)

    logger_init(logging.DEBUG)
    global swift

    swift = SwiftAPI()  # default by filters: {'hwid': 'USB VID:PID=2341:0042'}
    sleep(2)
    print("Allowing extrusion")
    swift.send_cmd_sync("M302 S0")

    def report_position(position):
        print(position)
        print("x:{x} y:{y} z:{z} ".format(x=position[0], y=position[1], z=position[2]))
    swift.register_report_position_callback(report_position)
    swift.set_report_position(1)

    print('get_position:', swift.get_position())
    swift.set_wrist(90)
    swift.set_position(120, 0, 50, speed=15000, wait=True) # Home

    ## Start by getting liquid
    xl,yl,zl = l
    liquid_speed = 10000
    swift.set_position(xl, yl, zl + 120, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 50, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 10, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 5, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 3, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 5, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 3, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 5, speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl , speed=liquid_speed, wait=True) 
    ## TAKE LIQUID
    swift.set_position(e=pipette, wait=True, speed=15000)
    delta_on_pipetteing = pipette * 0.9
    swift.set_position(e=pipette+delta_on_pipetteing, wait=True, speed=15000)
    swift.set_position(e=pipette-delta_on_pipetteing, wait=True, speed=15000)
    # swift.set_position(e=pipette+delta_on_pipetteing, wait=True, speed=15000)
    # swift.set_position(e=pipette-delta_on_pipetteing, wait=True, speed=15000)
    # swift.set_position(e=pipette+delta_on_pipetteing, wait=True, speed=15000)
    # swift.set_position(e=pipette-delta_on_pipetteing, wait=True, speed=15000)
    swift.set_position(e=pipette, wait=True, speed=15000)

    ## END TAKE LIQUID
    swift.set_position(xl, yl, zl + 5 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 10 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 20 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 30 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 50 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 70 , speed=liquid_speed, wait=True) 
    swift.set_position(xl, yl, zl + 100 , speed=liquid_speed, wait=True) 
    swift.set_position(120, 0, 50, speed=15000, wait=True) # Home


    first_point = sorted_points[0]
    print(first_point)
    x_first,y_first, z_first = first_point
    current_liquid = pipette
    print(current_liquid)
    swift.set_position(x_first, y_first, height + 60, speed=15000, wait=True) # Home
    current_liquid += 1 # to have some liquid out before
    swift.set_position(e=current_liquid, wait=True, speed=10 * 100)
    swift.set_position(x_first, y_first, height + 60, speed=15000, wait=True) # Home
    for path_point in sorted_points:
        x_path, y_path, z_path = path_point
        current_liquid += vol
        swift.set_position(x_path, y_path, height + 10, speed=15000, wait=True) # Home
        swift.set_position(z= height + 5, speed=3000, wait=True) # Home
        print("CURRENT LIQUID ")
        print(current_liquid)
        swift.set_position(e=current_liquid, wait=True, speed=10 * 100)
        swift.set_position(z= height, speed=3000, wait=True) # Home
        swift.set_position(z=height-0.3, wait=True, speed=100)

        swift.set_position(z= height + 5, speed=3000, wait=True) # Home
        sleep(0.2)

    swift.set_position(z=110, speed=30000, timeout=30, wait=True)
    swift.set_position(120, 0, 50, speed=15000, wait=True) # Home
    swift.set_position(e=50, speed=15000, wait=True) # Home
    swift.set_position(e=0, speed=15000, wait=True) # Home

    sleep(10)


# u
plot_sorted() # This prints the pathj of the print
# plot_points()  # This prints the represation of the points over the boundary
# print_points() # Actually uses the robot
