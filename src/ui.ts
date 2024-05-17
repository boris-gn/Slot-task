import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";

export function createUI(app: PIXI.Application, startPlayCallback: () => void) {
  const margin = (app.screen.height - 150 * 3) / 2;
  const bottom = new PIXI.Graphics();
  bottom.beginFill(0, 1);
  bottom.drawRect(0, 150 * 3 + margin - 5, app.screen.width, margin + 5);

  const textureButton = PIXI.Texture.from("assets/images/button.png");
  const button = new PIXI.Sprite(textureButton);
  button.scale.set(0.3, 0.25);
  button.anchor.set(0.5);
  button.x = Math.round((bottom.width - button.width) / 2);
  button.y =
    app.screen.height -
    margin +
    Math.round((bottom.height - button.height) / 2);
  bottom.addChild(button);

  const soundButton = new PIXI.Sprite(textureButton);
  soundButton.scale.set(0.3, 0.2);
  soundButton.x = 50;
  soundButton.y = Math.round((bottom.height - soundButton.height) / 2);
  bottom.addChild(soundButton);

  const style = new PIXI.TextStyle({
    fill: "#ffffff",
    fillGradientStops: [0.6],
    fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    fontSize: 36,
    fontVariant: "small-caps",
    fontWeight: "bold",
    letterSpacing: 2,
    lineJoin: "round",
    stroke: "#f20707",
    strokeThickness: 4,
  });

  const soundButtonText = new PIXI.Text("on/off sound", style);
  soundButtonText.scale.set(2);
  soundButtonText.anchor.set(-0.2, -1);
  soundButton.addChild(soundButtonText);

  const buttonText = new PIXI.Text("SPIN!", style);
  buttonText.scale.set(3);
  buttonText.anchor.set(0.5);
  button.addChild(buttonText);

  const top = new PIXI.Graphics();
  top.beginFill(0, 1);
  top.drawRect(0, 0, app.screen.width, margin - 5);
  const headerText = new PIXI.Text("Slot Task", style);
  headerText.x = Math.round((top.width - headerText.width) / 2);
  headerText.y = Math.round((margin - headerText.height) / 2);
  top.addChild(headerText);

  app.stage.addChild(top);
  app.stage.addChild(bottom);

  button.interactive = true;
  button.cursor = "pointer";
  button.on("pointerdown", () => {
    button.scale.set(0.25, 0.2);
    startPlayCallback();
  }).on("pointerup", () => {
    button.scale.set(0.3, 0.25);
  });

  soundButtonText.interactive = true;
  soundButtonText.cursor = "pointer";
  soundButtonText.addListener("pointerdown", () => {
    sound.toggleMuteAll();
  });
}
