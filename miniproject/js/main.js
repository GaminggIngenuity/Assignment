import {Game} from "./Game.js";

onload = ()=>{
    const main = document.querySelector('#main');
    const ctx = new Game(canvas);
    ctx.start();
    onkeydown = ctx.onKeyDown.bind(ctx);
    onkeyup = ctx.onKeyUp.bind(ctx);
    function loop (){
        ctx.update();
        ctx.draw();
        requestAnimationFrame(loop);
    }
    loop();
}