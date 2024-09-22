import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        match: /.+\@.+\..+/ 
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    // bio: {
    //     type: String,
    //     maxlength: 500
    // },
    // dateOfBirth: {
    //     type: Date
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true // Users are active by default
    // },
    // roles: {
    //     type: [String],
    //     enum: ['user', 'admin', 'moderator'], // Example roles
    //     default: ['user'] // Default role
    // }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
