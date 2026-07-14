# Tarannum Khan — Personal Portfolio

🚀 **[View Live Portfolio Website](https://tarannum-khan.netlify.app/)**

Welcome to my personal portfolio repository! This website showcases my technical projects, internships, certifications, academic achievements, and includes an interactive AI-powered chat companion (**Infera AI**) built using React, Vite, Tailwind CSS, and Netlify Serverless Functions.

---

## 🌟 Key Features

* **Infera AI Chatbot**: A custom conversational assistant trained on my portfolio context. It features hybrid routing: a high-fidelity local intent-classifier fallback (supporting pronouns and progressive disclosure) and a Hugging Face LLM backend.
* **Featured Projects**: Showcase of my AI-integrated products and data analytics platforms (e.g., AskQL, Retail Product Analytics).
* **Work & Internships**: Highlights of my experience at **SIN Education & Technology** (ERP and Generative AI modules) and **DecodeLabs** (Data Analytics).
* **Certifications & Achievements**: Easy verification of my academic credentials, course completion records, and awards.
* **Vibrant & Modern UI**: Built with responsive grids, interactive hover state indicators, custom LED displays, and smooth animations using Framer Motion.

---

## 🛠️ Tech Stack

### Frontend (Client-side)
* **Framework**: React 19 + Vite 6
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Routing**: React Router Dom v7
* **Integrations**: React GitHub Calendar, Lucide Icons

### Backend (Serverless & AI)
* **Platform**: Netlify Serverless Functions (Node.js)
* **AI Model API**: Hugging Face Inference API
* **Local Backend Server**: Express.js (for local development and testing)

---

## 📂 Project Structure

```text
├── netlify/
│   └── functions/          # Serverless functions for Netlify production
│       ├── chat.js         # Adapts request to the Express chatHandler
│       └── health.js       # Deployment health checks
├── public/                 # Static assets, certificate images, and PDF resume
├── server/                 # Local Express backend server
│   ├── api/
│   │   └── chat.js         # Core chatbot logic & rule-based classifier (1500+ lines)
│   ├── index.js            # Express server entry point
│   └── portfolioData.js    # Structured portfolio facts & data
├── src/                    # React frontend application
│   ├── components/         # Reusable UI modules (Navbar, LED displays, Chatbot, etc.)
│   ├── data/               # Local portfolio text data objects
│   ├── pages/              # Page layouts (Home, Projects, Certifications, Resume)
│   └── main.jsx            # React app entry point
├── netlify.toml            # Netlify builds and path redirects config
├── vite.config.js          # Vite config with dev proxy configuration
└── package.json            # Client dependencies and build scripts
```

---

## 🚀 Running Locally

To run the client and the backend server concurrently on your local machine:

### 1. Prerequisite configuration
Create a `.env` file inside the `server/` directory:
```env
PORT=3001
HF_API_KEY=your_huggingface_api_key_here
```

### 2. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
The local server runs on `http://localhost:3001` with endpoint `POST http://localhost:3001/api/chat`.

### 3. Start the Frontend Client
Open another terminal in the root directory:
```bash
npm install
npm run dev
```
The React development server runs on `http://localhost:5173`. Any requests to `/api/*` will automatically proxy to the local backend port `3001`.

---

## 🔗 Contact & Professional Links
* **LinkedIn**: [linkedin.com/in/tarannum2504](https://linkedin.com/in/tarannum2504)
* **GitHub**: [github.com/Tarannum2504](https://github.com/Tarannum2504)
* **Email**: [tarannum.k2504@gmail.com](mailto:tarannum.k2504@gmail.com)
