const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
// No CORS middleware and no Access-Control-Allow-* headers
app.use(cors());


const PROMPT0 = `
Given multiple images of a person and Urban Company uniform image, generate a professional passport size photo of the person 
standing against a white studio background wearing the black uniform given. The person should be looking straight ahead with a smile. 
Below rules should be followed:
1. The image should be cropped just below the shoulders.
2. Ensure a small Urban Company's logo on uniform is visible.
3. Any objects covering face like mask, spectacles should be removed.
4. Person should look straight at the camera.
5. Person should smile.
`

const PROMPT = `
Given multiple images of a person and Urban Company uniform image, generate a professional passport size photo of the person standing against a studio grey colored background.  wearing the uniform. 
The person should be looking straight ahead with a smile. The image should be cropped just below the shoulders, ensuring a small Urban Company's logo on uniform is visible.
Ensure that the new image has the person smiling.
`

const PROMPT2 = `
Prompt Title: Generate Professional Profile Photo for Urban Company Service Professional

Goal: You are a professional photographer responsible for creating high-quality, professional profile pictures for Urban Company (UC) service professionals. Your objective is to transform the provided reference image of the partner into a standardized, professional photograph that aligns with UC's brand and visual identity. 

Definition of a Professional Photo: Partner's face should be clearly visible and centered in the frame. Image must be clear, sharp, and high-resolution. Partner should be wearing the Urban Company uniform (reference image provided). White or clean studio background with no visual clutter. Partner should appear well-groomed with a neutral or slight smile (no visible teeth unless already shown). If teeth are not visible in the original image, keep the mouth closed. Maintain natural appearance — do not alter facial features, body structure, complexion, or hairstyle. 

Return Format: A professional headshot of the partner: Studio-like white background Partner is looking straight ahead Cropped just below the shoulders (if not visible, crop image up to the neck) A small Urban Company logo should be visible on the uniform.

Strict Guidelines & Warnings: 
 Do NOT: Alter the facial structure (e.g., slim, widen, or reshape the face) Modify or infer body type (if not visible, crop image up to the neck) Change the skin tone or complexion Modify the hairstyle or hair color 
 Ensure: All edits look natural and authentic, preserving the partner's identity and professional appearance The final image aligns with the Urban Company brand aesthetics Context Provided: Reference photo(s) of the partner Image of the Urban Company uniform`

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

