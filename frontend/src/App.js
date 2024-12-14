import { Route, Routes } from 'react-router-dom';
import LandingPage from './Main/LandingPage';
import AllItems from './Main/AllItems';
import ProductDetailsPage from './Main/ProductDetailsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/products' element = {<AllItems/>}/>
      <Route path='/products/:id' element = {<ProductDetailsPage/>}/>
      {/* <Route path='/Login' element = {<LoginPage/>}/>
      <Route path='/register' element = {<SignupPage/>}/>
      <Route path='/MarketOverview' element = {<MarketOverview/>}/>
      <Route path='/Chart' element = {<Chart/>}/>
      <Route path='/Profile' element = {<Profile/>}/>
      <Route path='/Journal' element = {<Journal/>}/> */}
    </Routes>
  );
}

export default App;
