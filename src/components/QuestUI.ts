import * as PIXI from 'pixi.js';
import { AlchemyData, IQuest, IReward, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { QuestItem } from './QuestItem';
import { Button } from './ui/Button';

export class QuestUI extends PIXI.Container {
  public questList: IQuest[] = [];
  public questElements: QuestItem[] = [];

  constructor(private onRewardAdded: (reward: IReward) => void) {
    super();
    let background: PIXI.Graphics;
    let contents: PIXI.Container;

    [background, contents] = AlchemyService.makePanel('Quests', 300, 500);
    let spawnB = new Button({ width: 100, height: 30, label: 'Refresh Quests', onClick: this.refreshQuests });

    this.addChild(background);

    this.addChild(spawnB);
    spawnB.position.set(100, 500 - 50);
  }

  public refreshQuests = () => {
    while (this.questList.length > 0) {
      let quest = this.questList.shift();
    }

    while (this.questElements.length > 0) {
      let el = this.questElements.shift();
      this.removeChild(el);
    }

    // for (let i = 0; i < AlchemyData.config.questsPerDay; i++) {
    //   let index = Math.floor(Math.random() * AlchemyData.quests.length);
    //   let quest = AlchemyData.quests[index];
    //   this.addQuest(quest);
    // }

    AlchemyData.quests.forEach(quest => this.addQuest(quest));

    this.onRewardAdded({type: 'score', id: ScoreType.QuestRefreshes, count: 1});
  }

  public addQuest(quest: IQuest) {
    let index = this.questList.length;
    this.questList.push(quest);
    let h = 60;
    let el = new QuestItem(quest.label, AlchemyService.makeRewardString(quest.reward), () => this.activateQuest(index), 250, h);
    this.addChild(el);
    el.position.set(25, 45 + (h + 5) * this.questElements.length);
    this.questElements.push(el);
  }

  private activateQuest(index: number) {
    let reward = this.questList[index].reward;

    this.onRewardAdded(reward);
    this.onRewardAdded({type: 'score', id: ScoreType.QuestComplete, count: 1});

    this.questElements[index].completeQuest();
  }
}
