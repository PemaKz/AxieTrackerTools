import React, {useEffect} from 'react';
import WebFont from 'webfontloader';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopMenu from './components/TopMenu';
import Analyzer from './pages/Analyzer';
import Claim from './pages/Claim';
import ClaimAndSend from './pages/ClaimAndSend';
import Home from './pages/Home';
import SendAxies from './pages/SendAxies';
import SendTokens from './pages/SendTokens';
import DonateButton from './components/DonateButton';
import SendItems from './pages/SendItems';

/**
 * @return {Element} App Full Page Element
 */
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito'],
      },
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/claimandsend" element={<ClaimAndSend/>} />
          <Route path="/sendaxies" element={<SendAxies />} />
          <Route path="/senditems" element={<SendItems />} />
          <Route path="/sendtokens" element={<SendTokens/>} />
          <Route path="/analyzer" element={<Analyzer/>} />
        </Routes>
        <DonateButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
