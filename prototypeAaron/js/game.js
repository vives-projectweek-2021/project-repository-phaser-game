var config = {
    type: Phaser.AUTO,
    width: 1500,        //1000 real, 1500 testing
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
var score = 0;
var scoreText;
var dropCounter=0;
var dropText;

var nextDrop=0;

function preload ()
{
    this.load.image('background','assets/first background expanded.png');
    this.load.image('ground','assets/ground2.png');
    this.load.image('obstacle','assets/obstacle.png');
    this.load.image('player','assets/player.png');
    this.load.image('coin','assets/coin.png');
    this.load.image('enemy','assets/crosshair.png');
    this.load.image('jumppower','assets/jumppower.png');


}

var gameOver=false;

function create ()
{
    this.gameSpeed=5;
    
    
    

    //create platforms in group
    platforms=this.physics.add.staticGroup();
    platforms.create(400,560,'ground').setScale(7,1).refreshBody();
    //platforms.create(250, 50, 'ground').setScale(0.1,1).refreshBody();
    //platforms.refresh();
    //this.platforms = this.add.tileSprite(50, 600, 640, 50,'ground').setOrigin(0, 1);


    //this.bg=this.add.image(0,0,'background').setOrigin(0);
    this.bg = this.add.tileSprite(500,300,1000,600, 'background');
    
    //create player
    player = this.physics.add.sprite(130, 400, 'player');
    
    player.setBounce(0.05).setGravityY(300);      //adds little bounce after jump
    player.setCollideWorldBounds(true); //cant go offscreen
    this.physics.add.collider(player, platforms);

    //add obstacles
    obstacles= this.physics.add.group();
    //obstacles.create(900,470,'obstacle');
    //obstacle= this.physics.add.sprite(800,500,'obstacle');
    this.physics.add.collider(obstacles, platforms);
    
    //create coins
    coins = this.physics.add.group({allowGravity: false});
    //coins.create(700,200,'coin');
    this.physics.add.collider(coins, platforms);
    

    
    

    
    scoreText = this.add.text(40, 50, 'score: 0', { fontSize: '21px', fill: '#000' });
    dropText = this.add.text(200, 50, 'Time: 0', { fontSize: '21px', fill: '#000' });
    //this.cameras.main.startFollow(player);
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#1cd4f0');

    //enemy
    enemy= this.physics.add.sprite(150,150,'enemy');
    enemy.setGravityY(-300);
    enemy.setCollideWorldBounds(true); //cant go offscreen

    //jump power
    
    jumpPower = this.physics.add.group({allowGravity: false});
    //jumpPower.create(1000,450,'jumppower');

    //timer
    
    timedEvent = this.time.addEvent({ delay: 2500, callback: spawn, callbackScope: this, loop: true });
}

var timedEvent;

var disableDropTimer;

function spawn(){
    if(!gameOver){
        var obstacleX =Phaser.Math.Between(1100, 1500);

        obstacles.create(obstacleX,470,'obstacle');
        var coinX =Phaser.Math.Between(1050, 1500);
        var coiny =Phaser.Math.Between(300, 500);
        coins.create(coinX,coiny,'coin');
        
        
        
        
    }

}
function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    
    obstacles.setVelocityX(this.gameSpeed*-35);
    coins.setVelocityX(this.gameSpeed*-35);
    jumpPower.setVelocityX(this.gameSpeed*-35);

    if (cursors.space.isDown && player.body.onFloor())
    {
        player.setVelocityY(-450);
       
    }

    this.physics.add.overlap(player, coins, collectCoin, null, this);
    this.physics.add.overlap(player, obstacles, obstacleHit, null, this);
    //this.physics.add.overlap(player, jumpPower, collectJump, null, this);

    

    this.bg.tilePositionX += this.gameSpeed;
    
    if (cursors.left.isDown){
        enemy.setVelocityX(-200);
    }else

    if (cursors.right.isDown){
        enemy.setVelocityX(200);
    }else{enemy.setVelocityX(0);}
    
    if (cursors.down.isDown && nextDrop<this.time.now){
        obstacles.create(enemy.x, enemy.y, 'obstacle');
        
        nextDrop = this.time.now + 3000;
    
        
    }
    dropCounter=Math.floor((nextDrop-this.time.now)/100);
    if(dropCounter<0){
        dropCounter=0;
    }
        
    dropText.setText('DropTime: ' + dropCounter);
}




function collectCoin(player, coin)
{
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    //nextDrop = this.time.now + 3000;  increase drop timer
}
function obstacleHit(player,obstacle){
    gameOver=true;
    this.gameSpeed=0;
    obstacle.disableBody(true, true);
}
// function collectJump(player,jumpPower){
//     disablemove=true;
//     jumpPower.disableBody(true,true)
//     disablepl=this.time.addEvent({ delay: 3000, callback: disablePlayer2, callbackScope: this, loop: false });
//     disablepl.remove();
//     disablemove=false;
// }

// function disablePlayer2(){
    
    
// }


var game = new Phaser.Game(config);
