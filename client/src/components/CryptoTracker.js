import React, {useEffect} from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { getCrypto } from "../store/actions/cryptoActions";

function CryptoTracker (props){
    const { currencies} = useSelector(state => state.cryptoReducer);

    useEffect(()=> {
        dispatch(getCrypto())
    }, [])

    const  numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const dispatch = useDispatch();
    return (
        <>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Market Cap</th>
                <th scope="col">24 %</th>
                <th scope="col">Circulating Supply</th>
                </tr>
            </thead>
            <tbody>
                {currencies.map((currency, idx)=> {
                    return (
                        <tr>
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
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </>
    );
}
export default CryptoTracker;
