// Index File

import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

// require('dotenv').config();

const app = express();
const openai = new OpenAI()

app.use(express.static('./frontend/dist'));
app.use(express.json());
app.use(cors())

app.listen(3000 , () => {
    console.log(`Click here http://localhost:3000`);
})

app.post(`/:imageRequest` , async (res , req) => {
    const response = openai.completions.create();
})