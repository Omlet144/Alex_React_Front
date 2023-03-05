import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLogo from '../logout_black_24dp.svg';
import ReactLogo2 from '../person_outline_black_24dp.svg';
import ReactLogo3 from '../create_black_24dp.svg';

function Main(){

    const [gadgets, setGadgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, setFlag] = useState(0);
    const [flag2, setFlag2] = useState(0);
    
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You don`t login!');
        }
        else{
            
            console.log(window.sessionStorage.getItem('token'));
            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    function getAllGadgets(){
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgets",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setGadgets(data.data);    
            })
            setFlag(1);
            
        }
    }
    function getGadgetsById(id)
    {
        console.log(id);
        axios({
            method:'get',
            url: `https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetbyId_Category?id=${id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data);    
        });
        
    }
    function getCategorys()
    {
        if(flag2 == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Category/GetCategorys",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setCategories(data.data);
            })
            setFlag2(1);
        }
    }
    function buyBtn()
    {
        if(window.sessionStorage.getItem('token')==null || window.sessionStorage.getItem('token')=='null')
        {
            alert("You need to Login!")
            console.log(window.sessionStorage.getItem('token'));
        }
        else
        {
            console.log(window.sessionStorage.getItem('token'));
            alert("Congratulations you Buy it!")
        }
    }
    return(
    <div className="App1">
        <div className="App-header1">
            
            <div className="hamburger">
                <div className="hamburgerMenu">
                    <div><Link className="link" to="/regist">Regist</Link></div>
                    <div><Link className="link" to="/login">Login</Link></div>
                    <div><b className="link"  style={{ cursor: 'pointer'}} id="out" onClick={()=>getOut()}>Out</b></div> 

                    {
                        categories.map((item, index)=>(
                            <div key={index} style={{ cursor: 'pointer'}} className = "link" id={item.id} onClick={() => getGadgetsById(item.id)}>
                            {item.name}
                            </div>
                        ))
                    }      
                </div>
            </div>
          
            <div id="DivRegisAndLoginLinks">
                <div>
                    <Link className="link" to="/regist">
                        Regist  
                        <img src={ReactLogo3} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                    <b className="RegisAndLoginLinks" > or </b>
                    <Link className="link" to="/login">
                        Login   
                        <img src={ReactLogo2} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                </div>
                <div onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                    <b className="link" id="out" >Out   </b>
                    <img src={ReactLogo} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                </div>
                
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>
                <span className="top" onClick={()=>(window.location.reload())}>STORE OF GADGETS</span>
            </div>
            <br></br>

            <div className="container-menu" id="container" style={{cursor: 'pointer'}}>
            {getCategorys()}
            {console.log(categories)}
            {
                categories.map((item, index)=>(
                    <div key={index}  className = "name_category" id={item.id} onClick={() => getGadgetsById(item.id)}>
                       {item.name}
                    </div>
                ))
            }
            </div> 
            
            <br></br>

            <div id="container-tovarov">
            {getAllGadgets()}
            {
               gadgets.map((item, index)=>(
                <div key={index} className="cart" id={item.id}>
                    <img className="img_gadget" src={item.image}></img>
                    <div className="cart_gadget">{item.name}</div>
                    <div className="cart_gadget">{item.model}</div>
                    <div className="cart_gadget">{item.price}₴</div>
                    <button className="BuyBtn" onClick={buyBtn}>Buy</button>
                </div>
               ))  
            }
            </div>
        </div>

    </div>
       
        
        
    );
}

export default Main;