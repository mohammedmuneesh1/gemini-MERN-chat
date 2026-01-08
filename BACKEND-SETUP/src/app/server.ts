import express, { type Response } from 'express'
import dotenv from 'dotenv'
import connectDB from '../config/db.js';
import imageKitIOClient from '../config/imagekitIO.js';
import MediaRouter from './media/routes/media.route.js';
import chatRouter from './chat/routes/chat.route.js';
import UserRouter from './user/routes/user.route.js';
import cors from 'cors'
dotenv.config();

const app = express();


console.log('NODE_ENV',process.env.NODE_ENV);


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, _res, next) => {
  const time = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json())
app.use('/api/media',MediaRouter);
app.use("/api/chats",chatRouter)
app.use('/api/users',UserRouter);


app.get('/ping-pong', (req, res:Response) => {
    return res.status(200).json({
        success:true,
        response:"hello world 💘🫂"
    });
});


//IMAGEKIT.IO CHECKING SETUP 

app.get('/imagekit/api/upload', (req, res:Response) => {
  
    try {
        // console.log("Runtime:", process.release?.name);
    
        const result= imageKitIOClient.getAuthenticationParameters();
    
    
        //   const { token, expire, signature } = imageKitIOClient.helper.getAuthenticationParameters();
    // app.get("/imagekit-signature", (req, res) => {
    //   const authParams = imagekit.getAuthenticationParameters();
    //   res.json(authParams);
    // });
    

    
    
        return res.status(200).json({
            success:true,
            data:result ?? null,
            response:"hello world 💘🫂"
        });
    } catch (error) {
        
    }
})

//for local env
if(process.env.NODE_ENV !== 'production'){
    const PORT = process.env.PORT || 4000;

     (async () => {
    await connectDB(); // 🔥 FIRST
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })();

}
else{
 connectDB().catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
}


//for vercel deploy
export default app;