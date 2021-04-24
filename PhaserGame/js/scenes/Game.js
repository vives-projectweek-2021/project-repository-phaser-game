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
        this.gameSpeed=4;
        //create platforms in group
        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(400,560,'ground').setScale(5,1).refreshBody();

        this.bg = this.add.tileSprite(500,300,1000,600, 'background');
    
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
        this.disableEnemyText= this.add.text(500, 50, 'Player 2 disabled for : 0', { fontSize: '21px', fill: '#000' });


        //background if not loading image = blue
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

        //create enemy
        this.enemy= this.physics.add.sprite(150,150,'enemy');
        this.enemy.setGravityY(-300);
        this.enemy.setCollideWorldBounds(true); //cant go offscreen

        //create disable power
        this.disablePower= this.physics.add.group({allowGravity: false});
        this.disablePower.create(700,500,'disablePower');


        //timer
        this.timedEvent = this.time.addEvent({ delay: 2500, callback: this.spawn, callbackScope: this, loop: true });
    }
    update (){
        //create key input: space, shift, arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        //set velocity/movement for treadmill effect
        this.obstacles.setVelocityX(this.gameSpeed*-60);
        this.coins.setVelocityX(this.gameSpeed*-60);
        this.bg.tilePositionX += this.gameSpeed;
        this.disablePower.setVelocityX(this.gameSpeed*-60);


        //player jump
        if (this.cursors.space.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-450);
        }


        //enemy         with disable power

            //enemy movement
        if (this.cursors.left.isDown && this.disableEnemyTimer<this.time.now){
            this.enemy.setVelocityX(-200);
        }else if (this.cursors.right.isDown && this.disableEnemyTimer<this.time.now){
            this.enemy.setVelocityX(200);
        }else{this.enemy.setVelocityX(0);}
        
            //enemy drop
        if (this.cursors.down.isDown && this.nextDrop<this.time.now && this.disableEnemyTimer<this.time.now){
            this.obstacles.create(this.enemy.x, this.enemy.y, 'obstacle');
            this.nextDrop = this.time.now + 3000;
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
            this.distance= Math.floor((this.time.now)*this.gameSpeed/400)   //400 because base gameSpeed is 4
        }
        this.distanceText.setText('Distance: '+ this.distance)     

        //player hit-detection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.obstacleHit, null, this);
        this.physics.add.overlap(this.player, this.disablePower, this.collectDisable, null, this);
        



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

    collectCoin(player, coin)
    {
        coin.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    obstacleHit(player,obstacle){
        this.gameOver=true;
        this.gameSpeed=0;
        obstacle.disableBody(true, true);
    }

    collectDisable(player,disablePower){
        this.disableEnemyTimer= this.time.now + 10000;
        disablePower.disableBody(true, true);
    }

    //creating some variables
    gameOver=false;
    timedEvent;

    score = 0;
    scoreText;

    dropText;
    dropCounter=0;
    nextDrop=0;
    disableDropTimer=0;

    disableEnemyTimer=0;
    disableEnemyText;
    disableEnemyCounter=0;

    distanceText;
    distance=0;
}



  

