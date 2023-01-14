#!/bin/bash
cd /home/ec2-user/server
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum -y install nodejs npm
