// import dotenv from 'dotenv';
// dotenv.config();
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import kid_banner from './Components/Assets/Frontend_Assets/banner_kids.png';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png';
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import PageNotFound from './Pages/PageNotFound';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Payment from './Components/Payment'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import UserProfile from './Components/UserProfile';
import About from './Components/About';
import Contact from './Components/Contact';
import ScrollToTop from './Components/ScroleToTop';
import OrderSuccess from './Components/OrderSuccess';

function App() {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Shop/>}/>
         <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />}/>
         <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />}/>
         <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid' />}/>
         
         <Route path='/product' element={<Product/>}>
         <Route path='/product:productId' element={<Product/>}/>


         </Route>

         <Route path='/profile' element={<UserProfile/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/contact' element={<Contact/>}/>


         <Route path='/cart' element={<Cart/>}/>
         <Route path='/login' element={<LoginSignup/>}/>
         <Route path='/*' element={<PageNotFound/>}/>
         <Route path='/payment' element={<Payment/>}/>
         <Route path='/order-success' element={<OrderSuccess/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
