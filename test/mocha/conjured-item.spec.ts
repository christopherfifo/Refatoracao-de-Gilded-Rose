import { strict as assert } from 'assert';
import { Item, GildedRose } from '../../app/gilded-rose';

describe('Conjured Item', () => {
    let gildedRose;
    let items;

    beforeEach(() => {
        items = [new Item('Conjured Item', 3, 6)];
        gildedRose = new GildedRose(items);
    });

    it('deve diminuir a qualidade em 2 unidades quando SellIn é maior que 0', () => {
        gildedRose.updateQuality();
        assert.strictEqual(items[0].quality, 4);
    });

it('deve diminuir a qualidade em 4 unidades quando SellIn é menor que 0', () => {
    gildedRose.updateQuality();
    gildedRose.updateQuality(); 
    gildedRose.updateQuality(); 
    assert.strictEqual(items[0].quality, 0); 
});

    it('a qualidade não deve ser negativa', () => {
        items[0].quality = 0;
        gildedRose.updateQuality();
        assert.strictEqual(items[0].quality, 0);
    });

    it('deve respeitar as regras de qualidade para Aged Brie', () => {
        items = [new Item('Aged Brie', 3, 6)];
        gildedRose = new GildedRose(items);
        gildedRose.updateQuality();
        assert.strictEqual(items[0].quality, 7);
    });

    it('deve respeitar as regras de qualidade para Backstage Passes', () => {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20)];
        gildedRose = new GildedRose(items);
        gildedRose.updateQuality();
        assert.strictEqual(items[0].quality, 22);
    });

    it('deve definir a qualidade como 0 após a data de venda', () => {
        items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
        gildedRose = new GildedRose(items);
        gildedRose.updateQuality();
        assert.strictEqual(items[0].quality, 0);
    });
});