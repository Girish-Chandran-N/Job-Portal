import { Webhook } from "svix";
import { User } from "../models/userModel.js";

//API controller Function to manage Clerk user with database

export const clekWebhooks = async (req,res) => {
    try {
        
        //creat a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //verify header

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }) 

        //Getting data from request body
        const {data, type} = req.body

        //switch case for diff events

        switch (type) {
            case 'user.created':{

                const userData = {
                    _id: data._id,
                    email: data.email_addresses[0].email_adress,
                    name :data.first_name + " " + data.last_name,
                    image:data.image_url,
                    resume: ''

                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData = {
                   
                    email: data.email_addresses[0].email_adress,
                    name :data.first_name + " " + data.last_name,
                    image:data.image_url,
                  

                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                    break;
                
            }
            case 'user.deleted':{
                await User.findByIdAndUpdate(data.id)
                res.json({})
                break;

            }
                
            default:
                break;
        }

    } catch (error) {
        console.log(error.meassage)
        res.json({success:false, message: 'Webhooks Error'})


    }
}