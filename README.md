# 🧪 Korai Health Lab Report Parser

A simple web app that allows users to upload PDF/image lab reports and view health parameters in a clean, interactive format — with trends, charts, and basic insights.

> Built as part of the Korai Health internship task.

---

## ✅ Features

- Upload lab reports (PDF)
- Extract text using OCR (Tesseract)
- Parse parameters, values, units, and reference ranges
- Highlight abnormal values (e.g., outside range)
- Show simulated historical trends using dummy reports
- Display interactive health charts (Recharts)
- Responsive and modern UI using MUI

---

## 🧱 Tech Stack

### 🔹 Frontend
- [Next.js](https://nextjs.org/) (React framework)
- [Material UI](https://mui.com/) (for UI components)
- [Recharts](https://recharts.org/) (for data visualization)

### 🔹 Backend
- [FastAPI](https://fastapi.tiangolo.com/) (Python web framework)
- [pytesseract](https://pypi.org/project/pytesseract/) (for OCR text extraction)
- [pdf2image](https://pypi.org/project/pdf2image/) (for PDF to image conversion)

### 🔹 Dependencies
- Tesseract OCR (must be installed locally)
- Poppler (required by `pdf2image` for PDF rendering)

---
🎥 Demo Video


https://github.com/user-attachments/assets/8290e8b2-051d-4b9e-83e3-bb3757454aa2



## 🛠️ Steps to Run the Project Locally

### 📁 1. Clone the repository

```bash
git clone https://github.com/Akshay-cybersec/korai-health-lab-parser.git
cd korai-health-lab-parser

-Run the Backend (FastAPI + OCR)
Open terminal and go to the backend folder:
cd backend
Create a virtual environment and activate it:
python -m venv env
source env/bin/activate        # For Windows: .\env\Scripts\activate
Install required Python packages:
pip install -r requirements.txt
Make sure Tesseract OCR and Poppler are installed:

For macOS:
brew install tesseract
brew install poppler

For Ubuntu:
sudo apt install tesseract-ocr poppler-utils

For Windows:
Download binaries from
Tesseract OCR and
Poppler for Windows

Start the FastAPI server:
uvicorn main:app --reload
Your API will now be running at:
http://127.0.0.1:8000/upload


-Run the Frontend (Next.js + MUI)

Open a new terminal and go to the frontend folder:
cd ../frontend

Install frontend dependencies:
npm install

Start the development server:
npm run dev

Your app will now be running at:
http://localhost:3000
