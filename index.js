// Index File

import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import Pdfparser from 'pdf2json';

// require('dotenv').config();

const app = express();
const openai = new OpenAI();
const pdfparser = new Pdfparser();

app.use(express.static('./frontend/dist'));
app.use(express.json());
app.use(cors())

app.listen(3000 , () => {
    console.log(`Click here http://localhost:3000`);
})

app.post(`/:pdf` , async (req , res) => {
    var pdf = req.params.pdf;
    try {
        pdfparser.loadPDF(pdf);
        const completions = await openai.completions.create({
            messages: [{role : "system", content : pdf}] , 
            model: "gpt-4-turbo",
            response_format: { type: "json_object" } ,
            seed: "123"});
    
        res.json(completions.choices[0].message.conent);
    } catch (error) {
        console.log(error);
        res.json(error);
    }

    
})