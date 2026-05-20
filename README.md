# Portfolio System

Premium full stack developer portfolio platform with dynamic content management.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router
- Backend: Django, Django REST Framework, JWT, SQLite

## Project Structure

```text
Portfolio-Abhinav/
+-- frontend/
¦   +-- src/
¦   ¦   +-- animations/
¦   ¦   +-- assets/
¦   ¦   +-- components/
¦   ¦   +-- dashboard/
¦   ¦   +-- hooks/
¦   ¦   +-- pages/
¦   ¦   +-- services/
¦   +-- package.json
¦   +-- vite.config.js
+-- backend/
    +-- core/
    +-- portfolio/
    +-- authentication/
    +-- api/
    +-- media/
    +-- requirements.txt
    +-- manage.py
```

## Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

## Environment Variables

### Frontend (`frontend/.env`)

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_AUTH_BASE_URL=http://127.0.0.1:8000/api/auth
VITE_BACKEND_ORIGIN=http://127.0.0.1:8000
```

### Backend

Current config is development-ready in `core/settings.py` (SQLite + open CORS). For production, set secure values (`DEBUG=False`, strict `ALLOWED_HOSTS`, restricted CORS).

## API Endpoints

- Auth
  - `POST /api/auth/login/`
  - `POST /api/auth/refresh/`
  - `GET /api/auth/me/`
- Content
  - `GET/POST/PUT/DELETE /api/hero/`
  - `GET/POST/PUT/DELETE /api/skills/`
  - `GET/POST/PUT/DELETE /api/projects/`
  - `GET/POST/PUT/DELETE /api/experience/`
  - `GET/POST/PUT/DELETE /api/certificates/`
  - `POST /api/messages/` (public create)
  - `GET /api/messages/` (admin)
  - `POST /api/messages/{id}/mark_read/` (admin)
  - `GET/POST/PUT/DELETE /api/theme/`
  - `POST /api/theme/track_visit/`
  - `POST /api/theme/track_resume_download/`
- Dashboard
  - `GET /api/dashboard/stats/`

## Admin Access

- Login page: `http://localhost:5173/admin/login`
- Use Django admin staff/superuser credentials.

## Deployment

### Frontend (Vercel)

1. Import `frontend` folder as project.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set env vars:
   - `VITE_API_BASE_URL=https://<render-backend>/api`
   - `VITE_AUTH_BASE_URL=https://<render-backend>/api/auth`
   - `VITE_BACKEND_ORIGIN=https://<render-backend>`

### Backend (Render)

1. Create new Web Service from `backend` folder.
2. Build command: `pip install -r requirements.txt`
3. Start command: `python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT`
4. Configure env:
   - `DEBUG=False`
   - `ALLOWED_HOSTS=<render-domain>`

For production, switch to Gunicorn and secure CORS/hosts.
