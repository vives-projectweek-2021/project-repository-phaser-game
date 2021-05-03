import { CST } from "../CST.js";
export class Game extends Phaser.Scene{
    constructor(){
        super({
                key: CST.SCENES.GAME
            })
    }
    init(data){
        console.log(data);
    }
    create(){
        this.gameSpeed=6;
        //create platforms in group
        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(400,560,'ground').setScale(5,1).refreshBody();

        //background (3layers)
        this.bg = this.add.tileSprite(500,300,1000,600, 'background');
        this.craters= this.add.tileSprite(500,300,1000,600,'craters');
        this.spaceground=this.add.tileSprite(500,300,1000,600,'spaceground');
        this.planet=this.add.tileSprite(500,300,1000,600,'planet');
    
        //create player
        this.player = this.physics.add.sprite(130, 400, 'player');
    
        this.player.setBounce(0.05).setGravityY(300);//adds little bounce after jump
        this.player.setCollideWorldBounds(true);//cant go offscreen
        this.physics.add.collider(this.player, this.platforms);

        //add obstacles
        this.obstacles= this.physics.add.group();
        this.obstacles.create(900,470,'obstacle');
        this.physics.add.collider(this.obstacles, this.platforms);
    
        //create coins
        this.coins = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(this.coins, this.platforms);
        
        //create text on screen
        this.scoreText = this.add.text(40, 50, 'score: 0', { fontSize: '21px', fill: '#000' });
        this.dropText = this.add.text(200, 50, 'Time: 0', { fontSize: '21px', fill: '#000' });
        this.distanceText= this.add.text(800, 50, 'Distance: 0', { fontSize: '21px', fill: '#000' });
        this.abilityText = this.add.text(200, 80, 'gravitycounter: 0', { fontSize: '21px', fill: '#000' });
        this.disableEnemyText= this.add.text(500, 50, 'Player 2 disabled for : 0', { fontSize: '21px', fill: '#000' });


        //background if not loading image = blue
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

        //create enemy
        this.enemy= this.physics.add.sprite(150,150,'enemy');
        this.enemy.setGravityY(-300);
        this.enemy.setCollideWorldBounds(true); //cant go offscreen

        //create powerups
        this.lowGravityCoin = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(this.lowGravityCoin, this.platforms);

        this.healthCoin = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(this.healthCoin, this.platforms);
    
        this.tripleJumpCoin = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(this.tripleJumpCoin, this.platforms);

        this.disablePower= this.physics.add.group({allowGravity: false});

        this.slowTimeCoin = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(this.slowTimeCoin, this.platforms);

        //create debuffs
        this.singleJumpCoin = this.physics.add.group({allowGravity: false});
        this.dwarfinator = this.physics.add.group({allowGravity: false});

        //timer
        this.timedEvent = this.time.addEvent({ delay: 2500, callback: this.spawn, callbackScope: this, loop: true });
        this.powerEvent = this.time.addEvent({ delay: 60000, callback: this.power, callbackScope: this, loop: true }); //maybe put lower
        this.abilityText.visible = false;

        //player hit-detection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.obstacleHit, null, this);
        this.physics.add.overlap(this.player, this.disablePower, this.collectDisable, null, this);
        this.physics.add.overlap(this.player, this.lowGravityCoin, this.lowGravity, null, this);
        this.physics.add.overlap(this.player, this.healthCoin, this.addHealth, null, this);
        this.physics.add.overlap(this.player, this.singleJumpCoin, this.singleJump, null, this);
        this.physics.add.overlap(this.player, this.tripleJumpCoin, this.tripleJump, null, this);
        this.physics.add.overlap(this.player, this.slowTimeCoin, this.slowTime, null, this);

        //create border
        this.border = this.physics.add.sprite(-30, 200, 'border');
        this.physics.add.collider(this.border, this.platforms);

        //out of bounds disable
        this.physics.add.overlap(this.border, this.obstacles , this.OutOfBounds, null, this);
        this.physics.add.overlap(this.border, this.coins , this.OutOfBounds, null, this);
    }

