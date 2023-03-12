import { Link, Outlet } from "react-router-dom";
import { SliderData } from '../components/SliderData.js';
import { useEffect, useState } from "react";
import { useClipboard } from 'use-clipboard-copy';

import '../cssFiles/style_main.css';

import React from "react";
import axios from "axios";

import Slider from "@mui/material/Slider";
import Cards from "../components/Cards.js";
import Paginationee from "../components/Paginationee.js";

function Main(){

    const clipboard = useClipboard();

    var uniqueNames = [];
    
    const [models, setModels] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, setFlag] = useState(0);
    const [flag2, setFlag2] = useState(0);
    const [search, setSearch] = useState("");
    const [range, setRange] = React.useState([50, 100000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(6);
    const [current, setCurrent] = useState(0);
    
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const nextSlide = () => {setCurrent(current === length - 1 ? 0 : current + 1);};
    const prevSlide = () => {setCurrent(current === 0 ? length - 1 : current - 1);};
    
    if (!Array.isArray(SliderData) || SliderData.length <= 0) {return null;}

    const length = SliderData.length;
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCard = gadgets.slice(firstCardIndex, lastCardIndex);

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
    function clearSearch(){
        setSearch("");
    }
    function filterBtn(){
        let modelNames = document.getElementsByClassName("checkboxes");
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
    function copyNumber(copy) {
       clipboard.copy(copy);
       alert('Сopied: '+copy);
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
                        <img src="https://alexstsorageblops.blob.core.windows.net/magic/create_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                    <b className="RegisAndLoginLinks" > or </b>
                    <Link className="link" to="/login">
                        Login   
                        <img src="https://alexstsorageblops.blob.core.windows.net/magic/person_outline_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                </div>
                <div id="form-search" action="">
                    <input id="input-form-search" type="search" required value={search} onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(event) =>
                        {
                            if (event.key === 'Enter') {
                                getGadgetsByName(search)
                            }
                        }}
                    ></input>
                    <i id="fa-search" onClick={()=>getGadgetsByName(search)}>
                        <img id="logo-search" src="https://alexstsorageblops.blob.core.windows.net/magic/search.svg"></img>
                    </i>
                    <a id="clear-btn" onClick={()=>clearSearch()}>X</a>
                </div>
                <div id="out" onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                    <b className="link" id="out" >Out   </b>
                    <img src="https://alexstsorageblops.blob.core.windows.net/magic/logout_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                </div>
                
            </div>

            <br></br>

            <div id="baner">
                <section className='slider'>
                    <img className='left-arrow' src="https://alexstsorageblops.blob.core.windows.net/magic/arrow_forward_ios_black_24dp.svg"onClick={prevSlide}></img>
                    <img className='right-arrow'src="https://alexstsorageblops.blob.core.windows.net/magic/arrow_forward_ios_black_24dp.svg" onClick={nextSlide}></img>
                    {SliderData.map((slide, index) => {
                    return(
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {index === current && (<img src={slide.image} alt='travel image' className='image' />)}
                        </div>
                    );})}
                </section>
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
                <Cards
                    gadgets={currentCard}
                ></Cards>
                <Paginationee 
                    cardsPerPage={cardsPerPage}
                    totalCards={gadgets.length}
                    paginate={paginate}
                ></Paginationee>
                </div>
            </div>

            <br></br>

            <div className="end-page">
                <div className="numbers-and-socials-links">
                    <br></br>
                    <span className="top" onClick={()=>(window.location.reload())}>STORE OF GADGETS</span>
                    <br></br>
                    <h3>Contacts:</h3>
                    <p onClick={()=>copyNumber("0800210186")}>0 800 210 186</p>
                    <p onClick={()=>copyNumber("0443336352")}>044 333-63-52</p>
                    <p onClick={()=>copyNumber("0671530508")}>(067) 153-05-08</p>
                    <p onClick={()=>copyNumber("0632334950")}>(063) 233 49 50</p>
                    <br></br>
                    <Link to="https://www.facebook.com/alex.black.one/">
                        <img className="social-logo" style={{width: '10px', height:'20px'}} src="https://alexstsorageblops.blob.core.windows.net/magic/facebook.png" alt="normal"/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="https://www.instagram.com/alexeycherniy/">
                        <img className="social-logo" style={{width: '20px', height:'20px'}} src="https://alexstsorageblops.blob.core.windows.net/magic/instagram.png" alt="normal"/>
                     </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="https://www.tiktok.com/@alexeycherniy1">
                        <img className="social-logo" style={{width: '15px', height:'20px'}} src="https://alexstsorageblops.blob.core.windows.net/magic/tiktok.png"/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="https://www.youtube.com/@AlexBlackOne1">
                        <img className="social-logo" style={{width: '25px', height:'20px'}} src="https://alexstsorageblops.blob.core.windows.net/magic/youtube.png" alt="normal" />
                    </Link>
                    <br></br>
                    <br></br>
                </div>
                <div className="about-us" style={{marginTop: "70px", color: 'white'}}>
                    <h3>About us:</h3>
                    <p>We are a new super cool company!!!</p>
                    <p>We are the best super cool company!!!</p>
                    <p>We have the cheapest and original gadgets!!!</p>
                    <p>Don't pass by!!!</p>
                </div>
                <div className="addresses" style={{marginTop: "70px", color: 'white'}}>
                    <h3>Addresses:</h3>
                    <Link style={{color: 'white'}} className="link" to="https://www.google.com/maps/place/Днепр,+Днепропетровская+область,+49000/@48.4622131,34.8599289,11z/data=!3m1!4b1!4m6!3m5!1s0x40dbe303fd08468f:0xa1cf3d5f2c11aba!8m2!3d48.464717!4d35.046183!16zL20vMDN4NDVw">
                        <p >Ukraine, Dnipro, 49000</p>
                    </Link>
                    <p onClick={()=>copyNumber("alexblack144@gmail.com")}>alexblack144@gmail.com</p>
                </div>
                <div className="end-text" style={{position: 'absolute', marginTop: '280px', color: 'white'}}>
                    © Store of gadgets 2023 - Online store of equipment Dnipro, Ukraine.
                </div>
            
            </div>

        </div>

    </div> 
    );
}

export default Main;