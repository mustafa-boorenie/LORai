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

app.post(`/:evalRequest` , async (req , res) => {
    var evalRequest = req.params.evalRequest;
    const completions = await openai.completions.create({
        messages: [{role : "system", content : evalRequest}] , 
        model: "gpt-4-turbo",
        response_format: { type: "json_object" } ,
        seed: "123"});

    res.json(completions.choices[0].message.conent);
    
})