import axios from 'axios';

export function getCrypto(props) {
    return (dispatch) => {
        dispatch(setCurrenciesLoading(true))
        axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        )
        .then(async res => {
            let today =  Math.round((new Date()).getTime() / 1000)
            let yesterday =  Math.round((new Date()).getTime() / 1000) - 24*60*60*7
            for(let i=0; i< res.data.length; i++){
                let chart = await axios.get(`https://api.coingecko.com/api/v3/coins/${res.data[i].id}/market_chart/range?vs_currency=USD&from=${yesterday}&to=${today}`)
                console.log(chart)
                res.data[i].chart = chart.data.prices
            }
            return res.data
        })
        .then ((res)=> {
            dispatch(setCurrencies(res))
            dispatch(setCurrenciesLoading(false))
        })
        .catch(error => {
            console.log(error)
            dispatch(setCurrenciesLoading(false))
        })
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