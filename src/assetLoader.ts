import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";

export function loadAssets(onComplete: () => void) {
  PIXI.Assets.load([
    "assets/images/one.png",
    "assets/images/two.png",
    "assets/images/three.png",
    "assets/images/four.png",
    "assets/images/five.png",
    "assets/images/six.png",
    "assets/images/seven.png",
    "assets/images/eight.png",
    "assets/images/nine.png",
    "assets/images/zero.png",
    "assets/images/button.png",
  ]).then(onComplete);

  sound.add("spin", "assets/sounds/spinning.wav");
  sound.add("stop", "assets/sounds/stop.wav");
  sound.add("win", "assets/sounds/win.wav");
  sound.volume("spin", 0.01);
  sound.volume("stop", 0.05);
}
