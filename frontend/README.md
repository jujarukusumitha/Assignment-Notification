# 🔔 Notification Management System

A full-stack notification system built with Django + React.

---

## 🔗 Live URLs

| Service  | URL                                                    |
| -------- | ------------------------------------------------------ |
| Frontend | https://notification-system.vercel.app                 |
| Backend  | https://notification-backend.onrender.com              |
| GitHub   | https://github.com/jujarukusumitha/Notification-system |

---

## 👤 Admin Login

| Field    | Value     |
| -------- | --------- |
| Username | kusumitha |
| Password | 1234      |

---

## ⚡ Triggers Built

| Trigger     | WhatsApp | Email | Web Push |
| ----------- | -------- | ----- | -------- |
| User Login  | ✅       | ✅    | ✅       |
| User Logout | ✅       | ✅    | ✅       |

---

## 🛠 Tech Stack

### Backend

- Python 3.12
- Django 5.0.1
- Django REST Framework
- MySQL
- JWT Authentication
- WhatsApp Cloud API (Meta Sandbox)
- Mailtrap SMTP (Email)
- OneSignal (Web Push)

### Frontend

- React.js
- Axios
- React Router DOM

---

## ⚙️ Setup Instructions

### Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=http://localhost:3000

DB_NAME=notification_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306

WHATSAPP_ACCESS_TOKEN=your-token
PHONE_NUMBER_ID=your-phone-id

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_HOST_USER=your-mailtrap-user
EMAIL_HOST_PASSWORD=your-mailtrap-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@yourdomain.dev

ONESIGNAL_APP_ID=your-app-id
ONESIGNAL_REST_API_KEY=your-api-key
```

Run:

```bash
python manage.py migrate
python manage.py seed_triggers
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd Frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint                    | Description     |
| ------ | --------------------------- | --------------- |
| POST   | /api/auth/register/         | Register user   |
| POST   | /api/auth/login/            | Login user      |
| POST   | /api/auth/logout/           | Logout user     |
| GET    | /api/triggers/              | List triggers   |
| POST   | /api/triggers/              | Create trigger  |
| GET    | /api/templates/             | List templates  |
| POST   | /api/templates/             | Create template |
| PUT    | /api/templates/{id}/        | Update template |
| PATCH  | /api/templates/{id}/toggle/ | Enable/Disable  |
| POST   | /api/templates/{id}/test/   | Test send       |

---

## 🔔 Channels

| Channel  | Service                |
| -------- | ---------------------- |
| WhatsApp | Meta Cloud API Sandbox |
| Email    | Mailtrap SMTP Sandbox  |
| Web Push | OneSignal Free         |
