import axios from 'axios';

export function getCrypto(props) {
    return (dispatch) => {
        axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        )
        .then(res => {
            console.log(res)
            dispatch(setCurrencies(res.data));
        })
        .catch(error => console.log(error));
      };
}


export const setCurrencies = (currencies) => {
  return {
    type : 'SET_CURRENCIES',
    payload : currencies
  }
}

export const setCurrenciesLoading = (currenciesLoading) => {
    return {
      type : 'SET_CURRENCIES_LOADING',
      payload : currenciesLoading
    }
  }