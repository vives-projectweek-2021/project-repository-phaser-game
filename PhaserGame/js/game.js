var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


function preload ()
{
    this.load.image('background','assets/first background expanded.png');
    this.load.image('ground','assets/ground2.png');
    this.load.image('obstacle','assets/obstacle.png');
    this.load.image('player','assets/player.png');
    this.load.image('coin','assets/coin.png');
}



function create ()
{
    this.gameSpeed=3;
    //create platforms in group
    platforms=this.physics.add.staticGroup();
    platforms.create(400,560,'ground').setScale(5,1).refreshBody();

    this.bg = this.add.tileSprite(500,300,1000,600, 'background');
    
    //create player
    player = this.physics.add.sprite(130, 400, 'player');
    
    player.setBounce(0.05).setGravityY(300);//adds little bounce after jump
    player.setCollideWorldBounds(true);//cant go offscreen
    this.physics.add.collider(player, platforms);

    //add obstacles
    obstacles= this.physics.add.group();
    obstacles.create(900,470,'obstacle');
    this.physics.add.collider(obstacles, platforms);
    
    //create coins
    coins = this.physics.add.group();
    coins.create(700,200,'coin');
    this.physics.add.collider(coins, platforms);
    
    scoreText = this.add.text(40, 50, 'score: 0', { fontSize: '21px', fill: '#000' });
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

    //timer
    timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(500, 5000), callback: spawn, callbackScope: this, loop: true });
}




function spawn(){
    if(!gameOver){
        obstacles.create(1100,470,'obstacle');
        var coinX =Phaser.Math.Between(250, 1000);
        var coiny =Phaser.Math.Between(0, 300);
        coins.create(coinX,coiny,'coin');
    }

}
function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    
    obstacles.setVelocityX(this.gameSpeed*-60);
    coins.setVelocityX(this.gameSpeed*-60);

    if (cursors.up.isDown && player.body.onFloor())
    {
        player.setVelocityY(-400);
    }

    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.overlap(player, obstacles, obstacleHit, null, this);
    this.bg.tilePositionX += this.gameSpeed;
    
   
}
function collectCoin(player, coin)
{
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
function obstacleHit(player,obstacle){
    gameOver=true;
    this.gameSpeed=0;
    obstacle.disableBody(true, true);
}

var score = 0;
var scoreText;
var gameOver=false;
var timedEvent;
var game = new Phaser.Game(config);
