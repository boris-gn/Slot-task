import * as PIXI from "pixi.js";

export interface Reel {
  container: PIXI.Container;
  strip: number[];
  symbols: PIXI.Sprite[];
  position: number;
  previousPosition: number;
  blur: PIXI.BlurFilter;
}
