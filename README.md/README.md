# Notification System

## Project Overview

This project is a Notification Management System built with Django (Backend) and React (Frontend). It allows administrators to manage notification templates and send notifications through multiple channels such as WhatsApp, Email, and Web Push based on different triggers.

## Features

- Admin authentication
- Trigger management (Login, Logout, etc.)
- Notification template management
- Enable/Disable notification channels
- Test notification sending
- REST APIs for CRUD operations
- WhatsApp Cloud API integration (Sandbox)
- Postmark Email integration
- OneSignal Web Push integration

## Tech Stack

### Backend

- Python 3.x
- Django
- Django REST Framework
- SQLite/MySQL
- Postmark API
- WhatsApp Cloud API
- OneSignal

### Frontend

- React.js
- Axios
- Bootstrap/Tailwind CSS

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
cd notification-system
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file.

```env
SECRET_KEY=your_secret_key

WHATSAPP_ACCESS_TOKEN=your_access_token
PHONE_NUMBER_ID=your_phone_number_id

POSTMARKAPP_TOKEN=your_postmark_token
POSTMARK_FROM_EMAIL=your_email@example.com

ONESIGNAL_APP_ID=your_app_id
ONESIGNAL_REST_API_KEY=your_rest_api_key
```

### Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Create Superuser

```bash
python manage.py createsuperuser
```

### Run Server

```bash
python manage.py runserver
```

Backend URL

```
http://127.0.0.1:8000/
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend URL

```
http://localhost:3000/
```

---

# API Documentation

## Authentication

| Method | Endpoint     | Description |
| ------ | ------------ | ----------- |
| POST   | /api/login/  | Login user  |
| POST   | /api/logout/ | Logout user |

## Triggers

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | /api/triggers/      | List triggers  |
| POST   | /api/triggers/      | Create trigger |
| PUT    | /api/triggers/{id}/ | Update trigger |
| DELETE | /api/triggers/{id}/ | Delete trigger |

## Templates

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| GET    | /api/templates/      | List templates  |
| POST   | /api/templates/      | Create template |
| PUT    | /api/templates/{id}/ | Update template |
| DELETE | /api/templates/{id}/ | Delete template |

## Test Notification

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /api/test-send/ |

---

# Admin Login

Username:

```
admin
```

Password:

```
<your_admin_password>
```

---

# Assumptions

- Sandbox accounts are used for WhatsApp, Postmark, and OneSignal.
- Only Web Push notifications are implemented.
- Login and Logout are used as sample triggers.
- Environment variables are stored in the `.env` file.
- API keys are not committed to GitHub.

---

# Deployment

Backend: Render

Frontend: Vercel

---

# GitHub Repository

Backend:

```
https://github.com/yourusername/backend-repo
```

Frontend:

```
https://github.com/yourusername/frontend-repo
```

Replace the above URLs with your actual GitHub repository links.
