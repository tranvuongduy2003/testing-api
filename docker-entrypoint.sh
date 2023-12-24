#!/bin/bash

dockerize -wait tcp://mysql:3307 -timeout 20s

echo "Start Wait Mysql"
