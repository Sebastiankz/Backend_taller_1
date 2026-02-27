// Al inicio de queries.js
const { getNormalizedMonsters } = require("./normalizacion");

function filterMonsters(monsters) {
  return monsters.filter((monster) => monster.cr >= 5 && monster.hp >= 80);
}

function findFirstMonster(monsters) {
  return monsters.find(
    (monster) => monster.type === "dragon" && monster.cr >= 6,
  );
}

function hasLegendaryMonster(monsters) {
  return monsters.some((m) => m.hasLegendary === true);
}

function allHaveCompleteStats(monsters) {
  return monsters.every((m) => Object.keys(m.stats).length === 6 && m.hp > 0);
}

function groupByStats(monsters) {
  const grouped = monsters.reduce((acc, monster) => {
    const type = monster.type;

    if (!acc[type]) {
      acc[type] = { count: 0, sumCR: 0, maxHP: 0 };
    }

    acc[type].count += 1;
    acc[type].sumCR += monster.cr;

    if (monster.hp > acc[type].maxHP) {
      acc[type].maxHP = monster.hp;
    }

    return acc;
  }, {});

  for (let type in grouped) {
    grouped[type].avgCR = grouped[type].sumCR / grouped[type].count;
    delete grouped[type].sumCR;
  }

  return grouped;
}

function getBucket(cr) {
  if (cr <= 1) return "0-1";
  if (cr <= 4) return "2-4";
  if (cr <= 9) return "5-9";
  return "10+";
}

function groupByCRBucket(monsters) {
  return monsters.reduce(
    (acc, monster) => {
      const bucket = getBucket(monster.cr);
      acc[bucket] = acc[bucket] + 1;
      return acc;
    },
    { "0-1": 0, "2-4": 0, "5-9": 0, "10+": 0 },
  );
}

async function main() {
  const monsters = await getNormalizedMonsters();

  console.log("Filter:", filterMonsters(monsters));
  console.log("Find dragon:", findFirstMonster(monsters));
  console.log("Has legendary:", hasLegendaryMonster(monsters));
  console.log("All complete:", allHaveCompleteStats(monsters));
  console.log("Group by type:", groupByStats(monsters));
  console.log("CR Buckets:", groupByCRBucket(monsters));
}
main();

module.exports = {
  filterMonsters,
  findFirstMonster,
  hasLegendaryMonster,
  allHaveCompleteStats,
  groupByStats,
  groupByCRBucket,
};
