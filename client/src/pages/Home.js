import React from 'react';
import CryptoTracker from '../components/CryptoTracker';

function Home() {
    return (
      <div>
        <div className="homeBackground">
          <h1 className="home-title">Coinmarketcap</h1>
          <CryptoTracker/>
        </div>
      </div>
    );
}
export default Home;