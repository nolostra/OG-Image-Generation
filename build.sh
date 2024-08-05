#!/bin/bash

# Install zlib 1.2.9
wget http://www.zlib.net/zlib-1.2.9.tar.gz
tar -xvf zlib-1.2.9.tar.gz
cd zlib-1.2.9
./configure
make
sudo make install

# Navigate back to project root directory
cd ..

# Continue with the build
npm install
npm run build
