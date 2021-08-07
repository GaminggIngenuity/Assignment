import {
  Application, Container, Sprite, Texture, DEG_TO_RAD, TextStyle,
} from 'pixi.js';

import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getTexture } from './Textures';

export class Game {
    private stage: Container;
    private prizeShow: Container;
    private readonly app: Application;

    private isInitialized = false;

    private wheel: Sprite|undefined;
    private stop_angle:number=0;

    private prizes = ['Zero', '100', '200', '500', '1000', '2000', 'Jackpot'];

   private segAngle = 360 / this.prizes.length;
  // private segAngle =0
    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      const centerX = app.view.width / 2;
      const centerY = app.view.height / 2;
      this.prizeShow=new Container;
      this.stage.addChild(this.prizeShow)
      preLoader(assets, () => {
        this.isInitialized = true;
        const wheel = new Sprite(getTexture('wheel') as Texture);
        wheel.anchor.set(0.5);
        wheel.position.set(centerX, centerY);
        this.stage.addChild(wheel);
        this.wheel = wheel;

        wheel.interactive = true;
        wheel.on('click', () => {
          const prizeNum = Math.floor(Math.random()* this.prizes.length);
          const stopAngle = this.segAngle * prizeNum;
          gsap.to(wheel, { rotation: DEG_TO_RAD * (3600 + stopAngle), duration: 1, ease: 'Sine.easeOut' });
        });
      });

      console.warn(this.app);
    }
   /* private createText(text: string, style:TextStyle, x: number, y: number):Text{
      const txt = new Text(text, style);
      txt.position.set(x, y);
      this.stage.addChild(txt);
      return txt;
  }*/
//
const txt1=new Text("0")
txt1.position.set(this.app.view.width/2+120,230)
//  }
    public update(delta:number):void {
      // eslint-disable-next-line no-empty
      if (this.isInitialized && this.wheel) {
        // eslint-disable-next-line no-unused-expressions
        this.wheel.rotation += delta * DEG_TO_RAD;
      }
    }
}
