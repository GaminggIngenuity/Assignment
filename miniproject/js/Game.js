import {Paddle} from "./Paddle.js";
import {Ball} from "./Ball.js";
import {GameOver} from "./Gameover.js";
import {Brick} from "./Brick.js";
import {bricks1} from "./BrickLayout1.js";
import {bricks2} from "./BrickLayout2.js";
import {BaseBox} from "./BaseBox.js";


export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
        this.level=0;
        this.life=3;
        this.speed=3;
    }
    start() {
       
        this.background = new BaseBox({
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'rgba(0,0,0,0.75)'
        });
        let bricks=[bricks1,bricks2];
        this.bricksCollection = [];
        bricks[this.level].forEach((brickLayout, index) => {
            for(let r=0; r < brickLayout.rows;r++) {
                for(let c=0; c < brickLayout.columns; c++) {
                    const brick = new Brick({
                        x: brickLayout.x + (c * (brickLayout.width + brickLayout.padding)),
                        y: brickLayout.y + (r * (brickLayout.height + brickLayout.padding)),
                        width: brickLayout.width,
                        height: brickLayout.height,
                        color: brickLayout.color,
                        score: brickLayout.score
                    });
                    this.bricksCollection.push(brick);
                }
            }
        });

        this.paddle = new Paddle({
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 120,
            height: 15,
            color: 'red',
            maxXBound: this.canvas.width
        });
        //create ball
        this.ball = new Ball({
            x: this.canvas.width / 2,
            y: this.canvas.height - 70,
            radius: 13,
            bounds: {
                left: 0,
                top:0,
                right: this.canvas.width,
                bottom:this.canvas.height
            }
        });
        this.ball.maxSpeed=this.speed;
        this.gameOver = new GameOver(this.canvas);
        this.score = 0;
        this.lives = 3;
    }
    
    reset() {
        this.paddle.isAlive = true;
        this.paddle.x = this.canvas.width / 2 - this.paddle.width/2;
        this.paddle.y = this.canvas.height - 50 - this.paddle.height/2;
        this.ball.isAlive = true;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 70;
    }
    onKeyDown(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        switch(kev.code){
            case 'ArrowLeft':
                this.paddle.move('left');
                break;
            case 'ArrowRight':
                this.paddle.move('right');
                break;
            case 'Space':
                this.ball.bounce();
                this.isRunning = true;
                break;
        }
    }
    onKeyUp(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        switch(kev.code){
            case 'ArrowLeft':
            case 'ArrowRight':
                this.paddle.stop();
                break;
        }
    }
    update() {
        if(this.gameOver.isGameOver) {
            return;
        }
        if(!this.isRunning) {
            return;
        }
        this.paddle.update();
        this.ball.update();
        if(this.paddle.hitTest(this.ball)) {    

            this.ball.bounceUp();
        }
        this.bricksCollection.forEach(brick => {
            if(brick.isAlive && brick.hitTest(this.ball)) {
                brick.isAlive = false;
                this.ball.bounceUp();
                this.score += brick.score;
            }
        });
        if(!this.ball.isAlive) {
           playSound("looselife")
            this.lives--;
            if(this.lives === 0) {
                this.gameOver.isGameOver = true;
            }
            this.paddle.isAlive = false;
            this.isRunning = false;
            setTimeout(this.reset.bind(this), 500);
        }
        let aliveBricks = this.bricksCollection.filter(brick => brick.isAlive);
        if(aliveBricks.length==0)
        {
        this.level++;
        this.speed*=2;
        this.start()
        setTimeout(this.reset.bind(this), 500);
        }
       
    }
    draw() {
        let canvas = this.canvas;
        let ctx = this.ctx;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        this.background.draw(ctx);
        ctx.font = '25px Arial Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(`Lives: ${this.lives}`, 10, 25);
        ctx.textAlign = 'right';
        ctx.fillText(`Level: ${this.level}`, 450, 25);
        ctx.fillText(`Score: ${this.score}`, 790, 25);
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.bricksCollection.forEach(brick => brick.draw(ctx));
        this.gameOver.draw(ctx);
    }
}


let sound = {
    "looselife":"sound/looselife.wav",
    }
    function playSound(name){
        new Audio(sound[name]).play()
    }
