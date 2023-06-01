const getStatsAndTypes = (data) =>{
    const {id, name,sprites,weight, height, stats } = data;
    const types = data.types.map((e) => e.type.name);
    const statsPoke = stats.reduce((acc, e) => {
        acc[e.stat.name] = e.base_stat;
        return acc;
      }, {});
      const {hp,attack,defense,speed} = statsPoke;
    const pokemon = { pokemon: {id,name,image: sprites.front_default , hp,attack,defense,speed, weight, height,types }}
    return pokemon;
};

module.exports = {getStatsAndTypes};
