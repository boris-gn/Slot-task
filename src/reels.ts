import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { sound } from "@pixi/sound";
import { Reel } from "./common/types";

const REEL_WIDTH = 100;
const SYMBOL_SIZE = 150;

export function createReels(app: PIXI.Application, slotTextures: PIXI.Texture[]): Reel[] {
  const reelStrips = [
    [5, 4, 1, 3, 3, 5, 4, 0, 4, 3],
    [5, 5, 1, 4, 2, 0, 2, 3, 5, 5, 3, 1, 2, 4, 0],
    [3, 6, 4, 5, 2, 5, 5, 6],
  ];

  const reels: Reel[] = [];
  const reelContainer = new PIXI.Container();
  for (let i = 0; i < 3; i++) {
    const rc = new PIXI.Container();
    rc.x = i * REEL_WIDTH;
console.log(rc)
    reelContainer.addChild(rc);

    const reel: Reel = {
      container: rc,
      strip: [],
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new PIXI.BlurFilter(),
    };

    const randomStartIndex = Math.floor(Math.random() * reelStrips[i].length);
    const randomStartSequence = [
      ...reelStrips[i].slice(randomStartIndex),
      ...reelStrips[i].slice(0, randomStartIndex),
    ];
    reel.strip.push(...randomStartSequence);
    reel.blur.blurX = 0;
    reel.blur.blurY = 0;
    rc.filters = [reel.blur];

    for (let j = 0; j < reel.strip.length; j++) {
      const texturesIndex = reel.strip[j];
      const symbol = new PIXI.Sprite(slotTextures[texturesIndex]);
      symbol.y = j * SYMBOL_SIZE;
      symbol.scale.x = symbol.scale.y =
        Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height) * 0.95;
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) );
      reel.symbols.push(symbol);
      rc.addChild(symbol);
    }
    reels.push(reel);
  }
  app.stage.addChild(reelContainer);

  const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
  reelContainer.y = margin;
  reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5) / 2;

  return reels;
}

export function startPlay(app: PIXI.Application, reels: Reel[]) {
  let running = false;

  if (running) return;
  running = true;

  let line: string[] = [];

  function isWinLineSymbol(currentReel: Reel) {
    const symbol = currentReel.symbols.find(
      (symbol: PIXI.Sprite) => Math.round(symbol.y) === 150
    );

    if (symbol) {
      const winLineSymbol = symbol.texture.textureCacheIds[0];
      line.push(winLineSymbol);
    } else {
      console.warn("No symbol found at the win line position.");
    }
  }

  function checkWinLine(line: string[]) {
    const win = line.every((x, i, a) => x === a[0]);
    if (win) {
      console.log("You won!");
      sound.play("win");
    }
  }

  for (let i = 0; i < reels.length; i++) {
    const r = reels[i];
    const extra = Math.floor(Math.random() * 3);
    const target = r.position + 10 + i * 5 + extra;
    const time = 2000 + i * 250;
    new TWEEN.Tween(r)
      .to({ position: target }, time)
      .onStart(() => {
        sound.play("spin");
      })
      .easing(backOut(0.2))
      .onComplete(() => {
        isWinLineSymbol(r);
        if (i === reels.length - 1) {
          running = false;
          checkWinLine(line);
        }
        sound.play("stop");
      })
      .start();
  }

  app.ticker.add(() => {
    for (let i = 0; i < reels.length; i++) {
      const r = reels[i];
      r.blur.blurY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j];
        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
      }
    }
    TWEEN.update();
  });
}

function backOut(amount: number) {
  return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
}
