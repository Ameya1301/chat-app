# JustChat

A full-stack real-time chat application built with React, Node.js, Socket.io, and MongoDB. Supports one-to-one messaging, media sharing, online presence, and a fully customizable UI.

## Live Demo

**[https://justchat-3yz2.onrender.com](https://justchat-3yz2.onrender.com)**

---

## Features

- **Real-time messaging** — Instant message delivery via WebSockets (Socket.io)
- **Authentication** — Secure sign-up/sign-in powered by Clerk
- **Media sharing** — Send images and videos (up to 25MB), hosted on ImageKit CDN
- **Online presence** — Live online/offline indicators for all users
- **Conversation history** — All messages persisted in MongoDB and loaded on demand
- **Customizable UI** — Multiple themes, light/dark mode, wallpaper backgrounds, and optional keyboard sounds
- **User discovery** — Browse and search all users to start new conversations
- **Dockerized** — Multi-stage Docker build for easy deployment

---

## Tech Stack

### Frontend

| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| React 19         | UI framework                           |
| Vite 8           | Build tool & dev server                |
| React Router v7  | Client-side routing                    |
| Zustand          | Global state management (auth + chat)  |
| Socket.io Client | Real-time WebSocket communication      |
| Axios            | HTTP client with request interceptors  |
| HeroUI           | Pre-built accessible component library |
| Tailwind CSS v4  | Utility-first styling                  |
| Clerk React      | Authentication UI & session management |
| Lucide React     | Icon library                           |
| React Hot Toast  | Toast notifications                    |

### Backend

| Technology          | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| Node.js + Express 5 | REST API server                                |
| Socket.io           | Real-time bidirectional communication          |
| MongoDB + Mongoose  | Database & ODM                                 |
| Clerk Express       | Auth middleware & webhook verification         |
| ImageKit            | Media storage & CDN                            |
| Multer              | File upload middleware                         |
| CronJob             | Health check pings (prevents deployment sleep) |

---

## Project Structure

```
chat-app/
├── backend/
│   └── src/
│       ├── controllers/       # Route handler logic
│       ├── lib/               # db, socket, imagekit, cron setup
│       ├── middleware/        # Auth protection middleware
│       ├── models/            # Mongoose models (User, Message)
│       ├── routes/            # API route definitions
│       ├── webhooks/          # Clerk webhook handler
│       └── index.js           # Server entry point
├── frontend/
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── context/           # Theme & wallpaper context
│       ├── lib/               # Axios instance, utilities
│       ├── pages/             # ChatPage, AuthPage
│       ├── store/             # Zustand auth & chat stores
│       └── main.jsx           # App entry point
├── Dockerfile
└── README.md
```

---

## Database Schema

**User**

```
clerkId    String   (unique) — synced from Clerk via webhook
email      String   (unique)
fullName   String
profilePic String
```

**Message**

```
senderId    ObjectId → User
receiverId  ObjectId → User
text        String
image       String   (ImageKit URL)
video       String   (ImageKit URL)
```

---

## API Endpoints

| Method | Endpoint                      | Description              | Auth   |
| ------ | ----------------------------- | ------------------------ | ------ |
| GET    | `/health`                     | Health check             | No     |
| GET    | `/api/auth/check`             | Verify auth status       | Yes    |
| GET    | `/api/messages/users`         | Get all users            | Yes    |
| GET    | `/api/messages/conversations` | Get recent conversations | Yes    |
| GET    | `/api/messages/:id`           | Get messages with a user | Yes    |
| POST   | `/api/messages/send/:id`      | Send text/media message  | Yes    |
| POST   | `/api/webhooks/clerk`         | Clerk user sync webhook  | Signed |

---

## Real-Time Flow

1. User authenticates → Socket.io connection established, socket ID mapped to user ID
2. User sends a message → Saved to MongoDB, emitted to recipient via Socket.io if online
3. User disconnects → Removed from online map, all clients notified of updated online users list

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- [Clerk](https://clerk.com) account for authentication
- [ImageKit](https://imagekit.io) account for media uploads

### Environment Variables

**`backend/.env`**

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
IMAGEKIT_PRIVATE_KEY=private_...
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**`frontend/.env`**

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### Run Locally

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.
