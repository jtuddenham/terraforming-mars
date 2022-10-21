import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {PlaceCityTile} from '../../deferredActions/PlaceCityTile';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ResearchOutpost extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.RESEARCH_OUTPOST,
      tags: [Tag.SCIENCE, Tag.CITY, Tag.BUILDING],
      cost: 18,

      cardDiscount: {amount: 1},
      metadata: {
        cardNumber: '020',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 1 M€ less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-1);
          }).br;
          b.city();
        }),
        description: 'Place a city tile NEXT TO NO OTHER TILE.',
      },
    });
  }
  public override bespokeCanPlay(player: Player) {
    return player.game.board.getAvailableSpacesForType(player, 'isolated').length > 0;
  }

  public override bespokePlay(player: Player) {
    player.game.defer(new PlaceCityTile(player, {type: 'isolated'}));
    return undefined;
  }
}