    update (){
        console.log("Gamespeed: "+this.gameSpeed);

        //other key inputs for player 2
        // Z, Q, S, D dor player 2 joystick
        //arrow keys for player 1 joystick
        this.keyZ = this.input.keyboard.addKey('Z');  // Get key object Z (jump)                    Player1 up
        this.keyS = this.input.keyboard.addKey('S');  // Get key object S (down)                    Player1 down
        this.keyQ = this.input.keyboard.addKey('Q');  // Get key object Q (Player1 movement)        Player1 left
        this.keyD = this.input.keyboard.addKey('D');  // Get key object D (Player1 movement)        Player1 right
        this.keyW = this.input.keyboard.addKey('W');  // Get key object W (speedup debuff)
        this.keyX = this.input.keyboard.addKey('X');  // Get key object X (dwarfinator debuff)
        this.keyV = this.input.keyboard.addKey('V'); // Get key object V  (obstacles jump debuff)
        this.keyA= this.input.keyboard.addKey('A');  // Get key object A  (nothing yet)
        this.keyF = this.input.keyboard.addKey('F'); // Get key object F  (nothing yet)
        this.keyB = this.input.keyboard.addKey('B'); // Get key object B  (nothing yet)
        

        //create key input: space, shift, arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        //set velocity/movement for treadmill effect
        this.obstacles.setVelocityX(this.gameSpeed*-60);
        this.coins.setVelocityX(this.gameSpeed*-60);
        this.disablePower.setVelocityX(this.gameSpeed*-60);
        this.lowGravityCoin.setVelocityX(this.gameSpeed*-60);
        this.healthCoin.setVelocityX(this.gameSpeed*-60);
        this.singleJumpCoin.setVelocityX(this.gameSpeed*-60);
        this.tripleJumpCoin.setVelocityX(this.gameSpeed*-60);
        this.slowTimeCoin.setVelocityX(this.gameSpeed*-60);
        this.bg.tilePositionX += this.gameSpeed/12;
        this.craters.tilePositionX += this.gameSpeed/6;
        this.spaceground.tilePositionX+=this.gameSpeed;



        //player jump

        this.didPressJump = this.cursors.space.isDown

        if (this.didPressJump || this.keyZ.isDown) {
            if (this.disablejump && this.player.body.onFloor()) {
                this.jumps = 0;
                this.player.body.setVelocityY(-400);
                }
            else if (this.enabletripleJump && this.player.body.onFloor()) {
                this.jumps = 2;
                this.player.setVelocityY(-400);
                this.jumpCounter = this.time.now + 300
                }
            else if (this.jumps > 0 && this.enabletripleJump && !this.player.body.onFloor() && this.jumpCounter < this.time.now) {
                this.jumps -= 1;
                this.player.setVelocityY(-400);
                this.jumpCounter = this.time.now + 300
            } 
            else if (!this.disablejump && this.player.body.onFloor()) {
                    this.player.body.setVelocityY(-400);
                    this.jumpCounter = this.time.now + 300;
                }
            else if (this.jumps > 0 && !this.player.body.onFloor() && this.jumpCounter < this.time.now && !this.disablejump) {
                // player can only jump 2x (double jump)
                this.player.body.setVelocityY(-400);
                this.jumps -= 1;
                } 
            } 
        else if (this.player.body.onFloor() && !this.disablejump) {
                this.jumps = 1;
                }
        else if (this.player.body.onFloor() && this.enabletripleJump){
                this.jumps = 2;
        }

        //player faster down
        if(this.keyS.isDown){
            this.player.setVelocityY(300);
        }

        //player 1 left right
        if(this.keyD.isDown){
            this.player.setVelocityX(200);
        }else if(this.keyQ.isDown){
            this.player.setVelocityX(-200);
        }
        else{
            this.player.setVelocityX(0);
        }


            //enemy movement
        if (this.cursors.left.isDown && this.disableEnemyTimer<this.time.now){
            this.enemy.setVelocityX(-200);   
        }else if (this.cursors.right.isDown && this.disableEnemyTimer<this.time.now){
            this.enemy.setVelocityX(200);   
        }else{
            this.enemy.setVelocityX(0);
        }
        
            //enemy drop
        if (this.cursors.down.isDown && this.nextDrop<this.time.now && this.disableEnemyTimer<this.time.now){
            this.obstacles.create(this.enemy.x, this.enemy.y, 'obstacle');
            this.nextDrop = this.time.now + 3000;
        }

        //enemy debuffs

        if(this.debuffTimer< this.time.now+15000 && !this.gameOver){
            if(this.speedActivate){
                this.gameSpeed=6;
                this.speedActivate = false;
            }
            this.player.setDisplaySize(64,64);

        }
    
        //speed debuff
        if(this.debuffTimer<this.time.now){
            if(this.keyW.isDown){
                this.speedActivate = true;
                this.gameSpeed=12;
                this.debuffTimer= this.time.now + 30000;
            }

        //dwarfinator debuff
            if(this.keyX.isDown){
                this.player.setDisplaySize(32,32);   
                this.debuffTimer = this.time.now + 30000; 
            }

        //obstacle jump debuff
            if(this.keyV.isDown){
                this.obstacles.setVelocityY(-300);
                this.debuffTimer= this.time.now + 30000;
            }

        }

        //enemy drop counter
        this.dropCounter=Math.floor((this.nextDrop-this.time.now)/100);
        if(this.dropCounter<0){
            this.dropCounter=0;
        }
        //drop counter on screen
        this.dropText.setText('DropTime: ' + this.dropCounter);

        //disable power on screen
        this.disableEnemyCounter=Math.floor((this.disableEnemyTimer-this.time.now)/100);
        if(this.disableEnemyCounter<0){
            this.disableEnemyCounter=0;
        }
        this.disableEnemyText.setText('Disable Timer: ' + this.disableEnemyCounter);

        //distance counter on screen, stops when gameOver
        if(!this.gameOver){
            this.distance= Math.floor((this.time.now)*this.gameSpeed/600)   //600 because base gameSpeed is 6
        }
        this.distanceText.setText('Distance: '+ this.distance)     

        

        if (this.abilityCounter < this.time.now) {
            this.player.setGravityY(200);
            this.disablejump = false;
            this.enabletripleJump = false;
            this.abilityText.visible = false;
            if (!this.gameOver && this.slowActivate){
                this.gameSpeed = 6;
                this.slowActivate = false;
            }
        }
        this.abilityNumber=Math.floor((this.abilityCounter-this.time.now)/100);
        this.abilityText.setText('power-up time: ' + this.abilityNumber);
        console.log(this.health);
        
    }

    
    spawn(){
        if(!this.gameOver){
            //spawn obstacle on random
            var obstacleX= Phaser.Math.Between(1100, 1500);
            this.obstacles.create(obstacleX,470,'obstacle');

            //spawn coin on random
            var coinX =Phaser.Math.Between(1100, 1500);
            var coiny =Phaser.Math.Between(300,500);
            this.coins.create(coinX,coiny,'coin');
        }
    
    }

