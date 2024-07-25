import express from 'express';
import userRoute from './user.route.js';

const app = express.Router();
app.use("/api/user",userRoute);
export default app;