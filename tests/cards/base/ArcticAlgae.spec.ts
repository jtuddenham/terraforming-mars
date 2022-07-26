import {expect} from 'chai';
import {ArcticAlgae} from '../../../src/cards/base/ArcticAlgae';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {runNextAction} from '../../TestingUtils';
import {TestPlayer} from '../../TestPlayer';

describe('ArcticAlgae', function() {
  let card: ArcticAlgae;
  let player: Player;
  let player2: Player;
  let game: Game;

  beforeEach(function() {
    card = new ArcticAlgae();
    player = TestPlayer.BLUE.newPlayer();
    player2 = TestPlayer.RED.newPlayer();
    game = Game.newInstance('gameid', [player, player2], player);
  });

  it('Can not play', function() {
    (game as any).temperature = -10;
    expect(player.canPlayIgnoringCost(card)).is.not.true;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.plants).to.eq(1);
    player.playedCards.push(card);

    game.addOceanTile(player2, game.board.getAvailableSpacesForOcean(player2)[0].id);
    runNextAction(game);
    expect(player.plants).to.eq(3);
  });
});
