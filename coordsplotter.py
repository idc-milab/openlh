#
# This script receives a .coords file name as a parameter (a list of coordinates representing an image. created by
# uploads/convert.bat) and generates an html page including a visual representation of the image. the html page
# will be saved on the templates folder.
#

import os
import sys
from bokeh.embed import file_html
from bokeh.models import Range1d
from bokeh.plotting import figure
from bokeh.resources import CDN

filename = sys.argv[1]
x_coords = []
y_coords = []

# read the coords file and extract the x any coordinates
with open(os.path.join('uploads\coords\\', filename + '.coords'), 'r') as f:
    for line in f:
        x, y = line.strip().split(',')
        x_coords.append(x)
        y_coords.append(y)

# build a graph representing the image layout
graph = figure(plot_width=500, plot_height=500)
graph.x_range = Range1d(0, 50)
graph.y_range = Range1d(0, 40)
graph.circle(x_coords, y_coords, size=10, color='navy', alpha=0.5)

# build the html template displaying the layout
html = file_html(graph, CDN, filename + ' Layout')
f = open(os.path.join('templates\\', filename + '.html'), 'w')
f.write(html)
f.close()
