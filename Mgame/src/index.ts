import './css/main.scss';
import { Application, Ticker } from 'pixi.js';
import { Game } from './ts/Game';

window.onload = () => {
  const app = new Application({
    width: 1024,
    height: 768,
    //backgroundColor:0xffa07a,
    backgroundColor: 0xeeeeee,
    sharedTicker: true,
    sharedLoader: true,
  });

  document.body.appendChild(app.view);
  const game = new Game(app);
  const ticker = Ticker.shared;
  ticker.add(game.update.bind(game));
};
