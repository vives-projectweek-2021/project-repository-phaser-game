import { CST } from "../CST.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
                key: CST.SCENES.MENU
            })
    }
    init(data){
        console.log(data);
    }
    create(){
        this.background = this.add.tileSprite(500,300,1000,600, 'background');

        this.add.image(this.game.renderer.width / 2 , this.game.renderer.height -100,  "press_to_start");
        let StartButton = this.add.image(this.game.renderer.width / 2 , this.game.renderer.height / 2 - 20,  "start_button");

        StartButton.setInteractive();

        /*StartButton.on("pointerover", ()=>{
            console.log("pointerover");
        })
        StartButton.on("pointerout", ()=>{
            console.log("pointerout");
        })*/
        StartButton.on("pointerdown", ()=>{
            this.scene.start(CST.SCENES.GAME, "Hello From Menu Screen!");
        })
    }
    update (){
        this.background.tilePositionX += 0.2;  
    }
}