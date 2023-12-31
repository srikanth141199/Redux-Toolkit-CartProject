import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calTotals,getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

function App() {

  const {cartItems,isLoading} = useSelector((store)=>store.cart)
  const {isOpen} = useSelector((store)=>store.modal)
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(calTotals())},[cartItems])

  useEffect(()=>{dispatch(getCartItems())},[]);

  if(isLoading){
    return(
      <div className="loading">
        <h1>Loading....</h1>
      </div>
    )
  }

  
  return <main>
    {isOpen &&  <Modal/>}
    <Navbar/>
    <CartContainer/>
  </main>;
}
export default App;
