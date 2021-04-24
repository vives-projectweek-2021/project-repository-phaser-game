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


        //background if not loading image = blue
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

        //create enemy
        this.enemy= this.physics.add.sprite(150,150,'enemy');
        this.enemy.setGravityY(-300);
        this.enemy.setCollideWorldBounds(true); //cant go offscreen


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

        //player jump
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-450);
        }

        //enemy movement
        if (this.cursors.left.isDown){
            this.enemy.setVelocityX(-200);
        }else if (this.cursors.right.isDown){
            this.enemy.setVelocityX(200);
        }else{this.enemy.setVelocityX(0);}
        //enemy drop
        if (this.cursors.down.isDown && this.nextDrop<this.time.now){
            this.obstacles.create(this.enemy.x, this.enemy.y, 'obstacle');
            this.nextDrop = this.time.now + 3000;
        }
        this.dropCounter=Math.floor((this.nextDrop-this.time.now)/100);
        if(this.dropCounter<0){
            this.dropCounter=0;
        }
        //drop counter on screen
        this.dropText.setText('DropTime: ' + this.dropCounter);

        //player hit-detection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.obstacleHit, null, this);
        



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

    score = 0;
    scoreText;
    dropText;
    dropCounter=0;
    nextDrop=0;
    gameOver=false;
    timedEvent;
    disableDropTimer;
}



  

