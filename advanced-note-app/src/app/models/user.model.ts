import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'First Name must be 3 characters, got {VALUE}'],
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Last Name must be 3 characters, got {VALUE}'],
        maxlength: 10
        
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        // min: 21,
        min: [21, 'Age Must be at least 18, got {VALUE}'],
        max: 60
    },
    email: {
        type : String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['USER', 'ADMIN', 'SUPERADMIN '],
        default: 'USER'
    }
})

export const User = model('User', userSchema)