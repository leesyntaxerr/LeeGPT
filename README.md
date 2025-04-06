# LeeGPT

LeeGPT is an AI-powered chatbot assistant created by Lee, built with modern web technologies.

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **CORS** - Cross-Origin Resource Sharing middleware

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### AI Integration
- AIML API for GPT-3.5-turbo model integration

## Features
- Real-time chat interface
- AI-powered responses using GPT-3.5-turbo
- Custom response handling for specific queries
- Responsive design
- Cross-origin resource sharing enabled

## Setup and Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your AIML API key:
```
AIML_API_KEY=your_api_key_here
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/chat` - Main chat endpoint
  - Request body: `{ "message": "your message here" }`
  - Response: `{ "response": "AI response here" }`

## Custom Responses
The application includes custom response handling for:
- Creator-related questions
- Questions about Lee
- General AI assistant queries

## Environment Variables
- `PORT` - Server port (default: 3000)
- `AIML_API_KEY` - Your AIML API key
- `AIML_API_URL` - AIML API endpoint
- `MODEL_NAME` - AI model name (default: gpt-3.5-turbo)

## Project Structure
```
├── public/           # Static files
├── server.js         # Main server file
├── package.json      # Project dependencies
└── .gitignore       # Git ignore file
```

## Created By
Lee (@leesyntaxerr) 