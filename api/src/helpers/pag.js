const pag = (query,pokes) => {
    const {page} = query
    let pages = [];
    for(let i = 0; i < pokes.length;i+=12){
        pages.push(pokes.slice(i, i +12))
    }
    const pagPoke = pokes?.slice((Number(page) - 1) * 12, Number(page) * 12)
    return [pagPoke, pages.length]
}

module.exports = {
    pag
}