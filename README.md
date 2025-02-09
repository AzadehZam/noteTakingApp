# Note-Taking App

A simple Note-Taking web application built using **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **EJS** for rendering views. The app supports user authentication using **Passport.js** and allows users to create, edit, and delete their own notes.

## Features
- User authentication with **Passport.js** (Local Strategy)
- Secure password storage using **bcrypt**
- CRUD operations for notes (Create, Read, Update, Delete)
- **EJS** templating for dynamic HTML rendering
- Responsive UI using **Bootstrap**
- **Express.js** for backend routing
- **MongoDB (Mongoose)** for data storage
- Session-based authentication with **express-session**

## Tech Stack
- **Front-end:** EJS, Bootstrap, HTML, CSS
- **Back-end:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Passport.js (Local Strategy)

## Installation

### Prerequisites
- **Node.js** (v16 or later)
- **MongoDB** installed and running locally or using **MongoDB Atlas**

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/note-taking-app.git
   cd note-taking-app
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/note-taking-app
   SESSION_SECRET=your_secret_key
   ```
4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```
5. **Run the Application**
   ```bash
   node server.js
   ```
   Or use **nodemon** for automatic restarts:
   ```bash
   npx nodemon server.js
   ```
6. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## API Endpoints
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/`            | Home page   |
| GET    | `/register`    | Registration page |
| POST   | `/register`    | Register new user |
| GET    | `/login`       | Login page |
| POST   | `/login`       | Authenticate user |
| GET    | `/logout`      | Log out user |
| GET    | `/notes`       | Display user notes |
| POST   | `/notes`       | Add a new note |
| POST   | `/delete/:id`  | Delete a note |

## Folder Structure
```
📂 note-taking-app
│-- 📂 models        # Mongoose models (User, Note)
│-- 📂 routes        # Express routes (auth, notes)
│-- 📂 views         # EJS templates
│-- 📂 public        # Static files (CSS, JS)
│-- 📄 server.js     # Main server file
│-- 📄 .env          # Environment variables
│-- 📄 README.md     # Project documentation
```

## Future Enhancements
- Add **edit** functionality for notes
- Implement **OAuth authentication** (Google, GitHub, etc.)
- Improve UI styling with Bootstrap
- Add **unit tests** using Jest

## License
This project is open-source and available under the **MIT License**.

---

Made with ❤️ by [Azadeh Zamanipour](https://github.com/AzadehZam) 🚀

