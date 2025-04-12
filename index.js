const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
// No CORS middleware and no Access-Control-Allow-* headers
app.use(cors());


const PROMPT = `
Given multiple images of a person and Urban Company uniform image, generate a professional passport size photo of the person standing against a white studio background wearing the uniform. The person should be looking straight ahead with a smile. The image should be cropped just below the shoulders, ensuring a small Urban Company's logo on uniform is visible.
`

app.post('/generateProfessionalImageForProviderId', async (req, res) => {
  const response = await axios.post('http://localhost:9006/provider-training-service/professional/generateProfessionalImageForProviderId?client_id=service-market',
    { providerId: req?.body?.providerId },
    { headers: { 'Content-Type': 'application/json' } }
  )
  res.json(response.data);
});

app.post('/getGeneratedImage', async (req, res) => {
  const response = await axios.post('http://localhost:9006/provider-training-service/professional/getGeneratedImage?client_id=service-market',
    { providerId: req?.body?.providerId, prompt: PROMPT },
    { headers: { 'Content-Type': 'application/json' } }
  )
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

