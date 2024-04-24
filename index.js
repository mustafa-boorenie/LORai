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
    var pdf = req.params.pdf.body;
    try {
        pdfparser.loadPDF(pdf);
        pdfparser.on('pdfParser_dataReady' , async pdfData => {
            const text = pdfparser.getRawTextContent(pdf);
            const completions = await openai.completions.create({
                messages: [{role : "system", content : text}] , 
                model: "gpt-4-turbo",
                response_format: { type: "json_object" } ,
                seed: "123"});
            res.json(completions.choices[0].message.content);
        });
        pdfparser.on('pdfParser_dataError', err => {
            throw Error(err.parserError);
        });

    } catch (error) {
        console.log(error);
        res.json(error)
    }

    
})