#!/usr/bin/bash

all_files=$(ls ./src/**/*.js)

for js_file in $all_files; do
    file_name=$( echo "$js_file" | cut -d '.' -f 2 )
    ts_file=".$file_name.ts"
    echo "$js_file -> $ts_file"
    mv "$js_file" "$ts_file"
done