import mongoose from 'mongoose';
const usersSchema = mongoose.Schema({
    email: String, 
    password: String, 
    firstName: String, 
    lastName: String, 
    phone: Number, 
    address: String,
    city:String,
    isActive:Boolean,
    imageUrl:String
})

const users = mongoose.model('Users', usersSchema);
export default users;