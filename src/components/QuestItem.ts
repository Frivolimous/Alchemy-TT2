import * as PIXI from 'pixi.js';
import { AlchemyData, IQuest } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { Button } from './ui/Button';

export class QuestItem extends PIXI.Container {
  public textBlock: PIXI.Text;
  public background = new PIXI.Graphics();
  constructor(label: string, reward: string, private onClick: () => void, private myWidth: number, private myHeight: number) {
    super();

    this.textBlock = new PIXI.Text(`${label}\n${reward}`, { fill: 0xffffff, fontSize: 16, align: 'center' });
    this.textBlock.x = (myWidth - this.textBlock.width) / 2;

    this.drawBack(Colors.PANEL_BACK_INNER, Colors.PANEL_BORDER_INNER);
    this.background.beginFill(Colors.PANEL_BACK_INNER).lineStyle(2, Colors.PANEL_BORDER_INNER)
      .drawRoundedRect(0, 0, myWidth, myHeight, 5);

    this.addChild(this.background, this.textBlock);

    this.buttonMode = true;
    this.interactive = true;
    this.addListener('pointerdown', this.onClick);
  }

  public drawBack(backColor: number, borderColor: number) {
    this.background.clear().beginFill(backColor).lineStyle(2, borderColor)
      .drawRoundedRect(0, 0, this.myWidth, this.myHeight, 5);
  }

  public completeQuest() {
    this.interactive = false;
    this.removeListener('pointerdown', this.onClick);
    this.textBlock.text += '\n ~COMPLETE~';
    this.textBlock.x = (this.width - this.textBlock.width) / 2;
  }
}
