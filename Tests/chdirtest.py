import os

f = open(os.path.join('uploads/coords', 'text.txt'), 'r')
for line in f:
    print(line)

print(os.getcwd())

os.system(os.path.join('uploads', 'convert.bat') + ' 40by40flip.png')