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
        this.gameSpeed=3;
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
    this.coins = this.physics.add.group();
    this.coins.create(700,200,'coin');
    this.physics.add.collider(this.coins, this.platforms);
    
    this.scoreText = this.add.text(40, 50, 'score: 0', { fontSize: '21px', fill: '#000' });
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

    //timer
    this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(500, 5000), callback: this.spawn, callbackScope: this, loop: true });
    }
    update (){
        this.cursors = this.input.keyboard.createCursorKeys();
    
    this.obstacles.setVelocityX(this.gameSpeed*-60);
    this.coins.setVelocityX(this.gameSpeed*-60);

    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.setVelocityY(-400);
    }

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.obstacleHit, null, this);
    this.bg.tilePositionX += this.gameSpeed;

    }
    spawn(){
        if(!this.gameOver){
            this.obstacles.create(1100,470,'obstacle');
            var coinX =Phaser.Math.Between(250, 1000);
            var coiny =Phaser.Math.Between(0, 300);
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
    gameOver=false;
    timedEvent;
}



  

