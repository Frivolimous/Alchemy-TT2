export type CurrencySlug = 'gold' | 'tokens' | 'refresh' | 'suns' | 'souls';

export interface IExtrinsicModel {
  achievements: boolean[];
  // flags: boolean[];
  // scores?: number[];

  currency: {[key in CurrencySlug]?: number};

  firstVersion?: number;
  logins?: number;

  lastCharacter: string;

  artifacts?: number[];
  cosmetics?: number[];

  skillTrees?: number[];

  options: {
    autoFill: boolean;
  };
}

export const dExtrinsicModel: IExtrinsicModel = {
  achievements: [],
  lastCharacter: undefined,
  currency: {
    gold: 0,
    tokens: 0,
    refresh: 0,
    suns: 0,
    souls: 0,
  },

  options: {
    autoFill: false,
  },
};
