import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            default: "inactive",
        },
        fName: {
            type: String,
            required: true,
            maxlength: [20, "First name must be less than 20 characters"],
            trim: true,
        }, lName: {
            type: String,
            required: true,
            maxlength: [20, "Last name must be less than 20 characters"],
            trim: true,
        }, password: {
            type: String,
            required: true,
            minlength: [6, "passowrd must be at least 6 characters"],
            trim: true,
        }, email: {
            type: String,
            unique: true,
            required: true,
            index: 1,
            trim: true,
        }, emailVerification: {
            type: String,
            default: ""
        }, dob: {
            type: Date,
            default: null,

        }, address: {
            type: String,
            default: null,
        }, phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 15,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);