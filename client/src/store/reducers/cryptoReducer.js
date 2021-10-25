const initialState = {
  currencies : [],
  currenciesLoading : false,
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'SET_CURRENCIES' : 
      return { ...state, currencies : action.payload }
    case 'SET_CURRENCIES_LOADING' : 
        return { ...state, currenciesLoading : action.payload }
    default :
      return state
  }
}
