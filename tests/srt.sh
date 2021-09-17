#!/bin/bash
#---
# Excerpted from "Design and Build Great Web APIs",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
#---

###################################################
# simple request test (SRT) script
# 2020-02 mamund
#
# assumes:
# - npm run dev
# - curl
#
# NOTE: 
#   - encode spaces as %20 in requests
#   - in request list file, # lines are ignored
#   - in request list file, empty lines are ignored
###################################################

###################################################
# kill associated procs when done
trap "kill 0" EXIT 

echo
echo "Simple Request Tests (SRTs)"
echo "================================"
date

###################################################
# manage input file
infile=""
outfile=""

if [ -z "$1" ]
then
  infile="srt-list.txt"
else
  infile="$1"
fi

if [ ! -z "$2" ]
then
  outfile="$2"
fi

if [ -f "$outfile" ]
then
  rm $outfile
fi

echo
echo "reading input file: $infile..."

###################################################
# start target service
echo
echo start API service...
npm run dev &

###################################################
# allow service to spin up
echo
echo sleeping...
sleep 5 

###################################################
# run requests
echo 
echo start request run...
while IFS= read -r line
do 
  if [ ! -z "$line" ] && [ ${line:0:1} != "#" ]
  then 
    echo
    echo "$line"
    if [ -z "$outfile" ]
    then
      curl $line
    else
      echo "$line" >> $outfile
      curl --silent --show-error --fail $line >> $outfile
    fi
  fi
done < $infile  

###################################################
# all done
echo 
echo "job completed."
echo

###################################################
# EOF
###################################################

