# Visit Home Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Frontend for Visit Home Management System — A modern web platform for managing home visits, student assessments, and educational administration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)

## 🎯 Overview

Visit Home Frontend is a home visiting record management web app built with modern web technologies. It provides a user-friendly interface for managing home visits, student assessments, class management, and administrative tasks for educational institutions.

### Key Capabilities
- **User Authentication**: Secure login for admins, teachers, and students
- **Class Management**: View and manage academic classes
- **Visit Scheduling**: Schedule and track home visits
- **SDQ Assessment**: Strengths & Difficulties Questionnaire system
- **Role-based UI**: Dynamic navigation and features by user role

## ✨ Features

### 🔐 Authentication & Authorization
- Firebase authentication integration
- Role-based access control (Admin, Teacher, Student)
- Secure session management

### 👥 User & Class Management
- View, add, edit, and remove students, teachers, and classes
- Assign students to classes
- Manage academic years

### 📅 Visit Scheduling
- Schedule home visits
- Track visit status and details
- Teacher-student-year relationship mapping

### 📊 Assessment System
- SDQ (Strengths & Difficulties Questionnaire) implementation
- Student assessment tracking

### 📤 File & Image Management
- Upload and display student/teacher images
- Firebase Storage integration

## 🛠️ Technology Stack

| Category             | Technology                               |
| -------------------- | ---------------------------------------- |
| **Framework**        | [React](https://react.dev/)              |
| **Build Tool**       | [Vite](https://vitejs.dev/)              |
| **Runtime**          | [Bun](https://bun.sh/)                   |
| **Auth/Storage**     | [Firebase](https://firebase.google.com/) |
| **Containerization** | [Docker](https://www.docker.com/)        |

## 📁 Project Structure

```
src/
├── App.jsx                # Main app component
├── components/            # Reusable UI components
├── configs/               # Firebase and other configs
├── pages/                 # Main application pages
├── schemas/               # Data validation schemas
├── services/              # API and data services
├── stores/                # State management (Zustand, etc.)
├── utils/                 # Utility functions
└── assets/                # Static assets
```

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) (optional)

### Local Development Setup

1. **Clone the repository**
	```bash
	git clone https://github.com/PatiphatRattanosot/visit-home-frontend.git
	cd visit-home-frontend/frontend
	```
2. **Install dependencies**
	```bash
	bun install
	# or
	npm install
	```
3. **Environment configuration**
	```bash
	cp .env.example .env
	# Edit .env with your configuration
	```
4. **Start development server**
	```bash
	bun run dev
	# or
	npm run dev
	```

The app will start on `http://localhost:5173`


### Pull Docker image 

If you want to run the provided frontend production image instead of building locally, pull it from GitHub Container Registry:

```bash
# Pull frontend image
docker pull ghcr.io/patiphatrattanosot/visit-home-frontend:latest
```

#### Run the pulled image

Create a network (optional but used by examples):

```bash
docker network create visit-home-network
# verify
docker network ls 
```


```bash
# Windows (PowerShell)
docker run --restart=always ^
-d --pull always --name test -p 5173:80 ^
--network visit-home-network ^
ghcr.io/patiphatrattanosot/visit-home-frontend:latest

# MacOS / Linux (bash)
docker run --restart=always \
-d --pull always --name test -p 5173:80 \
--network visit-home-network \
ghcr.io/patiphatrattanosot/visit-home-frontend:latest

``` 

The app will start on `http://localhost:5173`


## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

## 💻 Development

### Available Scripts

```bash
# Development
bun run dev         # Start development server with hot reload
npm run dev         # Start development server with hot reload

# Production build
bun run build       # Build for production
npm run build       # Build for production

# Linting
npm run lint        # Run ESLint
```

### Code Style Guidelines
- Use Prettier for code formatting
- Follow ESLint configuration
- Write descriptive commit messages

## 🐳 Docker Deployment

### Development with Docker Compose

1. **Build and run services**
	```bash
	docker-compose up --build
	```
2. **Stop services**
	```bash
	docker-compose down
	```

### Production Deployment

1. **Build production image**
	```bash
	docker build -t visit-home-frontend:latest .
	```
2. **Run production container**
	```bash
	docker run -d \
	  --name visit-home-frontend \
	  -p 5173:5173 \
	  --env-file .env \
	  visit-home-frontend:latest
	```

## 🤝 Contributing

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
	```bash
	git checkout -b feature/amazing-feature
	```
3. **Make your changes**
4. **Run linting**
	```bash
	npm run lint
	```
5. **Commit your changes**
	```bash
	git commit -m 'feat: add amazing feature'
	```
6. **Push to the branch**
	```bash
	git push origin feature/amazing-feature
	```
7. **Open a Pull Request**

### Code Review Process
- All changes require code review
- Follow conventional commit format
- Update documentation as needed

## 👥 Team

- **Project Lead**: [Patiphat Rattanosot](https://github.com/PatiphatRattanosot)
- **Frontend Developer**: [Kittipat Choowongwan](https://github.com/TanKittipat), [Punsan Somkla](https://github.com/Punsano26)

## 📞 Support

For support and questions:
- **Issues**: [GitHub Issues](https://github.com/PatiphatRattanosot/visit-home-frontend/issues)

---

**Built with ❤️ using React, Vite, and Bun**
