export const types ={
    ALL_CHARACTERS: "ALL_CHARACTERS",
    PAGE_CANT: "PAGE_CANT",
    PAGE_STATE: "PAGE_STATE",
    FILTER_TYPES: "FILTER_TYPES",
    FILTER_DB: "FILTER_DB",
    ORDER: "ORDER",
    ALL_TYPES: "ALL_TYPES",
    STATE_ORDER: "STATE_ORDER"

}

export const charactersToShow = (characters) =>{
    return{
        type: types.ALL_CHARACTERS,
        payload: characters
    }

}

export const setPageCant = (page) =>{
    return{
        type: types.PAGE_CANT,
        payload:page
    }
}

export const pageState = (page) =>{
    return{
        type:types.PAGE_STATE,
        payload:page
    }
}

export const filterTypes = (tipos) =>{
    return{
        type: types.FILTER_TYPES,
        payload: tipos
    }

}

export const filterDB = (filtrodb) =>{
    return{
        type: types.FILTER_DB,
        payload: filtrodb
    }

}

export const filterorder = (order) =>{
    return{
        type: types.ORDER,
        payload: order
    }

}

export const allTypes = (type) =>{
    return {
        type: types.ALL_TYPES,
        payload: type
    }
}

export const stateOrderNameAt = (type) =>{
    return {
        type: types.STATE_ORDER,
        payload:type
    }
}