    power(){
        if(!this.gameOver){
            this.powerNumber = Phaser.Math.Between(1,5);
            var powerX = Phaser.Math.Between(1100,1500);
            var powerY = Phaser.Math.Between(300,500);
            if (this.powerNumber = 1) {
                this.lowGravityCoin.create(powerX, powerY,'lowgravity')
            }
            else if (this.powerNumber = 2) {
                this.singleJumpCoin.create(powerX, powerY, 'singlejump')
            }
            else if (this.powerNumber = 3) {
                this.tripleJumpCoin.create(powerX, powerY, 'triplejump')
            }else if(this.powerNumber=4){
                this.slowTimeCoin.create(powerX,powerY,'slowtime');
            }else if(this.powerNumber=5){
                this.disablePower.create(powerX,powerY,'disablePower');
            }
        }
    }

    collectCoin(player, coin)
    {
        coin.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    obstacleHit(player,obstacle){
        this.health -= 1;
        if (this.health < 1) {
        this.gameOver=true;
        this.gameSpeed=0;
        }
        obstacle.disableBody(true, true);
    }

    collectDisable(player,disablePower){
        this.disableEnemyTimer= this.time.now + 10000;
        disablePower.disableBody(true, true);
    }

    lowGravity(player, lowGravityCoin){
        this.abilityCounter = this.time.now + 3000;
        this.player.setGravityY(-25);
        this.abilityText.visible = true;
        lowGravityCoin.disableBody(true, true);
    }
    addHealth(player, healthCoin){
        this.health += 1;
        healthCoin.disableBody(true, true);
    }
    singleJump(player, singleJumpCoin){
        this.abilityCounter = this.time.now + 3000;
        this.disablejump = true;
        this.abilityText.visible = true;
        singleJumpCoin.disableBody(true, true);
    }
    tripleJump(player, tripleJumpCoin){
        this.abilityCounter = this.time.now + 20000;
        this.enabletripleJump = true;
        this.abilityText.visible = true;
        tripleJumpCoin.disableBody(true, true);
    }
    slowTime(player, slowTimeCoin){
        this.abilityText.visible = true;
        this.slowActivate = true;
        this.abilityCounter = this.time.now + 5000;
        this.gameSpeed = 3;
        slowTimeCoin.disableBody(true,true);
    }
    OutOfBounds(border, object){
        object.disableBody(true,true);

    }

    //creating some variables
    gameOver=false;
    timedEvent;
    powerEvent;

    score = 0;
    scoreText;

    dropText;
    dropCounter=0;
    nextDrop=0;
    disableDropTimer=0;
    debuffTimer = 0;
    speedActivate = false;
    slowActivate= false;

    disableEnemyTimer=0;
    disableEnemyText;
    disableEnemyCounter=0;

    distanceText;
    distance=0;

    disablejump = false;
    enabletripleJump = false;
    jumps = 1;
    jumpCounter = 0;

    health = 1;


    abilityText;
    abilityCounter = 0;
    abilityNumber = 0;
}



  

