# 💰 Expense Tracker

A full-stack Expense Tracker web application built using **Next.js, React, Tailwind CSS, FastAPI, SQLAlchemy, JWT Authentication, and PostgreSQL**. It helps users manage income and expenses, track budgets, visualize spending, and export reports.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Dashboard
- Logout functionality
- Local storage token management
- Google Login (planned)

---

### Dashboard

- Personalized welcome section
- Income summary
- Expense summary
- Balance calculation
- Budget tracking
- Remaining budget indicator
- Progress bar visualization

---

### Transaction Management

- Add transaction
- Edit transaction
- Delete transaction
- Transaction categories
- Income/Expense types
- Transaction descriptions
- Recent transactions

---

### Search & Filtering

- Search transactions by title
- Filter by:
  - Income
  - Expense
  - All
- Filter by date
- Combined search + filters
- Pagination support

---

### Reports & Analytics

- Monthly expense tracking
- Top category detection
- Charts and visual summaries
- Export transactions as CSV

---

### UI/UX Features

- Responsive design
- Dark mode support
- Theme persistence
- Gradient designs
- Hover effects
- Animations
- Toast notifications
- Mobile-friendly layout

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- JavaScript
- React Hot Toast

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

## Database

- PostgreSQL

---

# 📂 Project Structure

```bash
tracker-next/

├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   └── auth.py

⚙️ Installation
Clone repository
git clone https://github.com/yourusername/expense-tracker.git

Move into project:

cd expense-tracker
**Frontend Setup**
cd frontend
npm install
npm run dev

Runs at:

http://localhost:3000
Backend Setup

Install dependencies:

pip install -r requirements.txt

Run backend:

uvicorn main:app --reload

Runs at:

http://127.0.0.1:8000
Environment Variables

Create:

.env

Add:

SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
API Endpoints
Authentication
POST /register
POST /login
GET /profile
Transactions
GET /transactions
POST /transactions
PUT /transactions/{id}
DELETE /transactions/{id}
Analytics
GET /summary
GET /category-summary
GET /export
Major Challenges Solved
JWT Authentication issues

Fixed:

Invalid token problems
Bearer token extraction
Protected routes
Database schema mismatch

Fixed:

Missing columns
Table recreation
CORS issues

Configured:

CORSMiddleware

for frontend/backend communication.

React issues fixed
localStorage SSR issue
Pagination bugs
Search + filter synchronization
Loading state problems
Learning Outcomes

This project helped me learn:

React hooks
useState
useEffect
async/await
API integration
JWT authentication
SQLAlchemy ORM
Backend architecture
Full-stack debugging
UI design
Project structure
Error handling
Future Improvements
Google Authentication
AI-based expense insights
Email reminders
Monthly reports
Recurring transactions automation
Cloud deployment
Push notifications
Screenshots

Add project screenshots here.

**Author**

**Srikanth**

**Electrical Engineering @ IIT Kharagpur**



⭐ If you like this project, give it a star.


This is resume-quality and GitHub-ready 🚀


