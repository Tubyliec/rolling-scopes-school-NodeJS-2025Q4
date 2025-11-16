import { Player } from '../../models/intarfaces/player.interface';

const players: Player[] = [];

export const PlayerService = {
  register(name: string, password: string) {
    let player = players.find((player) => player.name === name);
    if (!player) {
      player = { name, password, wins: 0 };
      players.push(player);
      return { player, error: false, errorText: '' };
    }
    if (player.password !== password) {
      return { player: null, error: true, errorText: 'Wrong password' };
    }
    return { player, error: false, errorText: '' };
  },

  getWinners() {
    return players
      .sort((a, b) => b.wins - a.wins)
      .map(({ name, wins }) => ({ name, wins }));
  },
};