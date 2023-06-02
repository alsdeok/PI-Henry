export const types ={
    ALL_CHARACTERS: "ALL_CHARACTERS",
    ALL_TYPES: "ALL_TYPES",
    PAGE_CANT: "PAGE_CANT",
    PAGE_STATE: "PAGE_STATE",
    FILTER_TYPES: "FILTER_TYPES",
    FILTER_DB: "FILTER_DB",
    ORDER: "ORDER",
    STATE_ORDER: "STATE_ORDER"



}

export const charactersToShow = (characters) =>{ //pokes a mostrar
    return{
        type: types.ALL_CHARACTERS,
        payload: characters
    }

}

export const allTypes = (type) =>{ //todos los tipos de la api
    return {
        type: types.ALL_TYPES,
        payload: type
    }
}



export const setPageCant = (page) =>{ // cantidad de paginas que hay
    return{
        type: types.PAGE_CANT,
        payload:page
    }
}

export const pageState = (page) =>{ // estado actual de la pagina(numero actual)
    return{
        type:types.PAGE_STATE,
        payload:page
    }
}

export const filterTypes = (tipos) =>{ // filtrado por tipos
    return{
        type: types.FILTER_TYPES,
        payload: tipos
    }

}

export const filterDB = (filtrodb) =>{ // filtrado por api o db
    return{
        type: types.FILTER_DB,
        payload: filtrodb
    }

}

export const filterorder = (order) =>{ // filtrado por orden asc o des
    return{
        type: types.ORDER,
        payload: order
    }

}

export const stateOrderNameAt = (type) =>{ // filtrado por nombre o ataque
    return {
        type: types.STATE_ORDER,
        payload:type
    }
}

