const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// AIML API configuration
const AIML_API_KEY = '2383a557e3a445b9ac3805b431bd55cb';
const AIML_API_URL = 'https://api.aimlapi.com/v1/chat/completions';
const MODEL_NAME = 'gpt-3.5-turbo'; // Using a free model

// Custom responses for specific questions
const customResponses = {
    creator: [
        "who made you",
        "who created you",
        "who developed you",
        "who built you",
        "who programmed you",
        "who designed you",
        "who is your creator",
        "who is your developer",
        "who is your maker",
        "who is your builder"
    ],
    lee: [
        "who is lee",
        "who is leesyntax",
        "tell me about lee",
        "tell me about leesyntax",
        "what is lee",
        "what is leesyntax",
        "who is the creator",
        "who is the developer",
        "who is the maker",
        "who is the builder"
    ]
};

// Check if a message matches any of the custom response patterns
function checkCustomResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for creator questions
    for (const pattern of customResponses.creator) {
        if (lowerMessage.includes(pattern)) {
            return {
                response: "I was created using the AIML API. Lee trained me to be a helpful assistant."
            };
        }
    }
    
    // Check for Lee questions
    for (const pattern of customResponses.lee) {
        if (lowerMessage.includes(pattern)) {
            return {
                response: "Lee is a talented developer who created and trained me. You can find Lee on Instagram at @leesyntax."
            };
        }
    }
    
    return null;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check for custom responses first
        const customResponse = checkCustomResponse(message);
        if (customResponse) {
            return res.json(customResponse);
        }

        // Make the API request to AIML API
        const response = await axios.post(AIML_API_URL, {
            model: MODEL_NAME,
            messages: [
                { role: "system", content: "You are LeeGPT, a helpful AI assistant created by Lee." },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 1000
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AIML_API_KEY}`
            }
        });

        // Extract the response text from AIML API's response format
        const responseText = response.data.choices[0].message.content;
        
        res.json({ response: responseText });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get response from AI. Please try again later.' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Using AIML API with model: ${MODEL_NAME}`);
}); 