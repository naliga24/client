#!/bin/bash
cd /home/ec2-user/server
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs npm -y
