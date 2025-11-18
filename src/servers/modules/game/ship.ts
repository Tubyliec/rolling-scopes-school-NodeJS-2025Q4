import { Ship } from '../../models/interfaces/ship.interface';

export function shipCells(ship: Ship) {
  const cells: { x: number; y: number }[] = [];
  const { x, y } = ship.position;

  for (let i = 0; i < ship.length; i++) {
    if (ship.direction) {
      cells.push({ x, y: y + i });
    } else {
      cells.push({ x: x + i, y });
    }
  }
  return cells;
}

export function isShipKilled(ship: Ship) {
  const cells = shipCells(ship);
  if (!ship.hits) return false;
  return cells.every((cell) =>
    ship.hits!.some((hit) => hit.x === cell.x && hit.y === cell.y),
  );
}
