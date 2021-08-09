import { ParticleContainer } from 'pixi.js';
import particles = require('pixi-particles');
import { getSmily } from './Textures';

export class Emitter extends ParticleContainer {
  private pEmitter: particles.Emitter;

  constructor(maxCount: number, props?:any) {
    super(maxCount, props);
    this.pEmitter = new particles.Emitter(this,
      [getSmily()],
  
      {
        "alpha": {
          "start": 0.5,
          "end": 0
        },
        "scale": {
          "start": 0.1,
          "end": 0.3
        },
        "color": {
          "start": "ffd700",
          "end": "ffd700"
        },
        "speed": {
          "start": 500,
          "end": 500
        },
        "acceleration": {
          "x":0,
          "y": 2000
        },
        "startRotation": {
          "min": 260,
          "max": 280
        },
        "rotationSpeed": {
          "min": 0,
          "max": 0
        },
        "lifetime": {
          "min": 0.25,
          "max": 0.5
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0,
        "maxParticles": 500,
        "pos": {
          "x": 0,
          "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
          "x": 0,
          "y": 0,
          "r": 0.0000
        }
      });
  }

  public start(): void {
    this.pEmitter.emit = true;
  }

  public update(delta: number): void {
    this.pEmitter.update(delta * 0.001);
  }
}
