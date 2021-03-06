#!/bin/bash

## wait for the adapter to be initialized
sleep 30



#load the old IP
cd ~/frontend || exit
OLDIP=$(cat ~/baseapplication/app/shell/ip)

#load the current IP
##find out the IP of the node
MYIP=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
if [ -z "$MYIP" ]
then
      MYIP=$(ip -4 addr show wlan0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
fi

#compare the two IPs
if [ "$OLDIP" = "$MYIP" ]; then
    echo "IP is still the same"
else
    echo "IP has changed"
    echo "$MYIP" > ~/baseapplication/app/shell/ip
    pm2 stop backup_front
    pm2 serve ~/frontend/src/pages 8080 --name rebuilding --spa
    REACT_APP_BACKEND_IP=$MYIP npm run build
    pm2 stop rebuilding
    pm2 restart backup_front
fi


