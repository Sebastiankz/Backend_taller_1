const mockData = [
  {
    index: "adult-black-dragon",
    name: "Adult Black Dragon",
    size: "Huge",
    type: "dragon",
    alignment: "chaotic evil",
    challenge_rating: 14, 
    armor_class: [{ type: "natural", value: 19 }], 
    hit_points: 195,
    speed: { walk: "40 ft.", fly: "80 ft.", swim: "40 ft." },
    strength: 23,
    dexterity: 14,
    constitution: 21,
    intelligence: 14,
    wisdom: 13,
    charisma: 17,
    damage_immunities: ["acid"],
    damage_resistances: [],
    damage_vulnerabilities: [],
    legendary_actions: [{}, {}, {}] 
  }
];

const normalizedData = mockData.map((monster => {
    let finalac=0; // armor_class (ojo: a veces es array)
        if (Array.isArray(monster.armor_class)){
            ac=monster.armor_class[0].value;
        }else{
            ac=monster.armor_class;
        }
    
    const speed = Object.values(monster.speed).map(s => parseInt(s))
    const fspeed = Math.max(...speed);

    return{
        index: monster.index,
        name: monster.name,
        size: monster.size,
        type: monster.type,
        alignment: monster.alignment,
        cr: monster.challenge_rating,
        ac: finalac,
        hp: monster.hit_points,
        speed: fspeed,
        stats: {
        str: monster.strength,
        dex: monster.dexterity,
        con: monster.constitution,
        int: monster.intelligence,
        wis: monster.wisdom,
        cha: monster.charisma
        },
        immuneCount: monster.damage_immunities.length,
        resistCount: monster.damage_resistances.length,
        vulnCount: monster.damage_vulnerabilities.length,
        hasLegendary: monster.legendary_actions.length

    }}));

    console.log(normalizedData);