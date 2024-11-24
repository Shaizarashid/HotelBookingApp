import React, { createContext, useState,useContext } from "react";
import all_product from '../Components/Assets/all_product'
import { ThemeContext } from './ThemeContext';


export const ShopContext = createContext(null);

/*const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        const[index] = 0;
    }

    return cart;
 }*/

 const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
         const [cartItems,setCartItems] = useState(getDefaultCart()); 

         const addToCart = (itemId) =>{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}));
            console.log(cartItems);
        }

         const removeFromCart = (itemId) =>{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}));
         }

         const getTotalCartAmount = () =>{
            let totalAmount = 0;
            for(const item in cartItems){
                if(cartItems[item] > 0){
                    let itemInfo = all_product.find((product)=>product.id === Number(item));
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
        
            }

            return totalAmount;
        }

        const getTotalCartItems = () =>{
            let totalItem = 0;
            for (const item in cartItems){
                if(cartItems[item]>0){
                    totalItem+= cartItems[item];
                }
            }
            return totalItem;
        }

        
         const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems,addToCart,removeFromCart};
         return(
            <ShopContext.Provider value ={contextValue}>
                {props.children}
            </ShopContext.Provider>
         )
}

/*const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = all_product.find((product)=>product.id === Number(item));
            totalAmount += itemInfo.new_price * CartItems[item];
        }

        return totalAmount;
    }
}

const getTotalCartItems = () =>{
    let totalItem = 0;
    for (const item in CartItems){
        if(CartItems[item]>0){
            totalItem+= CartItems[item];
        }
    }
    return totalItem;
}*/

export default ShopContextProvider;

