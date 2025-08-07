# 🚀 Code Snippet Library - Full-Stack Application

Welcome to the **Code Snippet Library**!  
A full-stack web application that allows developers to share, discover, and discuss useful code snippets in a collaborative, community-driven environment.

Built with the **MERN + MySQL** stack (MySQL, Express.js, React.js, Node.js), this platform features secure user authentication and dynamic interactive features.

---

## 📸 Application Preview

>![alt text](<Screenshot 2025-08-07 133233.png>)
---
>![alt text](<Screenshot 2025-08-07 133506.png>)

---

## ✨ Features

- 🔐 **Secure User Authentication**  
  Users can register and log in securely. Passwords are hashed using **bcrypt**, and **JWT** is used for session management.

- 📝 **Full CRUD for Snippets**  
  Logged-in users can **Create**, **Read**, **Update**, and **Delete** their code snippets.

- 💬 **Interactive Community Features**  
  Users can comment on snippets and **upvote/downvote** them to highlight the most helpful content.

- 🔍 **Dynamic Search**  
  Real-time search allows users to filter snippets by **title** or **content**.

- 👤 **User Profiles**  
  Every user has a profile page showcasing their info and submitted snippets.

- 🛡️ **Protected Routes**  
  Client-side and server-side protection ensures only authenticated users can perform sensitive actions.

---

## 🛠️ Tech Stack

### 🔧 Frontend
- React.js  
- React Router  
- Axios  
- CSS

### 🔩 Backend
- Node.js  
- Express.js  
- MySQL  
- JWT  
- bcrypt

### 🧰 Tools
- Visual Studio Code  
- Postman  

---

## 🚀 Getting Started

To run this project locally, follow these instructions.

### ✅ Prerequisites
- Node.js and npm installed  
- A running MySQL server  

---

### 1️⃣ Backend Setup

```bash
# Clone the repository
git clone https://github.com/SomanathBijjargi/Code-Snipped-Library.git

# Navigate to the backend folder
cd snippet-library/backend

# Install dependencies
npm install

Create a .env file in the backend root and add:

# Start the backend server
npm start

```

### 2️⃣ Frontend Setup
```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

Create a .env file in the frontend root and add

VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:5000

to see the videoDemo : https://www.linkedin.com/posts/somanath-bijjargi-0a47132b2_fullstackdeveloper-reactjs-nodejs-activity-7359127072008515585-vI_v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEs2WbwB-OlL246vKyRCMF1y7hEmvyeow1c
