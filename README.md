
## 🌟 Dayflow HRMS

Dayflow is a modern HR management system built for efficient employee tracking, attendance, leave management, and payroll overview. Designed with a clean UI inspired by Odoo, it's ideal for small teams and hackathons.

---

## 🚀 Tech Stack

**Frontend**  
- HTML, CSS (Odoo-inspired theme), JavaScript (Vanilla JS)

**Backend**  
- Python (Flask), Flask-SQLAlchemy, PostgreSQL  
- JWT for authentication, Flask-CORS, dotenv

---

## 🧭 Website Flow

**Authentication**  
- `login.html` and `signup.html` for user access

**Employee Dashboard**  
- View profile, check attendance, apply for leave

**Admin Dashboard**  
- Manage employees, view attendance, approve leaves, payroll

**Token-based login**  
- JWT stored in `localStorage` for secure API access

---

## 🛠 Setup

1. Clone repo & navigate to project folder  
2. Set up backend:  
   ```bash
   cd backend  
   python -m venv venv  
   source venv/bin/activate  
   pip install -r requirements.txt  
   ```
3. Create `.env` with DB credentials and `SECRET_KEY`  
4. Run backend: `python app.py`  
5. Open `frontend/pages/login.html` in browser

---
