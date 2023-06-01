import {types} from "./actions";

const initialState = {
    allPokemons:{},
    pageCant:0,
    pageState:1,
    filters: [],
    filterDb: "All",
    order:"Asc",
    allTypes:[]
}

export default function reducer(state = initialState, {type,payload}){
    switch (type){
        case types.ALL_CHARACTERS:
            return {...state, allPokemons: payload};
        case types.PAGE_CANT:
            return {...state, pageCant:payload}
        case types.PAGE_STATE:
            return {...state, pageState: payload};
        case types.FILTER_TYPES:
            return {...state, filters: payload};
        case types.FILTER_DB:
            return {...state, filterDb: payload};
        case types.ORDER:
            return{...state,order: payload}    
        case types.ALL_TYPES:
            return{...state,allTypes: payload}
        default:
            return state
    }
}