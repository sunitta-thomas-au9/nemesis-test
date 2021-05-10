import { Link } from 'react-router-dom';
import './Form.css'
const SignUpDisplay = (props) => {
    // console.log(props)


    return(
        <div className="main-continer">
            <div className="form-class">
            <form className="form-data" encType="multipart/form-data">
                <h3 className="font-size">Sign Up Form</h3>

                <div className="form-group">
                    <label className="font-size">First name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter first name"
                        autoComplete="new-off" 
                        name="firstName"
                        value={props.signUpDetails.firstName}
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>
                        <p className="error-display">{props.signUpDetails.errors.name}</p>
                </div>
                <div className="form-group">
                    <label className="font-size">Last name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter last name"
                        autoComplete="new-off" 
                        name="lastName"
                        value={props.signUpDetails.lastName}
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>
                        <p className="error-display">{props.signUpDetails.errors.name}</p>
                </div>

                <div className="form-group">
                    <label className="font-size">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        autoComplete="new-off"
                        name="email"
                        value={props.signUpDetails.email}
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>
                        <p className="error-display">{props.signUpDetails.errors.email}</p>
                </div>

                <div className="form-group">
                    <label className="font-size">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        autoComplete="new-off" 
                        name="password"
                        value={props.signUpDetails.password}
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>
                    <p className="error-display">{props.signUpDetails.errors.password}</p>
                </div>	

                <div className="form-group">	
                    <label className="font-size">Profile Image</label>	
                    <input 	
                        type="file" className="form-control" 	
                        className="form-control" 	
                        placeholder="Upload image"	
                        name="imageFile"	
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.files[0])}	
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.files[0])}	
                        />	
                    <p className="error-display">{props.signUpDetails.errors.image}</p>	
                </div>	

                <div className="form-group">	
                    <label className="font-size">Phone Number</label>	
                    <input 	
                        type="phone" 	
                        className="form-control" 	
                        placeholder="Enter phone"	
                        autoComplete="new-off" 	
                        name="phone"	
                        value={props.signUpDetails.phone}	
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}	
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>	
                    <p className="error-display">{props.signUpDetails.errors.phone}</p>	
                </div>

                <div className="form-group">	
                    <label className="font-size">Address</label>	
                    <input 	
                        type="text" 	
                        className="form-control" 	
                        placeholder="Enter Address"	
                        autoComplete="new-off" 	
                        name="address"	
                        value={props.signUpDetails.address}	
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}	
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>	
                    <p className="error-display">{props.signUpDetails.errors.address}</p>
                </div>	
                
                <div className="form-group">	
                    <label className="font-size">City</label>	
                    <input 	
                        type="text" 	
                        className="form-control" 	
                        placeholder="Enter city"	
                        autoComplete="new-off" 	
                        name="city"	
                        value={props.signUpDetails.city}	
                        onChange = {(event)=>props.changeHandler(event.target.name,event.target.value)}	
                        onBlur = {(event)=>props.blurHandler(event.target.name,event.target.value)}/>	
                    <p className="error-display">{props.signUpDetails.errors.city}</p>
                </div>

                <div style={{fontSize:"16px",color:"red"}}>
                    {
                        props.error !== "success" &&
                        <span>{props.error}</span>
                    }
                </div>

                <div style={{fontSize:"16px",color:"green"}}>
                    {
                        props.error === "success" &&
                        <span>Registeration Successful</span>
                    }
                </div>

                <div>
                    <button type="submit" className="btn btn-warning btn-block"
                    onClick= {props.submitHandler}>Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered? <Link to='/signin'  style={{color:"dodgerblue"}}>sign in</Link>
                    </p>
                </div>
            </form>
        </div>
        </div>
                
    );
}

export default SignUpDisplay;