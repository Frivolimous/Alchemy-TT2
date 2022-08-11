import * as PIXI from 'pixi.js';
import { AlchemyData, IIngredient, IngredientIndex, IQuest } from '../data/AlchemyData';
import { Colors } from '../data/Colors';

export class IngredientItem extends PIXI.Container {
  public static ssurl = './assets/IngredientTypes.png';
  public static baseTexture: PIXI.BaseTexture;
  public static textures: PIXI.Texture[] = [];

  public static initSS() {
    if (!this.baseTexture) {
      this.baseTexture = PIXI.BaseTexture.from(this.ssurl);

      let across = 6;
      let totalWidth = 1238;
      let totalHeight = 765;
      let x1 = 9;
      let y1 = 4;
      let width = 190;
      let height = 190;
      let offX = 207;
      let offY = 252;

      for (let index = 0; index < 18; index++) {
        this.textures[index] = new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(x1 + (index % across) * offX, y1 + Math.floor(index / across) * offY, width, height));
      }
    }

  }
  public static getSprite(index: number) {
    IngredientItem.initSS();

    let texture = this.textures[index];

    return new PIXI.Sprite(texture);
  }

  public textBlock: PIXI.Text;
  public sprite: PIXI.Sprite;
  public background = new PIXI.Graphics();
  public ingredient: IIngredient;
  public counter: PIXI.Text;

  private highlight = new PIXI.Graphics();

  constructor(private index: number, private onSelect: (index: number, selected: boolean) => boolean, private mySize: number) {
    super();

    this.textBlock = new PIXI.Text('', { fill: 0xffffff, fontSize: 14, align: 'center' });
    this.textBlock.x = (mySize - this.textBlock.width) / 2;

    this.drawBack(Colors.PANEL_BACK_INNER, Colors.PANEL_BORDER_INNER);
    this.highlight.lineStyle(3, Colors.QUEST_BACK).drawRect(0, 0, this.mySize, this.mySize);
    this.highlight.visible = false;

    this.addChild(this.background, this.textBlock, this.highlight);

    if (onSelect) {
      this.buttonMode = true;
      this.interactive = false;
      this.addListener('pointerdown', this.onClick);
    }
  }

  public get isSelected() { return this.highlight.visible; }

  public set count(count: number) {
    if (!this.counter) {
      this.counter = new PIXI.Text('0', {fontSize: 12, fontWeight: 'bold', stroke: 0xffffff, strokeThickness: 2});
      this.counter.anchor.set(1, 1);
      this.counter.position.set(this.mySize, this.mySize);
    }

    this.addChild(this.counter);
    this.counter.text = String(count);
  }

  public get count(): number {
    return Number(this.counter.text);
  }

  public setText(s: string) {
    this.textBlock.text = s;
    if (this.textBlock.width > this.mySize - 5) {
      this.textBlock.width = this.mySize - 5;
      this.textBlock.scale.y = this.textBlock.scale.x;
    }

    this.textBlock.x = (this.mySize - this.textBlock.width) / 2;
    this.textBlock.y = (this.mySize - this.textBlock.height) / 2;
  }

  public setIngredient(ingredient?: IIngredient) {
    this.ingredient = ingredient;
    this.highlight.visible = false;

    if (ingredient) {
      this.textBlock.text = '';
      if (this.sprite) {
        this.sprite.destroy();
      }

      this.sprite = IngredientItem.getSprite(IngredientIndex[ingredient.id]);
      this.addChild(this.sprite);
      this.sprite.width = this.mySize;
      this.sprite.scale.y = this.sprite.scale.x;

      if (!this.onSelect) return;

      this.interactive = true;
    } else {
      this.textBlock.text = '';
      if (this.sprite) {
        this.sprite.destroy();
        this.sprite = null;
      }

      if (!this.onSelect) return;

      this.interactive = false;
    }
  }

  public drawBack(backColor: number, borderColor: number) {
    this.background.clear().beginFill(backColor).lineStyle(1, borderColor)
      .drawRect(0, 0, this.mySize, this.mySize);
  }

  public onClick = () => {
    let selected = this.highlight.visible;
    let isSuccessful = this.onSelect(this.index, !selected);

    if (isSuccessful) {
      this.highlight.visible = !selected;
    }
  }
}
