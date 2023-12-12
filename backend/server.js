import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import prodctRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/category.routes.js'
import { connectDb, cloudinaryConfig } from './config/config.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import 'dotenv/config'
import cors from 'cors'
import path from 'path';
const __dirname = path.resolve();

import cookieParser from 'cookie-parser'
connectDb();
cloudinaryConfig();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use('/static', express.static('public')); //to serve the static contents
app.use('/api', prodctRoutes, authRoutes, categoryRoutes)

app.use(errorMiddleware)


app.listen(process.env.SERVER_PORT, (c) => {
    console.log('Server is listening at port 8000')
});


