import * as PIXI from 'pixi.js';
import { BaseUI } from './_BaseUI';
import { Fonts } from '../data/Fonts';
import { IResizeEvent } from '../services/GameEvents';
import { QuestUI } from '../components/QuestUI';
import { ResourceUI } from '../components/ResourceUI';
import { IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Button } from '../components/ui/Button';
import { IngredientUI } from '../components/IngredientUI';
import { Colors } from '../data/Colors';
import { SimpleModal } from '../components/ui/modals/SimpleModal';

export class GameUI extends BaseUI {
  private title: PIXI.Text;
  private questUI: QuestUI;
  private resourceUI: ResourceUI;
  private ingredientUI: IngredientUI;
  private toggleButton: Button;

  constructor() {
    super({bgColor: Colors.GAME_BACK});
    this.title = new PIXI.Text('Alchemy Test', { fontSize: 30, fontFamily: Fonts.UI, fill: 0x3333ff });
    this.questUI = new QuestUI(this.addRewardQuest);
    this.resourceUI = new ResourceUI();
    this.ingredientUI = new IngredientUI(this.addRewardCraft);
    this.toggleButton = new Button({ width: 100, height: 30, label: 'Toggle Panel', onClick: this.togglePanel });
    this.addChild(this.title, this.toggleButton, this.questUI, this.resourceUI, this.ingredientUI);
    this.questUI.visible = false;
    // this.ingredientUI.visible = false;
    this.togglePanel();
    this.questUI.refreshQuests();
  }

  public positionElements = (e: IResizeEvent) => {
    this.title.x = (e.innerBounds.width - this.title.width) / 2;
    this.title.y = 50;

    this.questUI.y = 100;
    this.ingredientUI.y = 100;
    this.questUI.x = this.ingredientUI.x = 50;

    this.resourceUI.y = 100;
    this.resourceUI.x = 400;
    this.toggleButton.position.set(5, 5);
  }

  private addRewardQuest = (reward: IReward) => {
    if (reward.type === 'value') {
      this.resourceUI.addResource(reward.id, reward.count);
    } else if (reward.type === 'score') {
      this.resourceUI.addScore(reward.id, reward.count);
    } else {
      this.ingredientUI.addIngredient(reward.id, reward.count);
    }
  }

  private addRewardCraft = (reward: IReward) => {
    if (reward) {
      let dialogueText: string = '';
      if (reward.type === 'value') {
        this.resourceUI.addResource(reward.id, reward.count);
        dialogueText = `Congratulations! You crafted ${reward.count} ${RewardType[reward.id]}(s).`;
      } else if (reward.type === 'score') {
        this.resourceUI.addScore(reward.id, reward.count);
        dialogueText = `Congratulations! You crafted ${reward.count} ${ScoreType[reward.id]}(s).`;
      } else {
        this.ingredientUI.addIngredient(reward.id, reward.count);
        dialogueText = `Congratulations! You crafted ${reward.count} ${IngredientType[reward.id]}(s).`;
      }
      let dialogue = new SimpleModal(dialogueText);
      this.addDialogueWindow(dialogue);
      this.resourceUI.addScore(ScoreType.CombinationMade, 1);
    } else {
      let dialogue = new SimpleModal('Oops!  No recipe found!');
      this.addDialogueWindow(dialogue);
    }
  }

  private togglePanel = () => {
    if (this.questUI.visible) {
      this.questUI.visible = false;
      this.ingredientUI.visible = true;
      this.toggleButton.addLabel('Show Quests');
    } else {
      this.questUI.visible = true;
      this.ingredientUI.visible = false;
      this.toggleButton.addLabel('Show Ingredients');
    }
  }
}
