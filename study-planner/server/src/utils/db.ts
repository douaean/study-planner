import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'your_default_mongodb_uri';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export const getDatabase = () => {
    return client.db('study-planner');
};

export const closeDatabaseConnection = async () => {
    await client.close();
    console.log('Database connection closed');
};