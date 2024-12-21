import express from 'express';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser'; // Import body-parser

const upload = multer({ dest: 'uploads/' });

import OpenAI from 'openai';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());

//function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/transcribe', upload.single('image'), async (req, res) => {
  try {
    if (!req.file && !req.body.image) {
      return res.status(400).send('No file or base64 image uploaded.');
    }
    const context = [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: "You are an expert handwriting transcription service. When you receive a handwritten document, you'll respond with an accurate transcription, without changing any of the spelling, punctuation or words in the original text.",
          },
        ],
      },
    ];
    let base64image = '';
    if (req.file) {
      base64image = base64_encode(req.file.path);
    } else {
      base64image = req.body.image;
    }
    const messages = [
      ...context,
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64image}`,
            },
          },
        ],
      },
    ];

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.5,
        max_tokens: 255,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.json({ response });
    } catch (err) {
      console.error('Error during transcription:', err);
      console.error('Error stack:', err.stack);
      res.status(500).send('Failed to transcribe image');
    }
  } catch (err) {
    console.error('Error during transcription:', err);
    res.status(500).send('Failed to transcribe image');
  }
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
