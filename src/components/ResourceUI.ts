import * as PIXI from 'pixi.js';
import { RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';

export class ResourceUI extends PIXI.Container {
  public resources: Partial<{[key in RewardType]: number}> = { [RewardType.Dust]: 500, [RewardType.Gold]: 100};
  public scores: Partial<{[key in ScoreType]: number}> = {};

  private resourceText: PIXI.Text;

  constructor() {
    super();

    let background: PIXI.Graphics;
    let contents: PIXI.Container;

    let extrinsic = SaveManager.getExtrinsic();
    this.resources = extrinsic.resources;
    this.scores = extrinsic.scores;

    [background, contents] = AlchemyService.makePanel('Resources', 300, 500);
    this.resourceText = new PIXI.Text('no stats', {fontSize: 18, fill: 0xffffff});

    this.addChild(background);
    this.resourceText.position.set(3, 3);
    contents.addChild(this.resourceText);

    this.refreshDisplay();
  }

  public addResource(resource: RewardType, value: number) {
    this.resources[resource] = (this.resources[resource] || 0) + value;
    SaveManager.saveExtrinsic();
    this.refreshDisplay();
  }

  public addScore(score: ScoreType, value: number) {
    this.scores[score] = (this.scores[score] || 0) + value;
    SaveManager.saveExtrinsic();
    this.refreshDisplay();
  }

  public refreshDisplay() {
    let txt: string = '';
    for (let key of Object.keys(this.resources)) {
      txt += `\n ${(RewardType as any)[key]}: ${(this.resources as any)[key as any]}`;
    }
    txt += '\n----';
    for (let key of Object.keys(this.scores)) {
      txt += `\n ${(ScoreType as any)[key as any]}: ${(this.scores as any)[key as any]}`;
    }

    this.resourceText.text = txt;
  }
}
