import express from 'express';
import cors from 'cors';
import multer from 'multer';
import PDFParser from 'pdf2json'; 
import OpenAI from 'openai';

const app = express();
var openai = new OpenAI();
app.use(express.json()); 
app.use(cors());
app.use(express.static('./frontend/dist'));
const upload = multer({ dest: 'uploads/' }); 
app.post('/upload', upload.single('pdf'),  async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    } else {
        console.log('Uploaded file:', req.file.path); // This will give you the path of the uploaded file
        console.log(`File path: ${JSON.stringify(req.body)}`);
        let pdfparser = new PDFParser();
        pdfparser.loadPDF(req.file.path);
        pdfparser.on("pdfParser_dataReady", async (pdf) => {

            try {
                const text = JSON.stringify(pdf);
                const completions = await openai.chat.completions.create(
                    {
                        model: "gpt-4-turbo",
                        messages: [
                            {role: 'system' , content: "Read this letter of recommendation. Provide a qualitative score out of 100 and feedback in 200 words. Respond with the following headings: score,  Positives -  Negative - , Goal -. Always have a one sentence SMART goal to improve this letter of recommendation."},
                            {role: 'system' , content : `${text}`}
                        ],
                        max_tokens: 4000
                    })            
                    res.json({ response: completions.choices[0].message.content });
            } catch (error) {
                console.log(error);
                res.status(400).json({error: "HTTP Request error" , details: error.parserError});
            }
        })

        pdfparser.on("pdfParser_dataError", err => {
            res.status(500).json({ error: "PDF parsing failed", details: err.parserError });
        });



    }


});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
