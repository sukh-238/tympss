import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/', postRoutes);

app.get('/', (req, res) => {
  res.send('Blog Platform API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
