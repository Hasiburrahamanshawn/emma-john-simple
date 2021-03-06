import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Shop/Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey)=>{
        //console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(( pd => pd.key === key));
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }  
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        removeProduct ={removeProduct}
                        key ={pd.key}
                        product= {pd}></ReviewItem>)
                }
                {
                    thankYou 
                }
                {
                    !cart.length && <h1>Your cart is empty. <a href="/shop">Keep shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                    { 
                        auth.user ?
                         <button className="main-button">Proceed Checkout</button>
                         : <button className="main-button">Login to Proceed</button>
                    }
                    </Link>
                    
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;