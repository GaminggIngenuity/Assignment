export class GameOver {
    constructor(canvas) {
        this.canvas = canvas;
        this.isGameOver = false;
    }
    draw(ctx) {
        if(this.isGameOver) {
            playSound("gameover")
            const canvasH = this.canvas.height;
            const canvasW = this.canvas.width;
            ctx.fillStyle = 'rgba(0,0,0,1.5)';
            ctx.beginPath();
            ctx.rect(0, 0, canvasW, canvasH);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = 'grey';
            ctx.strokeStyle = 'yellow';
            ctx.textAlign = 'center';
            ctx.font = '60px Arial Bold';
            ctx.lineWidth = 2;
            ctx.strokeText('Game Over', canvasW / 2, canvasH / 2);
            ctx.fillText('Game Over', canvasW / 2, canvasH / 2);
            setTimeout(this.reset.bind(this), 500);
        }
        
    }
}

let sound = {
  "gameover":"sound/gameover.wav",
    }
    function playSound(name){
        new Audio(sound[name]).play()
    }