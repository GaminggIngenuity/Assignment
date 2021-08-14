import {
  Application, Container, Text, ///TextStyle,
} from 'pixi.js';

import { preLoader } from './PreLoader';
import assets from './assets';
import { Scene } from './Scene';
import { getAllTexture } from './Textures';

export class Game {
  private readonly stage: Container;

  private readonly app: Application;
  private baseScene:Scene;
  text:Text | undefined 
  private isInitialized = false;
  myscore:number=0;
    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
     
      this.baseScene = new Scene(this.app, this.stage);
    
    //this.scr = this.createText(`Your Score:`,this.messageTextStyle,550,10)
      preLoader(assets, () => {
        this.baseScene.init();
        this.isInitialized = true;
       this.text = new Text(`Balance:${this,this.myscore}`,{
        fontSize:'32px',
        fontFamily:'Comic Sans',
        fill:'green',
        align: 'center'
       })
       this.text.x=this.app.view.width-550;
       this.text.y=this.app.view.height-100;
       this.stage.addChild(this.text)
       ///console.log("ttext",this.text)
        console.log('All Textures ', getAllTexture());
      });
    }
    
    public update(delta:number):void {
      if (this.isInitialized && this.baseScene.initialized) {
        this.baseScene.update(delta);
      }
    }
}









