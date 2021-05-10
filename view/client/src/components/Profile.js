import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'

const Profile = (props) => {

    console.log(props)
    const renderProfile = (userDetails) =>{
        if(userDetails) {
            return(
            <>
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-6 col-md-12">
                                <h2 style={{textAlign:"center",textDecoration:"underline"}}>User Info</h2>
                                <div className="card user-card-full">
                                    <div className="row m-l-0 m-r-0">
                                        <div className="col-md-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25"> 
                                                    <img src={userDetails.imageUrl?userDetails.imageUrl:'/images/defaultImage.jpg'} className="img-radius" alt="defaultImage.jpg"/>
                                                </div>
                                                <h6 className="f-w-600">{userDetails.firstName} {userDetails.lastName}</h6>
                                                <p>{userDetails.city}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{userDetails.email}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">{userDetails.phone}</h6>
                                                    </div>
                                                </div>
                                                &nbsp;
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Address</p>
                                                        <h6 className="text-muted f-w-400">{userDetails.address}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">City</p>
                                                        <h6 className="text-muted f-w-400">{userDetails.city}</h6>
                                                    </div>
                                                </div>
                                                <div className="edit">
                                                    <button className="edit-button btn btn-default" data-toggle="modal" data-target="#myModal"
                                                    name="id" value={userDetails._id}                                        
                                                    id={userDetails._id}>Edit Profile</button>
                                                    <button className="edit-button btn btn-default"
                                                    onClick ={props.handleLogOut}
                                                    >Log Out</button>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title">Update the User Details</h2>
                                    <button type="button" className="close" data-dismiss="modal" 
                                        name="closeModal" onClick={(event)=>props.updateUser(event)}
                                    >&times;</button>
                                </div>
            
                    
                                <div className="modal-body">
                                    <form action="/editUser" method="POST" id="update_user" enctype="multipart/form-data">
                                        <div className="form-group">
                                            <label for="name">Id:</label>
                                            <input type="text" readonly 
                                                className="form-control" 
                                                id="update_id"  
                                                name="_id" readOnly
                                                value={userDetails._id}
                                                
                                            />
                                        </div>
                            
                                        <div className="form-group">
                                            <label for="name">First Name:</label>
                                            <input 
                                                type="text" className="form-control" 
                                                id="update_name" placeholder="Enter First name" 
                                                name="firstName" required
                                                value={userDetails.firstName}
                                                onChange={(event)=> props.changeDetails(event.target.name,event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Last Name:</label>
                                            <input 
                                                type="text" className="form-control" 
                                                id="update_name" placeholder="Enter First name" 
                                                name="lastName" required
                                                value={userDetails.lastName}
                                                onChange={(event)=> props.changeDetails(event.target.name,event.target.value)}
                                            />
                                        </div>                                                             
                                        <div className="form-group">
                                            <label for="email">Email:</label>
                                            <input 
                                                type="email" className="form-control" 
                                                id="update_email" placeholder="Enter Email" 
                                                name="email" readOnly
                                                value={userDetails.email}
                                            />
                                        </div>                                        
                                        <div className="form-group">	
                                            <label for="image">Profile Image</label>	
                                            <input 	
                                                type="file" className="form-control" 	
                                                className="form-control" 	
                                                name="image"
                                                onChange = {(event)=>props.changeImage(event.target.name,event.target.files[0])}		
                                            />	
                                        </div>                                      
                                        <div className="form-group">
                                            <label for="phone">Phone number:</label>                                    
                                            <input  
                                                type="phone" className="form-control" 
                                                id="update_phone"  
                                                name="phone" 
                                                value={userDetails.phone}
                                                onChange={(event)=> props.changeDetails(event.target.name,event.target.value)}
                                                />   
                                        </div>
                                        <div className="form-group">
                                            <label for="address">Address:</label>
                                            <input 
                                                type="text" className="form-control" 
                                                id="update_address"  
                                                name="address" 
                                                value={userDetails.address}
                                                onChange={(event)=> props.changeDetails(event.target.name,event.target.value)}                                       
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="city">City:</label>
                                            <input 
                                                type="text" className="form-control" 
                                                id="update_city"  
                                                name="city" 
                                                value={userDetails.city}
                                                onChange={(event)=> props.changeDetails(event.target.name,event.target.value)}                                       
                                            />
                                        </div>
                            
                                    </form>
            
                                </div>
            
                                {/* Modal footer  */}
                                <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" 
                                            name="closeModal" onClick={(event)=>props.updateUser(event)}>
                                            Close
                                        </button>
                                        <button type="submit" id="update_table" className="btn btn-primary"
                                            data-dismiss="modal" onClick={(event)=>props.updateUser(event)}>
                                            update
                                        </button>
                                </div>
            
                            </div>
                        </div>
                
                    </div>
                </div>                 
        
            </>
        )}
        
    }    
    return(
        <div>
            {renderProfile(props.userDetails)}
        </div>        
    )
  
}


export default Profile