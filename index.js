// Index File

import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
// require('dotenv').config();

const app = express();

app.use(express.static('./frontend/dist'));
app.use(express.json());
app.use(cors())