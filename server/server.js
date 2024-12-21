import express from 'express';
import multer from 'multer';
import fs from 'fs';
const upload = multer({ dest: 'uploads/' });

import OpenAI from 'openai';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

//function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

app.post('/transcribe', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const context = [
      {
        role: 'system',
        content: [
          {
            type: 'text',
            text: "You are an expert handwriting transcription service. When you receive a handwritten document, you'll respond with an accurate transcription, without changing any of the spelling, punctuation or words in the original text. If you encounter words or punctuation that you're not able to read, pick the most likely thing based on the context.",
          },
        ],
      },
    ];

    const base64image = base64_encode(req.file.path);

    const messages = [
      ...context,
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${base64image}` },
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
      console.log(response.choices[0].message.content);
      res.json({ response });
    } catch (err) {
      console.error('Error during transcription:', err);
      res.status(500).send('Failed to transcribe image');
    }
  } catch (error) {
    res.status(500).send('An error occurred.');
  }
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
