import express, { type Response } from 'express'
import dotenv from 'dotenv'
import connectDB from '../config/db.js';
import imageKitIOClient from '../config/imagekitIO.js';
import MediaRouter from './media/routes/media.route.js';
import chatRouter from './chat/routes/chat.route.js';
import UserRouter from './user/routes/user.route.js';
import cors from 'cors'
import { ensureDBConnection } from '../config/ensureDBConnection.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
if(!PORT) {
    throw new Error('PORT is not defined');
}







app.use(cors({
    origin:['http://localhost:5173','http://localhost:4173/','https://gemini-mern-chat.vercel.app/'],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

if(process.env.NODE_ENV === 'production'){
  app.use(ensureDBConnection);
}





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


app.get('/', (req, res:Response) => {
    return res.status(200).json({
        success:true,
        response:"hello world 💘🫂"
    });
});


//IMAGEKIT.IO CHECKING SETUP 


//for local env
if(process.env.NODE_ENV !== 'production'){
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