#!/bin/sh
DISPLAY=:0.0 xset s noblank
DISPLAY=:0.0 xset s off
DISPLAY=:0.0 xset -dpms

DISPLAY=:0.0 unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/usr/bin/chromium-browser --no-sandbox --display=:0.0 --noerrdialogs --disable-infobars --kiosk  http://localhost/site/pi.html

