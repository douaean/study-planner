import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import plannerRoutes from './routes/planner';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/planner', plannerRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Study Planner API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});