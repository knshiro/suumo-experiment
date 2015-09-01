#!/bin/bash

for (( i=0; i<=15000; i = $i + 2500 ))
do
  wget "https://www.kimonolabs.com/api/csv/7ytvjmhq?apikey=$SUUMO_API_KEY&kimmodify=1&kimoffset=${i}&kimlimit=2500" -O ${i}.csv
done
