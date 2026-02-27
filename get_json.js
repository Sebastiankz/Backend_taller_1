const getMonsterList = async (n = undefined) => {
  const response = await fetch("https://www.dnd5eapi.co/api/monsters");
  const data = await response.json();
  if (n) {
    return data.results.slice(0, n);
  }
  return data.results;
};

const getMonsterDetails = async (monsterList) => {
  const promesas = monsterList.map((monster) =>
    fetch(`https://www.dnd5eapi.co${monster.url}`),
  );
  const respuestas = await Promise.all(promesas);
  const detalles = await Promise.all(respuestas.map((res) => res.json()));
  return detalles;
};

(async () => {
  try {
    const monsterList = await getMonsterList(5);
    const monsterDetails = await getMonsterDetails(monsterList);
    console.log(monsterDetails);
  } catch (error) {
    console.error("Error:", error.message || error);
  }
})();
