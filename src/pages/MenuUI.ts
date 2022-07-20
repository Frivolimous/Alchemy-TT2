import * as PIXI from 'pixi.js';
import { BaseUI } from './_BaseUI';
import { MuterOverlay } from '../components/ui/MuterOverlay';
import { SaveManager } from '../services/SaveManager';
import { Button } from '../components/ui/Button';
import { Fonts } from '../data/Fonts';
import { IResizeEvent } from '../services/GameEvents';
import { GameUI } from './GameUI';
import { StringManager } from '../services/StringManager';
import { OptionModal } from '../components/ui/modals/OptionModal';
import { AlchemyData, baseTSV } from '../data/AlchemyData';
import { AlchemyService } from '../services/AlchemyService';
// import { DragonSpriteBasic } from '../components/game/sprites/DragonAvatar/DragonSpriteBasic';
// import { AssetLoader } from '../services/AssetLoader';

export class MenuUI extends BaseUI {

  private title: PIXI.Text;

  private startB: Button;
  private resetB: Button;

  constructor() {
    super({bgColor: 0x777777});
    this.title = new PIXI.Text(StringManager.data.GAME_TITLE, { fontSize: 30, fontFamily: Fonts.UI, fill: 0x3333ff });
    this.addChild(this.title);

    this.resetB = new Button({ width: 100, height: 30, label: StringManager.data.BUTTON.RESET, onClick: this.resetGame, color: 0xff3333 });
    this.resetB.position.set(150, 400);
    this.addChild(this.resetB);

    this.startB = new Button({ width: 100, height: 30, label: StringManager.data.BUTTON.ADVENTURE, onClick: this.startGame });
    this.startB.position.set(150, 200);
    this.addChild(this.startB);
    this.addChild(this.startB);
  }

  public navIn = () => {
    let extrinsic = SaveManager.getExtrinsic();
    (window as any).stringifyData = this.stringifyData;
    (window as any).importTSV = AlchemyService.importTSV;
    AlchemyService.importTSV(baseTSV, false);
  }

  public navOut = () => {
    (window as any).stringifyData = null;
    (window as any).importTSV = null;

  }

  public stringifyData = () => console.log(JSON.stringify(AlchemyData));

  public positionElements = (e: IResizeEvent) => {
    this.title.x = (e.innerBounds.width - this.title.width) / 2;
    this.title.y = 50;
  }

  private startGame = () => {
    this.navForward(new GameUI());
  }

  private resetGame = () => {
    let dialogue = new OptionModal(StringManager.data.MENU_CONFIRM_RESET, [{label: StringManager.data.BUTTON.YES, color: 0x00ff00, onClick: SaveManager.resetData()}, {label: StringManager.data.BUTTON.NO, color: 0xff0000}]);
    this.addDialogueWindow(dialogue);
  }
}
