import React from 'react';
import axios from 'axios';
import Profile from '../components/Profile';
const url = "http://localhost:9800/users/profile";
const updateUrl = "http://localhost:9800/users";

class GetUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetails:'',
            image:'',
            logginStatus: true
        }
        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
          ];

        this.handleLogOut = this.handleLogOut.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);
        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
          }
      
          this.setTimeout();
    }

    clearTimeout = () => {
   
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    }
    
    setTimeout = () => {   
        this.logoutTimeout = setTimeout(this.handleLogOut, 2 * 60 * 1000);
    }
    
    resetTimeout = () => {
        console.log("reSet")
        this.clearTimeout();
        this.setTimeout();
    }
    
    //   warn = () => {
    //     alert("You will be logged out automatically in 1 minute.");
    // }
    
    

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token': token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                userDetails:data
            },() => {
                sessionStorage.setItem('userName', this.state.userDetails.name);
                sessionStorage.setItem('loggedInEmail', this.state.userDetails.email);
                sessionStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));
                
            })
        })
        
    
    }

    changeDetails = (name,value) => {
        this.setState({
            ...this.state,
            userDetails:{
                ...this.state.userDetails,
                [name]:value
            }
            
        })
    }

    changeImage = (name,value) => {
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    updateUser = async(event) => {
        event.preventDefault();
        if(this.state.userDetails.imageUrl !== this.state.image && event.target.name !== "closeModal") {
            if(this.state.image) {
                const data = new FormData()	
                data.append("file", this.state.image)
                data.append("upload_preset","image-uploader")	
                data.append("clone_name","sunitta")	
                console.log(data)	
                try{	
                    const resp = await fetch('https://api.cloudinary.com/v1_1/sunitta/image/upload',
                    {	
                    method:'POST',	
                    body:data	
                    })
                    const respdata = await resp.json();	
                    this.setState({
                        userDetails:{
                            ...this.state.userDetails,
                            imageUrl:respdata.url
                        }  
                    })
                }

                catch (err) {	
                    this.setState({error:"Invalid User details"})	
                }
            }
        }
        	
        const userData = {
            _id: this.state.userDetails._id,	
            firstName: this.state.userDetails.firstName,
            lastName: this.state.userDetails.lastName,	
            email: this.state.userDetails.email,	
            phone:this.state.userDetails.phone,
            address:this.state.userDetails.address,	
            city:this.state.userDetails.city,	
            imageUrl:this.state.userDetails.imageUrl,
            isActive:this.state.userDetails.isActive	
        }

        if(event.target.name !== "closeModal") {
            sessionStorage.setItem('userDetails',JSON.stringify(userData))
            sessionStorage.setItem('userName',JSON.stringify(userData.firstName))
        }
        
        this.setState({
            userDetails: JSON.parse(sessionStorage.getItem('userDetails'))
        })
        

        this.updateUserDetails(this.state.userDetails);
    }

    updateUserDetails = async(userDetails) => {
        try {
            const id = userDetails._id
            const token = sessionStorage.getItem('token'); 
            const resp = fetch(`${updateUrl}/${id}`, {	
                method:'PUT',	
                headers: {	
                            'Accept':'application/json',	
                            'Content-Type':'application/json',
                            'x-access-token': token	
                        },	
                        body: JSON.stringify(userDetails)	
                        })	
            .then((res) => res.json())           
            console.log(resp)
            // setTimeout(() => {
            //     this.props.history.push('/getUser'); 
            // }, 1000);

          } catch (e) {
            if (e.response && e.response.data) {
              console.log(e.response.data.err)
            }
          }
    }

    handleLogOut = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('userDetails')
        sessionStorage.removeItem('loggedInEmail')
        this.setState({ logginStatus: false });
        this.props.history.push('/signin')
    }
    render() {
        return(
            <Profile  
                userDetails = {this.state.userDetails}
                changeDetails = {this.changeDetails}
                changeImage = {this.changeImage}
                updateUser = {this.updateUser}
                handleLogOut ={this.handleLogOut}
            />
        )
    }
}


export default GetUser;