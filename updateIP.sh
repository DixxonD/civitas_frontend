#!/bin/bash

#load the old IP
cd ~/frontend || exit
OLDIP=$("cat ip")

#load the current IP
MYIP=$("ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'")
if [ -z "$var" ]
then
      MYIP=$("ip -4 addr show wlan0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'")
fi

#compare the two IPs
if [ "$OLDIP" = "$MYIP" ]; then
    echo "IP is still the same"
else
    echo "IP has changed"
    echo "$MYIP" > ip
    BACKEND_IP=$MYIP pm2 restart backup_front --update-env
fi


