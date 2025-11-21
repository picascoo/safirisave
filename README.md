# 🚕 SAFIRI SAVE - Ride-Hailing Price Comparison App

Safiri Save is a full-stack web application built on the MERN stack that allows users in Nairobi to compare real-time prices across major ride-hailing services like Uber, Bolt, Faras, and Little Cab. It helps users save money and time by finding the best ride options instantly.

🌟 Features

Public Features (No Sign-up Required)

Instant Price Comparison: Compare simulated estimates from Uber, Bolt, Little Cab, and Faras.

Route Visualization: View distance and estimated travel time using Google Maps integration.

Best Deal Highlighting: Automatically tags the "Cheapest" and "Fastest" options.

Private Features (Registered Users)

User Authentication: Secure Sign Up and Login using JWT.

Dashboard: A personalized hub for managing travel data.

Search History: Automatically logs all searches for future reference.

Favorite Routes: Save frequently used routes (e.g., Home to Work) for one-click checks.

Price Trends: Analyze average prices for specific routes over time.

Real-time Alerts: (Socket.io) Receive notifications for price drops or surges.

🛠️ Tech Stack

Backend (The Engine)

Node.js & Express: RESTful API development.

MongoDB & Mongoose: NoSQL database for storing users, routes, and history.

Socket.io: Real-time bidirectional communication.

JWT (JSON Web Tokens): Secure user authentication.

Google Maps Services: Distance and duration calculation.

Frontend (The Body)

React (Vite): Fast, modern frontend framework.

Tailwind CSS: Utility-first styling for a clean, responsive UI.

React Router DOM: Client-side routing.

Socket.io Client: connecting to real-time server events.

📂 Project Structure

The project is organized into two main directories within the root folder:

safirisave/
├── safiri-save-backend/   # Server-side code (Express API)
│   ├── config/            # DB connection
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth protection
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── services/          # External APIs (Google Maps, Pricing Logic)
│   └── server.js          # Entry point
│
└── safiri-save-frontend/  # Client-side code (React App)
    ├── public/            # Static assets
    └── src/
        ├── components/    # Reusable UI components
        ├── context/       # Global state (Auth)
        ├── pages/         # Full page views
        └── constants.js   # Configuration


🚀 Getting Started

Follow these instructions to run the project locally on your machine.

Prerequisites

Node.js (v16 or higher) installed.

A MongoDB Atlas account (for the database).

A Google Cloud Console account (for the Directions API key).

1. Backend Setup

Navigate to the backend folder:

cd safiri-save-backend


Install dependencies:

npm install


Configure Environment Variables:
Create a file named .env in the safiri-save-backend folder and add the following:

PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Connection string from MongoDB Atlas (ensure /safiri_db is included)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/safiri_db?appName=Cluster0

# Secure random string for JWT signing
JWT_SECRET=your_super_secret_key_here

# Your Google Cloud API Key
GOOGLE_MAPS_API_KEY=AIza...


Start the server:

npm run dev


You should see: Server running in development mode on port 5001 and MongoDB Connected.

2. Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd safiri-save-frontend


Install dependencies:

npm install


(Optional) Configure Environment Variables:
Create a file named .env in the safiri-save-frontend folder:

VITE_BACKEND_URL=http://localhost:5001


Start the React app:

npm run dev


You should see: Local: http://localhost:5173/.

🧪 How to Test

Open your browser to http://localhost:5173.

Comparison: Enter "Westlands" and "JKIA" in the search inputs and click "Compare". You should see mock prices generated based on real distance data.

Auth: Click "Sign Up", create an account, and you will be redirected to the Dashboard.

History: Perform another search while logged in. Go back to the Dashboard to see it saved in your history.

📝 API Endpoints

Method

Endpoint

Description

Access

POST

/api/compare

Get price estimates for a route.

Public

POST

/api/auth/register

Register a new user.

Public

POST

/api/auth/login

Login user & get token.

Public

GET

/api/user/dashboard

Get user favorites & history.

Private (Token)

POST

/api/user/favorites

Add a favorite route.

Private (Token)

POST

/api/user/history

Log a search result.

Private (Token)

📄 License