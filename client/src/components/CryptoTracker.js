import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { getCrypto } from "../store/actions/cryptoActions";
import { Chart } from 'react-charts'

function CryptoTracker (){
    const { currencies, currenciesLoading} = useSelector(state => state.cryptoReducer);

    useEffect(()=> {
        dispatch(getCrypto())
    }, [])

    
    const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )    

    const  numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const dispatch = useDispatch();
    return (
        <>
        {
           currenciesLoading &&
           <div style={  {height: 400, width: '100%'}}> 
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }
        {   !currenciesLoading &&
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Market Cap</th>
                <th scope="col">24 %</th>
                <th scope="col">Circulating Supply</th>
                <th scope="col">Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {currencies.map((currency, idx)=> {
                        const data = [
                            {
                              data: currency.chart
                            }
                      ]
                  
                    return (
                        <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>
                                <img style={{height: 20, marginRight: 10}} src={currency.image}/>
                                {currency.name}
                                <text style={{color: 'gray', marginLeft: 10}}>{currency.symbol.toUpperCase()}</text>
                            </td>
                            <td>{numberWithCommas(currency.current_price)} USD</td>
                            <td>{numberWithCommas(currency.market_cap)} USD</td>
                            <td>
                                <text style={{color: currency.price_change_percentage_24h >= 0? 'green' : 'red'}}>
                                    {numberWithCommas(Math.abs(currency.price_change_percentage_24h.toFixed(2)))}
                                </text>
                            </td>
                            <td>{numberWithCommas(currency.circulating_supply)} {currency.symbol.toUpperCase()}</td>
                            <td>
                                <div style={{ width: 250, height: 100}}>
                                    <Chart data={data} axes={axes} options={{legend: {display: false}}} />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        }
        </>
    );
}
export default CryptoTracker;
