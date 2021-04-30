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
    this.physics.add.collider(this.coins, this.platforms);
    
    this.scoreText = this.add.text(40, 50, 'score: 0', { fontSize: '21px', fill: '#000' });
    this.abilityText = this.add.text(200, 50, 'gravitycounter: 0', { fontSize: '21px', fill: '#000' });
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

    //create powerups
    this.lowGravityCoin = this.physics.add.group({allowGravity: false});
    this.physics.add.collider(this.lowGravityCoin, this.platforms);

    this.healthCoin = this.physics.add.group({allowGravity: false});
    this.physics.add.collider(this.healthCoin, this.platforms);
    
    this.tripleJumpCoin = this.physics.add.group({allowGravity: false});
    this.physics.add.collider(this.tripleJumpCoin, this.platforms);


    //create debuffs
    this.singleJumpCoin = this.physics.add.group({allowGravity: false});
    this.physics.add.collider(this.singleJumpCoin, this.platforms);

    //timer
    this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(500, 5000), callback: this.spawn, callbackScope: this, loop: true });

    this.powerEvent = this.time.addEvent({ delay: 60000, callback: this.power, callbackScope: this, loop: true });
    this.abilityText.visible = false;
    }

    update (){
        this.cursors = this.input.keyboard.createCursorKeys();
    
    this.obstacles.setVelocityX(this.gameSpeed*-60);
    this.coins.setVelocityX(this.gameSpeed*-60);
    this.lowGravityCoin.setVelocityX(this.gameSpeed*-60);
    this.healthCoin.setVelocityX(this.gameSpeed*-60);
    this.singleJumpCoin.setVelocityX(this.gameSpeed*-60);
    this.tripleJumpCoin.setVelocityX(this.gameSpeed*-60);

    this.didPressJump = this.cursors.up.isDown

    if (this.didPressJump) {
        if (this.disablejump && this.player.body.onFloor()) {
            this.jumps = 0;
            this.player.body.setVelocityY(-400);
            }
        else if (this.enabletripleJump && this.player.body.onFloor()) {
            this.jumps = 2;
            this.player.setVelocityY(-400);
            this.jumpCounter = this.time.now + 500
            }
        else if (this.jumps > 0 && this.enabletripleJump && !this.player.body.onFloor() && this.jumpCounter < this.time.now) {
            this.jumps -= 1;
            this.player.setVelocityY(-400);
            this.jumpCounter = this.time.now + 500
        } 
        else if (!this.disablejump && this.player.body.onFloor()) {
                this.player.body.setVelocityY(-400);
                this.jumpCounter = this.time.now + 500;
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
        
    


    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.obstacleHit, null, this);
    this.physics.add.overlap(this.player, this.lowGravityCoin, this.lowGravity, null, this);
    this.physics.add.overlap(this.player, this.healthCoin, this.addHealth, null, this);
    this.physics.add.overlap(this.player, this.singleJumpCoin, this.singleJump, null, this);
    this.physics.add.overlap(this.player, this.tripleJumpCoin, this.tripleJump, null, this);
    this.bg.tilePositionX += this.gameSpeed;
    if (this.abilityCounter < this.time.now) {
        this.player.setGravityY(200);
        this.disablejump = false;
        this.enabletripleJump = false;
        this.abilityText.visible = false;
    }
    this.abilityNumber=Math.floor((this.abilityCounter-this.time.now)/100);
    this.abilityText.setText('power-up time: ' + this.abilityNumber);
    }
    spawn(){
        if(!this.gameOver){
            this.obstacles.create(1100,470,'obstacle');
            var coinX =Phaser.Math.Between(250, 1000);
            var coiny =Phaser.Math.Between(0, 300);
            this.coins.create(coinX,coiny,'coin');
        }   
    
    }

    power(){
        if(!this.gameOver){
            this.powerNumber = Math.ceil(Math.random() * 10);
            var powerX = Phaser.Math.Between(1100,1500);
            var powerY = Phaser.Math.Between(300,500);
            if (this.powerNumber = 1) {
                this.lowGravityCoin.create(powerX, powerY,'lowgravity')
            }
            else if (this.powerNumber = 2) {<
                this.singleJumpCoin.create(powerX, powerY, 'singlejump')
            }
            else if (this.powerNumber = 3) {
                this.tripleJumpCoin.create(powerX, powerY, 'triplejump')
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
        health -= 1;
        if (health = 0) {
        this.gameOver=true;
        this.gameSpeed=0;
        obstacle.disableBody(true, true);
        }
        else {
            obstacle.disableBody(true, true);
        }
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


    score = 0;
    scoreText;
    gameOver=false;
    timedEvent;
    powerEvent;
    abilityCounter = 0;
    abilityNumber = 0;  
    jumpCounter = 0;
    health = 1;
    jumps = 1;
    disablejump = false;
    enabletripleJump = false;
}



  

