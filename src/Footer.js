import React from "react"
import LogoImg from "./assets/images/SmartDiner_logo.png"



function Footer(props){

    return(

        <div style={{width : "100%",position:"fixed",padding:"20px 0px",bottom:"0", boxShadow:"0px -3px 5px rgba(0,0,0,0.2)",zIndex:"999", backgroundColor:"white"}}>
            <div className="container">
            <img src={LogoImg} style={{height:"30px"}} alt="Smart Diner"></img>
            <label style={{color:"#000466", fontSize:"14px", fontFamily:"MuseoModerno",fontWeight:"bold", marginLeft:"50px"}}>We digitalize your dining experince</label>
        </div>
        </div>
    )

}


export default Footer