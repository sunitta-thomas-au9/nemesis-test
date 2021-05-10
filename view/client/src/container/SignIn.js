import React from 'react';
import axios from 'axios';
import SignInDisplay from  '../components/SignInDisplay';

const loginUrl = 'http://localhost:9800/users/login'

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            password:'',
            email:'',
            success:'',
            errors: {
                email: '',
                passWord: '',
                signinError: ''
            }
        }
    }

    changeHandler = (name,value) => {
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    blurHandler = (name,value)=> {	
        console.log(name,value)	
    }

    onSubmit = (event)=> {
        event.preventDefault();
        
        const signInDetails = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(signInDetails)    
        this.loginUser(signInDetails);
    }

    loginUser = async(signInDetails) => {
        try {
            const resp = await axios.post(loginUrl,signInDetails);
            console.log(resp)
            sessionStorage.setItem('token', resp.data.token);
            this.setState({
                errors: { ...this.state.errors, signinError: "" },
                success: "Signed In Successfully"
            })
            
            setTimeout(() => {
                this.props.history.push('/getUser'); 
            }, 1000);

          } catch (e) {
            if (e.response && e.response.data) {
              console.log(e.response.data.err)
              this.setState({
                errors: { ...this.state.errors, signinError: e.response.data.err }                
                })
            }
          }
    }
    render() {
        return(
            <div>
                <SignInDisplay 
                    userDetails = {this.state}
                    changeHandler = {this.changeHandler}
                    blurHandler = {this.blurHandler}
                    onSubmit = {this.onSubmit}
                    error = {this.state.errors.signinError}
                    success = {this.state.success}
                /> 
            </div>
            
        );
    }
}

export default SignIn;