import { CST } from "../CST";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    premoad(){

    }
    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}