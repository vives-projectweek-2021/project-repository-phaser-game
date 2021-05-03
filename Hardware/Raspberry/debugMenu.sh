#!/bin/bash
# Bash Script with selection
while true
do
        clear
        echo "----------Debug Menu----------"
        echo "UP)       Manage Power"
        echo "DOWN)     Manage kiosk"
        echo "RIGHT)    Quit"
        echo -e "\n"
        echo "Choose an option: "
        read answer
        case "$answer" in
        1)
                while true
                do
                        clear
                        echo "----------Manage power----------"
                        echo "UP)       Shutdown"
                        echo "DOWN)     Reboot"
                        echo "RIGHT)    Quit"
                        echo -e "\n"
                        echo "Choose an option: "
                        read answer
                        case "$answer" in
                        1)
                                echo "shutting down... please don't do annything!"
                                sudo shutdown
                                exit
                        ;;
                        2)
                                echo "rebooting... please don't do annything!"
                                sudo reboot
                                exit
                        ;;
                        4)      exit;;
                esac
                done
        ;;
        2)
                while true
                do
                        clear
                        echo "----------Manage Kiosk----------"
                        echo "UP)       Update repo from git"
                        echo "DOWN)     Kill kiosk and open desktop"
                        echo "LEFT)     Restart Kiosk"
                        echo "RIGHT)    Quit"
                        echo -e "\n"
                        echo "Choose an option: "
                        read answer
                        case "$answer" in
                        1)
                                /home/pi/Desktop/updateRepo.sh
                                echo "Press anny button to continue."
                                read nothing
                        ;;
                        2)
                                pkill -o chromium
                                chvt 7
                                exit
                        ;;
                        3)
                                pkill -o chromium
                                chvt 7
                                /home/pi/Desktop/Kiosk.sh
                                exit
                                ;;
                        4)      exit;;
                esac
                done
        ;;
        4)
                echo "Please disarm the killswitch to continue."
                echo "This is the only way to tell the arduino to continue in operation mode"
                exit
        ;;
esac
done