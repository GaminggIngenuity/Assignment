
 import {Application, Container, TextStyle,ITextStyle,   Text,   Resource, Sprite, Texture,} from 'pixi.js';

 import assets from './assets';
 import { preLoader } from './PreLoader';
 
 import { getTexture} from './Textures';
 export class Game{
     private stage : Container;
     private dir_x :number=0;
     private messageTextStyle :ITextStyle;
     
     private scr : Text;
     private dir_y:number=0;
     private game_over:boolean= false;
     private keyvalue : string = "none";
     private app_width:number =600;
     
     private app_height:number =400;
     ///private count :number =0;
   
     private score :number =0
     prev_snake_pos_x :number=10;
    
      prev_snake_pos_y :number=10;
   
     private readonly background : Container;
     private  snake : Sprite|undefined;
       food : Sprite|undefined;
     private  app : Application;
     change: boolean=false;
     
     constructor(app:Application){
         this.app = app;
         this.stage = this.app.stage;
         this.background = new Container();
         this.stage.addChild(this.background);

         this.messageTextStyle = new TextStyle({
             fontFamily:'Comic-sans',
             fill:'blue',
             fontSize:'30px',
             align : 'center'
         });
         this.scr = this.createText(`Your Score:${this.score}`,this.messageTextStyle,550,10)
         
 
         preLoader(assets, ()=>{
           this.createImage()
           this.snake=this.createsnake(getTexture('black')as Texture<Resource>,300,300)
           this.food = this.createfood()
           this.scr = this.createText(`Your Score:${this.score}`,this.messageTextStyle,400,20);
           window.onkeydown=(e:KeyboardEvent)=>{
                 this.keyvalue = e.code
                 console.log("hi")
                 this.move();  
             }
         })
          
     }
     private createText(text:string,style:ITextStyle,x:number,y:number):Text{
        const txt = new Text(text, style);
        txt.position.set(x, y);
        this.stage.addChild(txt);
        return txt;
  
    }
    private createImage(): void {
        const img = Sprite.from(getTexture('grass') as Texture<Resource>);
        img.position.set(0);
        img.scale.set(0.25);
        img.width = this.app.view.width;
        img.height = this.app.view.height;
        this.stage.addChild(img);
    }
  
     
    private createsnake(texture:Texture<Resource>,snake_x:number,snake_y:number){
        const img = Sprite.from(texture);
        img.anchor.set(0.5)
        img.position.set(snake_x,snake_y);
        img.height=20;
        img.width=20;
        return this.stage.addChild(img);
    }

    private createfood(){
        const img = Sprite.from(getTexture('red')as Texture<Resource>)
        img.anchor.set(0.5);
        const pos = this.createfood_position()
        img.position.set(pos.food_x,pos.food_y)
        img.height=20;
        img.width=20;
        return this.stage.addChild(img)    
    }

    private createfood_position(){
        const food_x:number = Math.floor(Math.random()*(this.app_width));
        const food_y:number = Math.floor(Math.random()*(this.app_height));
        return {food_x, food_y}
    }

     private move(){

         if(this.keyvalue==='ArrowLeft'){
             if(this.dir_x!=1 ){
             this.dir_x =-1;
             this.dir_y =0
             this.change = true;
        }
         }

         else if(this.keyvalue === 'ArrowRight'){
             if(this.dir_x!=-1){
             this.dir_x = 1;
             this.dir_y =0
             this.change = true;
        }
         }

         else if(this.keyvalue === 'ArrowUp'){
             if(this.dir_y!=1){
             this.dir_x =0;
             this.dir_y =-1;
         this.change=true
        }
         }

         else if (this.keyvalue === 'ArrowDown'){
             if(this.dir_y!=-1){
             this.dir_x =0;
             this.dir_y =1
             this.change = true
        }
          }
     }

     boundary(){
        if(this.snake){
        if(this.snake.x<this.snake.width ||  this.snake.x+this.snake.width>this.app_width){
            this.game_over = true;
         }


        if(this.snake.y<this.snake.height ||  this.snake.y+this.snake.height>this.app_height){
            this.game_over = true;
        }
    }}
      update():void{
          if(this.game_over==true){
            let over = Sprite.from(getTexture('over')as Texture<Resource>)
            over.anchor.set(0.5)
            over.position.set(300,200)
            over.alpha=0.6
            over.height=400,
            over.width=600
            this.app.stage.addChild(over)
   
        }
       
             this.boundary()
             this.scr.text = `Your Score:${this.score}`
             
     
     }
 }
 
 
 
 
 
 
 
 
 
 




