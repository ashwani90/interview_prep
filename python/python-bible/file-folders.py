'''

There are different modes you can open a file with, specified by the mode parameter. These include:
'r' - reading mode. The default. It allows you only to read the file, not to modify it. When using this mode the
file must exist.
'w' - writing mode. It will create a new file if it does not exist, otherwise will erase the file and allow you to
write to it.
'a' - append mode. It will write data to the end of the file. It does not erase the file, and the file must exist for
this mode.
'rb' - reading mode in binary. This is similar to r except that the reading is forced in binary mode. This is
also a default choice.
'r+' - reading mode plus writing mode at the same time. This allows you to read and write into files at the
same time without having to use r and w.
'rb+' - reading and writing mode in binary. The same as r+ except the data is in binary
'wb' - writing mode in binary. The same as w except the data is in binary.
'w+' - writing and reading mode. The exact same as r+ but if the file does not exist, a new one is made.
Otherwise, the file is overwritten.
'wb+' - writing and reading mode in binary mode. The same as w+ but the data is in binary.
'ab' - appending in binary mode. Similar to a except that the data is in binary.
'a+' - appending and reading mode. Similar to w+ as it will create a new file if the file does not exist.
Otherwise, the file pointer is at the end of the file if it exists.
'ab+' - appending and reading mode in binary. The same as a+ except that the data is in binary.
'''

with open(filename, 'r') as f:
 f.read()
with open(filename, 'w') as f:
 f.write(filedata)
with open(filename, 'a') as f:
 f.write('\\n' + newd)

try:
 with open("fname", "r") as fout:
 # Work with your open file
except FileExistsError:
 # Your error handling goes here

# reading a file line by line
with open('myfile.txt', 'r') as fp:
 for line in fp:
 print(line)
# readline() allows for more granular control over line-by-line iteration. The example below is equivalent to the one
above:
with open('myfile.txt', 'r') as fp:
 while True:
 cur_line = fp.readline()
 # If the result is an empty string
 if cur_line == '':
 # We have reached the end of the file
 break
 print(cur_line)

# iterate files
import os 
for root, folders, files in os.walk(root_dir):
 for filename in files:
    print(root, filename)

# check if file is empty

if os.path.getsize('filename.txt') == 0:
    print("File is empty")

