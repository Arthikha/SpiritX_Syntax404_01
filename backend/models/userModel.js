import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    }
}, { timestamps: true });

const User = mongoose.models.User ||mongoose.model('User', userSchema);

export default User;
