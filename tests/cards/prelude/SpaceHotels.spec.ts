import {expect} from 'chai';
import {SpaceHotels} from '../../../src/cards/prelude/SpaceHotels';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/common/Resources';
import {TestPlayer} from '../../TestPlayer';

describe('SpaceHotels', function() {
  let card: SpaceHotels;
  let player: Player;

  beforeEach(function() {
    card = new SpaceHotels();
    player = TestPlayer.BLUE.newPlayer();
  });

  it('Can not play', function() {
    player.playedCards.push(card);
    expect(player.canPlayIgnoringCost(card)).is.not.true;
  });

  it('Should play', function() {
    player.playedCards.push(card, card);
    expect(player.canPlayIgnoringCost(card)).is.true;

    card.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(4);
  });
});
