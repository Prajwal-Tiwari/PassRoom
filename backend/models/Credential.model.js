import mongoose from "mongoose";

//Credential Schema
//this is what a user will save in our platform
const credentialSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        website: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

const Credential = mongoose.model("Credential", credentialSchema);
export default Credential;