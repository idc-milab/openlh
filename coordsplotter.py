import os, sys
from bokeh.plotting import figure
from bokeh.models import Range1d
from bokeh.resources import CDN
from bokeh.embed import file_html

filename = sys.argv[1]
x_coords = []
y_coords = []

with open(os.path.join('uploads\coords\\', filename + '.coords'), 'r') as f:
    for line in f:
        x, y = line.strip().split(',')
        x_coords.append(x)
        y_coords.append(y)

graph = figure(plot_width=500, plot_height=500)
graph.x_range = Range1d(0, 50)
graph.y_range = Range1d(0, 40)
graph.circle(x_coords, y_coords, size=10, color='navy', alpha=0.5)

html = file_html(graph, CDN, filename + ' Layout')
f = open(os.path.join('templates\\', filename + '.html'), 'w')
f.write(html)
f.close()
