import {
  Application, Container, Point, Sprite,  Texture,
} from 'pixi.js';
import { getTexture } from './Textures';
import { Button } from './Button';
import { ReelContainer } from './ReelContainer';
export class Scene extends Container {
  public initialized: boolean;
 // private symbol:string | undefined;
  private center: Point;
  ///reelNum: any;
 // private currentStop = 90;
 
  constructor(private readonly app:Application, parent: Container) {
    super();
    parent.addChild(this);
    this.initialized = false;
    this.center = new Point(this.app.view.width / 2, this.app.view.height / 2);
   
  }

  public init(): void {
    this.createSprite('gameBG', this.center.x, this.center.y);
    this.createSprite('reelBG', this.center.x, this.center.y);
    const logo = this.createSprite('gameLogo', this.center.x, 40);
  // const logo = this.createSprite('gameLogo', 40,this.center.y);
    logo.scale.set(0.7);

    const spin = new Button('spin_normal.png', 'spin_over.png', 'spin_down.png', 'spin_disable.png');
    spin.x = this.center.x;
    spin.y = this.app.view.height - spin.height / 2-10;
    spin.width = 80;
    spin.height = 80;
    this.addChild(spin);
    console.log('spin ', spin);
    const reels = new ReelContainer();
    reels.init();
    this.addChild(reels);
    spin.on('click', () => {
      reels.spin();
      spin.enabled = false;
     spin.enabled = true;
    });

    this.initialized = true;
  }
 
  
  private createSprite(textureId: string, x: number, y:number): Sprite {
    const sprite = new Sprite(getTexture(textureId) as Texture);
    sprite.anchor.set(0.5);
    sprite.position.set(x, y);
    return this.addChild(sprite);
  }

  // eslint-disable-next-line class-methods-use-this
  public update(delta?: number) {
    // eslint-disable-next-line no-unused-expressions
    delta;
  }
}
