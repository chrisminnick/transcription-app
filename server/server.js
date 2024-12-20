import express from 'express';
import multer from 'multer';
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
app.post('/transcribe', upload.single('image'), async (req, res) => {
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

  const image = req.file;
  if (!image) {
    return res.status(400).send('No image uploaded');
  }

  const messages = [...context, { role: 'user', content: image.path }];
  console.log(messages);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
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
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
