import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        type: mongoose.Types.ObjectId,//the one who is subscribing
        ref: "User"
    },
    channel:{
        type: mongoose.Types.ObjectId,//the one who's channel is being subscribed
        ref: "User"
    }

},{timestamps: true})

export const Suscription = mongoose.model("Subscription", subscriptionSchema)