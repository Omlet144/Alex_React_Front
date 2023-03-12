import React from "react";

const Cards=({gadgets})=>{
    function buyBtn()
    {
        if(window.sessionStorage.getItem('token')==null || window.sessionStorage.getItem('token')=='null')
        {
            alert("You need to Login!")
        }
        else
        {
            alert("Congratulations you Buy it!")
        }
    }
    return(
        gadgets.map((item, index)=>(
            <div key={index} className="cart" id={item.id}>
                <img className="img_gadget" src={item.image}></img>
                <div className="cart_gadget">{item.name}</div>
                <div className="cart_gadget">{item.model}</div>
                <div className="cart_gadget">{item.price}₴</div>
                <button className="BuyBtn" onClick={buyBtn}>Buy</button>
            </div>
        ))  
    )
}
export default Cards