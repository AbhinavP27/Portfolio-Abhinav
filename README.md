# Portfolio System

Premium full stack developer portfolio platform with dynamic content management.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router
- Backend: Django, Django REST Framework, SQLite

## Project Structure

```text
Portfolio-Abhinav/
+-- frontend/
¦   +-- src/
¦   ¦   +-- animations/
¦   ¦   +-- assets/
¦   ¦   +-- components/
¦   ¦   +-- pages/
¦   ¦   +-- services/
¦   +-- package.json
¦   +-- vite.config.js
+-- backend/
    +-- core/
    +-- portfolio/
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
VITE_BACKEND_ORIGIN=http://127.0.0.1:8000
```

### Backend

Current config is development-ready in `core/settings.py` (SQLite + open CORS). For production, set secure values (`DEBUG=False`, strict `ALLOWED_HOSTS`, restricted CORS).

## API Endpoints

Public read-only content:

- `GET /api/hero/`
- `GET /api/about/`
- `GET /api/skills/`
- `GET /api/projects/`
- `GET /api/project-images/`
- `GET /api/experience/`
- `GET /api/certificates/`
- `GET /api/theme/`
- `POST /api/messages/` (contact form)
- `POST /api/theme/track_visit/`
- `POST /api/theme/track_resume_download/`

## Admin Access

Content is managed through the Django admin panel:

- Local: `http://127.0.0.1:8000/admin/`
- Log in with the superuser credentials created via `createsuperuser`

From Django admin you can edit hero, about, skills, projects, project images, experience, certificates, contact messages, and theme settings.

## Deployment

### Frontend (Vercel)

1. Import `frontend` folder as project.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set env vars:
   - `VITE_API_BASE_URL=https://<render-backend>/api`
   - `VITE_BACKEND_ORIGIN=https://<render-backend>`

### Backend (Render)

1. Create new Web Service from `backend` folder.
2. Build command: `pip install -r requirements.txt`
3. Start command: `python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT`
4. Configure env:
   - `DEBUG=False`
   - `ALLOWED_HOSTS=<render-domain>`

For production, switch to Gunicorn and secure CORS/hosts.
