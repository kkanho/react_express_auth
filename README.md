# React Express Auth

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Material-UI
- **Backend**: Express.js, Node.js, MongoDB, JWT
- **File Uploads**: UploadThing
- **Database**: MongoDB

| Tech              | Reasons Picking It                                                                                                                                        |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| React + Vite      | It is more flexible comparing to Next.js. Good for small project.<br>Since I am familiar with React and Vite, it allows faster builds, less config.       |
| Material UI (MUI) | It provides lots of prebuild components, no design is needed. <br>Allowing me to focus on the functionality of the project.                               |
| Express           | It is less complex comparing to Nest.js.<br>Great for fast iteration and small project. And I am familiar with it.                                        |
| MongoDB           | It is developer friendly as it response with JSON, no need further structure of data. <br>Perfect for small application.                                  |
| UploadThing       | It allows minimal-setup for this stack.<br>Abstracts the storage logic of file storage by providing direct URLs.                                          |
| Docker            | Container every services, provides consistency, scalability and maintainability<br>, also allows the application to be run locally with a single command. |

## Setup Instructions

### Option 1: Docker Compose

#### Prerequisites

- Docker and Docker Compose

#### Start with Docker

```bash
# Start all services
docker-compose up --build

# Find <backend-container-name>
docker ps

# Create sample data (after containers are running)
# Replace <backend-container-name> with actual name
docker exec -it <backend-container-name> node script/init.js
```

### Option 2: Local Development

#### Prerequisites

- Node.js (v18 or higher)
- MongoDB (installed locally or running in Docker)
- npm or yarn

#### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd react_express_auth

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2. Setup MongoDB

```bash
# Option A: Install MongoDB locally (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Option B: Run MongoDB with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 3. Environment Configuration

```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env file with your configuration
```

#### 4. Initialize Database with Sample Data

```bash
cd backend
node script/init.js
```

#### 5. Start Development Servers

```bash
# Terminal 1 - Start Backend (from backend directory)
cd backend
npm run dev

# Terminal 2 - Start Frontend (from frontend directory)
cd frontend
npm run dev
```

#### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/health

## Development

### Environment Variables

#### Backend (.env)

```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/react_express_auth
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
PORT=5001
CORS_ORIGIN=http://localhost:5173
UPLOADTHING_TOKEN=your_uploadthing_token
```

### Sample Users (after running init.js)

- Email: `123@123`, Password: `123`
- Email: `alice@example.com`, Password: `password1`
- Email: `bob@example.com`, Password: `password2`

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/:id` - Get a user profile
- `POST /api/users/:id/friends` - Add a user as a friend
- `GET /api/users/:id/friends` - Get all friends of a user

### Scripts

#### Backend

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

#### Frontend

```bash
npm run dev         # Start Vite development server
npm run build       # Build for production
npm run preview     # Preview production build
```

#### Checklist

##### Backend
- [x] Register a user with email and password
- [x] Save a user's profile (name, email address, phone, profile picture, company)
- [x] Add friend(s) for a user
- [x] View friends of a user

##### Frontend
- [x] Create a register page with fields: name, email address, phone, profile picture, company
- [x] Add a render counter in the register page to show how many times the form has rendered in real time
- [x] Create a login page
- [x] Create a protected page to view a user's profile by user ID
- [x] Add a button to add the user as a friend (if not already added or viewing own profile)
- [x] Create a page to show a user's friends

