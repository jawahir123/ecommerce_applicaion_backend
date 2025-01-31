import express from 'express';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import shoppingCartRo from   './routes/shoppingCartRo.js'
import orderRoute from './routes/orderRoute.js'
import summeryRoute from './routes/summeryRoute.js'
import stockRoute from './routes/stockRoute.js'
import stockReportRoute from './routes/stockReportRoute.js'
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',authRoute)
app.use('/api/products',productRoute)
app.use('/uploads', express.static('uploads'));
app.use('/api/categories',categoryRoutes)
app.use('/api/cart',shoppingCartRo)
app.use('/api/order',orderRoute)
app.use("/api",summeryRoute)
app.use("/api/",stockRoute)
app.use("/api",stockReportRoute)
app.listen(port,()=>{
  console.log(`server is running on port${ port}`);
})

