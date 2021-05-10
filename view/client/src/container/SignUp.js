import React from 'react';
import SignUpDisplay from '../components/SignUpDisplay';
const burl="http://localhost:9800/users/register";
class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            imageFile:'',	
            image: '',
            address: '',
            city:'',
            phone:'',	
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phone: '',
                emptyField: ''
            },
            success: ''
        }
    }

    changeHandler = (name,value) => {
        this.setState({
            ...this.state,
            [name]:value            
        })
    }

    blurHandler = (name, value) => {
        let errors = this.state.errors
        var regexNum = /^[0-9]+$/;
        let isValid = regexNum.test(value);

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (value === '') {
                    errors[name] = 'Name can not be blank'
                }
                else if (value.length < 3) {
                    errors[name] = 'Name should be more than three letters'
                }
                else {
                    errors[name] = ''
                }              
                break;

            case 'password':
                if (value === '') {
                    errors[name] = 'Password can not be blank'
                }
                else if (value.length < 8) {
                    errors[name] = 'Password should be more than eight letters'
                }
                else {
                    errors[name] = ''
                }
                break;

            case 'email':
                let lastAtpos = value.lastIndexOf('@')
                let lastDotpos = value.lastIndexOf('.')
                if (value === '') {
                    errors[name] = 'Email can not be blank'
                }

                else if (!(lastAtpos < lastDotpos && lastAtpos > 0 && value.indexOf('@@') === -1 && lastDotpos > 2 && (value.length - lastDotpos) > 2)) {

                    errors[name] = 'Email is not valid'
                }
                else {
                    errors[name] = ''
                }
                break;  

            case 'phone':
                if (value.length < 5) {	
                    errors[name] = 'Field should contain more than 5 digits'	
                }	
                else if (!isValid) {	
                    errors[name] = 'Should contain only number'	
                }	
                else {	
                    errors[name] = ''	
                }	
                break;

            default:
                break;
        }
    }

    addNewUser = (userData) => {
        fetch(burl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then(
            response =>{
                console.log(response)
                if(response.status === 409) {
                    this.setState({	
                        errors: { 
                            ...this.state.errors, 
                            emptyField: "This email is already registerd with us.Please login with the same email and password or register with a new email"
                        }	
                    });
                }
                else{
                    this.setState({
                        errors: { 
                            ...this.state.errors, 
                            emptyField: "success" 
                        }	
                    });
                    setTimeout(() => {                        
                        this.props.history.push('/signin');	
                        
                    }, 2000)
    
                }

            }
            
        )
        
    }

    submitHandler = async(event) => {	
        event.preventDefault()	
        console.log("state>>>>>>>>>>",this.state)	
    
        try{	
            if(this.state.imageFile) {
                const data = new FormData()	
                data.append("file",this.state.imageFile)	
                data.append("upload_preset","image-uploader")	
                data.append("clone_name","sunitta")	
                console.log(data)	

                const resp = await fetch('https://api.cloudinary.com/v1_1/sunitta/image/upload',{	
                method:'POST',	
                body:data	
                })	
                const respdata = await resp.json();	
                this.setState({ 	
                    ...this.state,           	
                    image:respdata.url
                })	
            }
            
            const userData = {	
                firstName: this.state.firstName,
                lastName: this.state.lastName,	
                email: this.state.email,	
                password: this.state.password,	
                address:this.state.address,	
                phone:this.state.phone,	
                city:this.state.city,	
                image:this.state.image	
            }	
	
            this.addNewUser(userData);	
            	   	
        }	
        catch (err) {	
            console.log(err);	
        }	
    }

    render() {
        return(            
            <SignUpDisplay 
            signUpDetails = {this.state} 
            changeHandler = {this.changeHandler}
            blurHandler = {this.blurHandler}
            submitHandler = {this.submitHandler}
            error = {this.state.errors.emptyField}/>               
            
        );
    }
}

export default SignUp;