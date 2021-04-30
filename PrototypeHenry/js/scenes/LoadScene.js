import { CST } from "../CST.js";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
                key: CST.SCENES.LOAD
            })
    }
    init(){

    }
    preload(){
        this.load.image('background','assets/general/first background expanded.png');
        this.load.image('ground','assets/game/ground2.png');
        this.load.image('obstacle','assets/obstacles/obstacle.png');
        this.load.image('player','assets/game/player.png');
        this.load.image('coin','assets/powerups/coin.png');
        this.load.image('start_button','assets/menu/start.png');
        this.load.image('press_to_start','assets/menu/presstostart.png');
        this.load.image('enemy','assets/game/crosshair.png');
        this.load.image('disablePower','assets/powerups/disableEnemy.png');
        this.load.image('triplejump','assets/powerups/triplejump.png');
        

        //create LoadingBar
        let loadingBar = this.add.graphics();
        loadingBar.fillStyle(0xffff00);

        /*
        Loader events:
            -Complete
            -Progress
        */

        //simulate loung loading time
       /* for(let i = 0; i < 100; i++){
            this.load.image('background' + i,'assets/general/first background expanded.png');
            console.log("test");
        }*/

       this.load.on("progress", (percent)=>{
           loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
           console.log(percent);
       })

       this.load.on("complete", ()=>{
           //on complete
       })
    }
    create(){
        this.scene.start(CST.SCENES.MENU, "Hello From Load Screen!");
    }
}