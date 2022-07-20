import * as PIXI from 'pixi.js';
import { AlchemyData, IQuest, IReward, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';
import { QuestItem } from './QuestItem';
import { Button } from './ui/Button';

export class QuestUI extends PIXI.Container {
  public questList: { quest: IQuest, completed: boolean }[] = [];
  public questElements: QuestItem[] = [];

  constructor(private onRewardAdded: (reward: IReward) => void) {
    super();
    let background: PIXI.Graphics;
    let contents: PIXI.Container;

    let extrinsic = SaveManager.getExtrinsic();
    this.questList = extrinsic.quests;

    [background, contents] = AlchemyService.makePanel('Quests', 300, 500);
    let spawnB = new Button({ width: 100, height: 30, label: 'Refresh Quests', onClick: this.refreshQuests });

    this.addChild(background);

    this.addChild(spawnB);
    spawnB.position.set(100, 500 - 50);

    if (this.questList.length === 0) {
      this.refreshQuests();
    }

    this.updateDisplay();
  }

  public refreshQuests = () => {
    while (this.questList.length > 0) {
      this.questList.shift();
    }

    // for (let i = 0; i < AlchemyData.config.questsPerDay; i++) {
    //   let index = Math.floor(Math.random() * AlchemyData.quests.length);
    //   let quest = AlchemyData.quests[index];
    //   this.addQuest(quest);
    // }

    AlchemyData.quests.forEach(quest => this.addQuest(quest));
    SaveManager.saveExtrinsic();

    this.updateDisplay();

    this.onRewardAdded({type: 'score', id: ScoreType.QuestRefreshes, count: 1});
  }

  public addQuest(quest: IQuest) {
    let index = this.questList.length;
    this.questList.push({quest, completed: false});
  }

  public updateDisplay() {
    while (this.questElements.length > 0) {
      let el = this.questElements.shift();
      this.removeChild(el);
    }

    this.questList.forEach((entry, index) => {
      let h = 60;
      let el = new QuestItem(entry.quest.label, AlchemyService.makeRewardString(entry.quest.reward), () => this.activateQuest(index), 250, h);
      if (entry.completed) el.completeQuest();
      this.addChild(el);
      el.position.set(25, 45 + (h + 5) * this.questElements.length);
      this.questElements.push(el);
    });
  }

  private activateQuest(index: number) {
    let reward = this.questList[index].quest.reward;
    this.questList[index].completed = true;

    this.onRewardAdded(reward);
    this.onRewardAdded({type: 'score', id: ScoreType.QuestComplete, count: 1});

    this.questElements[index].completeQuest();
    SaveManager.saveExtrinsic();
  }
}
