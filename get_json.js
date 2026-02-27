const response = await fetch("https://www.dnd5eapi.co/api/monsters");
const data = await response.json();
console.log(data);
