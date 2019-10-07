function CreateMap(strings) {
  if (strings.length !== 1) {
    return new Error('Templates with parameters are not supported');
  }

  const lines = strings[0].split('\n');
  const grid = lines.map(line => line.trim().split('').map(Number));

  return new Map(grid);
}

function hash(x, y) {
  return `x${x}-y${y}`;
}

class Island {
  constructor(x, y) {
    this.landCoords = new Set();

    if (x !== undefined && y !== undefined) {
      this.add(x, y);
    }
  }

  add(x, y) {
    if (this.landCoords.size > 0 && !this.adjecentTo(x, y)) {
      throw new Error('This would make the island non-continuous');
    }

    this.landCoords.add(hash(x, y));
  }

  contains(x, y) {
    return this.landCoords.has(hash(x, y));
  }

  adjecentTo(x, y) {
    return this.contains(x + 1, y)
      || this.contains(x - 1, y)
      || this.contains(x, y + 1)
      || this.contains(x, y - 1);
  }

  merge(island) {
    island.landCoords.forEach(hash => this.landCoords.add(hash));
  }
}

function findAdjecentIslands(islands, x, y) {
  return islands.filter((island) => island.adjecentTo(x, y));
}

class Map {
  constructor(grid) {
    this.grid = grid;
  }

  countIslands() {
    let islands = [];
    this.grid.forEach((row, x) =>
      row.forEach((isLand, y) => {
        if (!isLand) return;

        const adjIslands = findAdjecentIslands(islands, x, y);
        if (adjIslands.length === 1) {
          adjIslands[0].add(x, y);
        } else if (adjIslands.length === 2) {
          adjIslands[0].add(x, y);
          adjIslands[0].merge(adjIslands[1]);
          islands = islands.filter(i => i !== adjIslands[1]);
        } else {
          islands.push(new Island(x, y));
        }
      })
    );

    return islands.length;
  }
}

module.exports = {
  CreateMap,
  Island,
  Map,
};