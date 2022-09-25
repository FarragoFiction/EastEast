#!/bin/bash

ffmpeg -r 10 -i 000%2d-img.png -pix_fmt yuv420p out.mp4

