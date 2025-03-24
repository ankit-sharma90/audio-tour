# Audio Tour Web App

> If these walls could talk

A web application that allows users to listen to audio tours for popular landmarks across the United States.

## Features

1. **Listen** to an audio tour for any of the thousands of popular landmarks in the US
2. **Download** audio tours for offline listening
3. **Choose** between bite-sized 2 minute overviews, or dive into 10 minute immersive sessions
4. **Read** the transcription if you didn't bring headphones or prefer it over audio

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB (mock data for development)
- **Deployment**: Vercel (frontend) and Render (backend)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/audio-tour.git
cd audio-tour/audio-tour-app
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Create a `.env` file in the server directory (copy from `.env.example`)

### Running the Application

1. Start the server
```bash
# From the server directory
npm run dev
```

2. Start the client
```bash
# From the client directory
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Frontend Deployment (Vercel)

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Backend Deployment (Render)

1. Create a Render account if you don't have one
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables from your `.env` file

## Future Enhancements

- Add user authentication for personalized experiences
- Implement a native mobile app version
- Add more landmarks and cities
- Include user-contributed content
- Add multilingual support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
