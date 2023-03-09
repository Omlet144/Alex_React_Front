import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLogo from '../logout_black_24dp.svg';
import ReactLogo2 from '../person_outline_black_24dp.svg';
import ReactLogo3 from '../create_black_24dp.svg';
import LogoSearch from '../search.svg';
import Baner from '../img/Baner.png';
import '../cssFiles/style_main.css';
import Slider from "@mui/material/Slider";
import React from "react";

function Main(){

    var uniqueNames = [];
    const [models, setModels] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, setFlag] = useState(0);
    const [flag2, setFlag2] = useState(0);
    const [search, setSearch] = useState("");
    const [range, setRange] = React.useState([50, 100000]);
    
    function handleChanges(event, newValue) {
      setRange(newValue);
    }
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
    function getGadgetsByName(name)
    {
        axios({
            method:'get',
            url: `https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetbyName?name=${name}`,
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
    function getGadgetFilter()
    {
        let filter_gadget = 
        {
            nameModels: models,
            min: range[0],
            max: range[1],
        };
        console.log(filter_gadget)
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetFilter",
            data: JSON.stringify(filter_gadget),
            dataType: "dataType",
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
           
        }
        else
        {
           
            alert("Congratulations you Buy it!")
        }
    }
    function clearSearch(){
        setSearch("");
    }
    function filterBtn(){
        let modelNames = document.getElementsByClassName("checkboxes");
        console.log(modelNames);
        setModels([]);

        for (const item of modelNames)
        {
            if(item.checked)
            {
                models.push(item.id);
            }
        };
        getGadgetFilter();
    }
    function modelFilter(){
        uniqueNames = Array.from(new Set(gadgets.map((item, index)=>(item.name))));
        console.log(uniqueNames);
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
                <div id="form-search" action="">
                    <input id="input-form-search" type="search" required value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
                    <i id="fa-search" onClick={()=>getGadgetsByName(search)}>
                        <img id="logo-search" src={LogoSearch}></img>
                    </i>
                    <a id="clear-btn" onClick={()=>clearSearch()}>X</a>
                </div>

                <div onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                    <b className="link" id="out" >Out   </b>
                    <img src={ReactLogo} style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                </div>
                
            </div>
            <br></br>

            <div class="baner">
                <img src={Baner} alt="normal"></img>
            </div>

            <br></br>
            <div style={{textAlign: 'center'}}>
                <span className="top" onClick={()=>(window.location.reload())}>STORE OF GADGETS</span>
            </div>
            <br></br>


            
            <div className="container-menu" id="container" style={{cursor: 'pointer'}}>
            {getCategorys()}
            {
                categories.map((item, index)=>(
                    <div key={index}  className = "name_category" id={item.id} onClick={() => getGadgetsById(item.id)}>
                       {item.name}
                    </div>
                ))
            }
            </div> 
            
            <br></br>
            
            <div className="columns-menu">
                <div className="col-left-siderbar">
                    <div className="range-class">
                        <b>Price</b>
                        <Slider id="slider" max="100000" style={{marginTop:"20px"}} value={range} onChange={handleChanges} ></Slider>
                        <br></br>
                        <label>min {range[0]} ₴ - max {range[1]} ₴</label>
                        <div id="none"></div>
                    </div>
                    <br></br>
                    <b>Model</b>
                    <br></br>
                    <br></br>
                    {
                        modelFilter()
                    }
                    {
                        uniqueNames.map((item, index)=>(
                            <div key={index} style={{marginBottom: '10px'}}>
                               <input type="checkbox" className="checkboxes" id={item}></input>
                                {item}
                            </div>))
                    }
                    <br></br>
                    <button className="BtnFilter" onClick={()=>filterBtn()}>Find</button>
                </div>

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

    </div>
       
        
        
    );
}

export default Main;