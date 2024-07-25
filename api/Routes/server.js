import express from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';

const app = express.Router();
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
export default app;