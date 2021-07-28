onload = ()=>{
    const canvas = document.querySelector('#Game');
    const ctx = canvas.getContext('2d');
    const car = new Image();
    const road=new Image();
   const boundary=new Image();
   const bus= new Image();
   let x1=400;
   let y1=580;
//  let y2= 580;
   const carW = 48;
    const carH = 88;
    let speed = 5;
    let dir = 0;
    let mod=0;
   car.addEventListener('load', ()=>{
    draw();
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keyup', keyHandler);

  });
  bus.src="https://th.bing.com/th/id/R.88c98c018232cabc0a11ab22d2fc9814?rik=v7jmjd2g6%2bPYCg&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fK%2fj%2fE%2f5%2fW%2fB%2fblue-car-top-view-90-md.png&ehk=SHEXKfUWx%2fezhfiyfmZuI9j9weiiK2rsSjNlaFabRwY%3d&risl=&pid=ImgRaw"
  car.src ="https://th.bing.com/th/id/R.2144a2fae2c7e97c3b6e2ae01d065593?rik=Q0l6D0MdNHufcQ&pid=ImgRaw";
  road.src = "https://th.bing.com/th/id/R.3a63900ec9badf280238bee1798b2a4c?rik=54WNLTwy12TnIQ&pid=ImgRaw";
  boundary.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzVB4Okod6Mq676RoSgVMB0idmBzPgyRffw&usqp=CAU"
  function draw() {

    if(road.complete && car.complete&&bus.complete) {
        if((x1+carW>300)&&(x1+carW<700))
        x1 += speed * mod;
         y1+=speed*dir;
         //y2-=5;
     
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(road, 300,0,400,894);
        ctx.drawImage(car, x1, y1, 48, 92);
        ctx.drawImage(bus, 300, 580, 48, 92);  
        ctx.drawImage(bus, 360, 180, 48, 92); 
        ctx.drawImage(bus, 500, 400, 48, 92);
        ctx.drawImage(bus, 600, 280, 48, 92);  
        ctx.drawImage(bus, 700, 500, 48, 92);
         ctx.drawImage(boundary,0,0,300,894);
        ctx.drawImage(boundary,700,0,300,894);
    }
    requestAnimationFrame(draw);
  }
function keyHandler(e){
    switch (e.type) {
        case 'keydown':
            switch(e.code){
                case 'ArrowUp':
                    dir = -1;
                    break;
                case 'ArrowDown':
                    dir = 1;
                    break;
                case 'ArrowLeft':
                    mod = -1;
                    break;
                case 'ArrowRight':
                    mod = 1;
                    break;
            }
            break;
        case 'keyup':
            switch(e.code){
                case 'ArrowUp':
                case 'ArrowDown':
                    dir = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    mod = 0;
                    break;
            }
            break;
    }
}

};