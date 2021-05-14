# Phaser Game

![Phaser](img/Thumbnail.png)

## About

- [Game-URL](https://phaser.ml)
- [Final video](https://www.youtube.com/watch?v=s3fNe2pG_wg)
- [First concept (the concept before beginning in phaser)](concept.md)
- [Hardware (extra info)](./Hardware)

Our idea is to make an infinite runner game. Where the objective is to get the character as far as possible while avoiding obstacles (and collect coins). But with a twist, this endless runner can be played with a friend, they can try to stop you by droping obstacles and activating debuffs.

We chose an endless runner because you can start very simple and build up from there.

Some endless runners are very well-known for their addictiveness, like Subway Surfers, Temple Run, Jetpack Joyride, Flappy Bird and the Google Dinosaur Game (when you don’t have an internet connection in Chrome).

### Team members

- [Arno Schoutteten](https://github.com/vives-projectweek-2021/projectweek21-report-madness007)
- [Aaron Van Vyve](https://github.com/vives-projectweek-2021/projectweek21-report-AaronVanV)
- [Henry Buysschaert](https://github.com/vives-projectweek-2021/projectweek21-report-HenryBuyssie)

## Game facts

### Physics

- Flat plain with obstacles
- Changeable gravity
- player 1 can jump, move left and right
- Double jump
- Player 2 that can drop obstacles

### Powerups

#### Buffs

- Low gravity
- Jumpboost
- Speed
- Triple jump
- Extra life
- Coins (extra points)
<!--  add buffs -->

#### Debuffs

- Slowness
- Dwarfinator (smaller character)
- Single jump
<!--  add debuffs -->

### Theme (graphics)

- Alien, space

## Visual

### Start menu

- Play
- The player needs to insert a coin to start

#### Game header

- Current score
- Timer
<!--  add all the timers and game things -->

## Hosting

Phaser can be hosted from netlify, Because the webpage is static.

The only downside is that it takes a loung time to load the phaser framework. witch is 6Mb.
The game will also be hosted local on a raspberry pi. The pi will be installed with kiosk mode. The player can play on the pi with the controllers and a screen.

## Tasks

 |Tasks (game)                                                                          |Done by:   |
 |:-------------------------------------------------------------------------------------|:----------|
 |phaser basic game setup                                                               |           |
 |find a good no copyrighted background track                                           |           |
 |install background audio                                                              |Arno       |
 |player 1 movement                                                                     |           |
 |player 2 movement                                                                     |           |
 |player 1 left right                                                                   |Arno       |
 |visuals (sprites, background, buffs, obstacles, ...)                                  |           |
 |convert main.js to multiple scenes                                                    |Arno       |
 |create loading assets and menu scenes                                                 |Arno       |
 |add 2 seconds delayed start for performance                                           |Arno       |
 |publish to netlify and craete lifetime free domainname                                |Arno       |
 |add pi.html with a second main£.js with limited frame rate for the pi                 |Arno       |
 |edit final video in premiere pro                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |

 |Tasks (buffs)                                                                         |Done by:   |
 |:-------------------------------------------------------------------------------------|:----------|
 |buff 1                                                                                |           |
 |buff 2                                                                                |           |
 |...                                                                                   |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |

 |Tasks (debuffs)                                                                       |Done by:   |
 |:-------------------------------------------------------------------------------------|:----------|
 |debuff 1                                                                              |           |
 |debuff 2                                                                              |           |
 |...                                                                                   |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |
 |                                                                                      |           |

 |Tasks (Hardware)                                                                      |Done by:   |
 |:-------------------------------------------------------------------------------------|:----------|
 |install pi with chromium kiosk mode                                                   |Arno       |
 |make update repo, kiosk and debugmenu shell scripts                                   |Arno       |
 |add arduino to the player 1 controller                                                |Arno       |
 |add arduino to the player 2 controller                                                |Arno       |
 |finish controllers, killswitch, rewire,...                                            |Arno       |
 |make a debugmenu keystroke sequence                                                   |Arno       |
 |add coin acceptor with voltage devider an analise analog signals with arduino         |Arno       |
 |map all the buttons and code the arduinos                                             |Arno       |

## Hardware, software & used technologies

- Hardware: 2 arcade controllers (seat & mobile controller)
- Hardware: arduino pro micro (inside the controllers)
- Hardware: raspberry pi (playing the game in kiosk mode)
- Software: Visual Studio Code (code editor)
- Software: arduino ide (code editor & compiler)
- Software: Visual Studio Code (code editor)
- Language: JavaScript using Phaser (Framework)
- Language: html, css
- Language: arduino

## Links/ bibliography

[Phaser Tutorial 1](https://www.youtube.com/watch?v=uxos1GG32Tg)

[Complete Course Phaser 1hour](https://www.youtube.com/watch?v=hI_LS8bdkM4)

[Example endless runner](https://www.emanueleferonato.com/2019/01/23/html5-endless-runner-built-with-phaser-and-arcade-physics-step-5-adding-deadly-fire-being-kind-with-players-by-setting-its-body-smaller-than-the-image/)

[Raspberry pi kiosk mode](https://pimylifeup.com/raspberry-pi-kiosk/)
