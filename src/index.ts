import * as PIXI from "pixi.js";
import { loadAssets } from "./assetLoader";
import { createReels, startPlay } from "./reels";
import { createUI } from "./ui";

const app = new PIXI.Application({
  view: document.getElementById("slot-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xfffff,
  width: window.innerWidth,
  height: window.innerHeight,
});

globalThis.__PIXI_APP__ = app;

loadAssets(() => {
  const slotTextures = [
    PIXI.Texture.from("assets/images/zero.png"),
    PIXI.Texture.from("assets/images/one.png"),
    PIXI.Texture.from("assets/images/two.png"),
    PIXI.Texture.from("assets/images/three.png"),
    PIXI.Texture.from("assets/images/four.png"),
    PIXI.Texture.from("assets/images/five.png"),
    PIXI.Texture.from("assets/images/six.png"),
    PIXI.Texture.from("assets/images/seven.png"),
    PIXI.Texture.from("assets/images/eight.png"),
    PIXI.Texture.from("assets/images/nine.png"),
  ];

  const reels = createReels(app, slotTextures);
  createUI(app, () => startPlay(app, reels));
});
