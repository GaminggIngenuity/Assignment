import './css/main.scss';
import { Application, Ticker } from 'pixi.js';
import { Game } from './ts/ame';

window.onload = () => {
  const app = new Application({
    width: 600,
    height: 400,
    //background1000Color:0xffa07a,
    //backgroundColor: 0xeeeeee,
    sharedTicker: true,
    sharedLoader: true,
  });

  document.body.appendChild(app.view);
  const game = new Game(app);
  const ticker = Ticker.shared;
  ticker.add(game.update.bind(game));
};