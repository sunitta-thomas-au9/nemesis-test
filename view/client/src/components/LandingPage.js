import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
const LandingPage = () => {
    return(
        <div className="outer">
            <div className="img-land">
                <img src="/images/landing.jpg" alt="landing" style={{width:'97vw',height: '450px'}}></img>            
            </div>
            <div className="selection">
                <h2><center>Nemesis Consultants LLP</center></h2>
                <h3><center>Remote Associate Full Stack Developer</center></h3>
                <center>
                    <Link to="/signup">
                        <button className="btn btn-warning">SignUp/SignIn</button>
                    </Link>
                </center>          
            </div>
        </div>
        
      );
}
export default LandingPage;