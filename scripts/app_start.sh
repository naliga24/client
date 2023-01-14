#!/bin/bash
cd /home/ec2-user/server
npm run build
echo "After Build"
node -e "console.log('Running node.js '+process.version)"
pm2 start npm --name "swaptokenapp" -- start
pm2 startup
pm2 save
pm2 restart all
