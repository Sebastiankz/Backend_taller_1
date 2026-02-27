const { getMonsterList, getMonsterDetails } = require("./get_json");

(async () => {
    try {
        const monsterList = await getMonsterList(10); 
        const monsterDetails = await getMonsterDetails(monsterList);
        const normalizedData = monsterDetails.map(monster => {            
            let finalAc = 0;
            if (Array.isArray(monster.armor_class)) {
                finalAc = monster.armor_class[0].value;
            } else {
                finalAc = monster.armor_class;
            }
            const speedValues = monster.speed ? Object.values(monster.speed).map(s => parseInt(s)) : [0];
            const finalSpeed = Math.max(...speedValues);

            return {
                index: monster.index,
                name: monster.name,
                size: monster.size,
                type: monster.type,
                alignment: monster.alignment,                
                cr: monster.challenge_rating, 
                ac: finalAc,
                hp: monster.hit_points,
                speed: finalSpeed,
                stats: {
                    str: monster.strength,
                    dex: monster.dexterity,
                    con: monster.constitution,
                    int: monster.intelligence,
                    wis: monster.wisdom,
                    cha: monster.charisma
                },                
                immuneCount: monster.damage_immunities?.length || 0,
                resistCount: monster.damage_resistances?.length || 0,
                vulnCount: monster.damage_vulnerabilities?.length || 0,                
                hasLegendary: (monster.legendary_actions?.length || 0) > 0
            };
        });

        console.log(normalizedData);

    } catch (error) {
        console.error("Error ejecutando el script:", error);
    }
})();