import { Player } from '../../models/interfaces/player.interface';

const players: Player[] = [];

export const PlayerService = {
  register(name: string, password: string) {
    let player = players.find((x) => x.name === name);
    if (!player) {
      player = { name, password, wins: 0 };
      players.push(player);
    }
    if (player.password !== password)
      return { success: false, errorText: 'Wrong password' };
    return { success: true, player: player };
  },

  getWinners() {
    return players
      .map((player) => ({ name: player.name, wins: player.wins }))
      .sort((a, b) => b.wins - a.wins);
  },
};