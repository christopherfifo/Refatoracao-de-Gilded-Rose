export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (true) {
        case item.name === 'Sulfuras, Hand of Ragnaros':
          break;

        case item.name === 'Aged Brie':
          this.updateAgedBrie(item);
          break;

        case item.name.startsWith('Backstage passes'):
          this.updateBackstagePass(item);
          break;

        case item.name.toLowerCase().includes('conjured'):
          this.updateConjured(item);
          break;

        default:
          this.updateNormalItem(item);
      }
    }
    return this.items;
  }

  private updateAgedBrie(item: Item) {
    item.sellIn--;
    if (item.quality < 50) {
      item.quality++;
      if (item.sellIn < 0 && item.quality < 50) {
        item.quality++;
      }
    }
  }

  private updateBackstagePass(item: Item) {
    item.sellIn--;
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }
    if (item.quality < 50) {
      item.quality++;
      if (item.sellIn < 10 && item.quality < 50) {
        item.quality++;
      }
      if (item.sellIn < 5 && item.quality < 50) {
        item.quality++;
      }
    }
  }

  private updateConjured(item: Item) {
    item.sellIn--;
    if (item.quality > 0) {
      item.quality -= 2;
      if (item.sellIn < 0) {
        item.quality -= 2;
      }
      if (item.quality < 0) item.quality = 0;
    }
  }

  private updateNormalItem(item: Item) {
    item.sellIn--;
    if (item.quality > 0) {
      item.quality--;
      if (item.sellIn < 0) {
        item.quality--;
      }
      if (item.quality < 0) item.quality = 0;
    }
  }
}