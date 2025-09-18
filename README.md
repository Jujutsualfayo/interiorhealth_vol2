<img width="500" height="500" alt="Interior Health Logo" src="https://github.com/user-attachments/assets/d133ab66-8767-42ab-9545-678b6df5e1dc" />

# Interior Health

>A digital health logistics and ordering platform designed to improve medicine accessibility in rural and underserved communities by connecting patients, health workers, and clinics.

---

## Overview
Interior Health digitizes drug ordering, tracking, and payment processes to empower Community Health Extension Workers (CHEWs), patients, and clinics. The platform now features improved stability, production-ready deployment, and enhanced user experience.

---

## Key Features
- **Role-Based Access Control:** Admin, Health Worker, and Patient roles with tailored permissions and improved backend security.
- **Drug Catalog:** Browse and select from an updated list of available medicines.
- **Order Management:** Health workers can place and track orders for patients, with real-time status updates.
- **Payment Integration:** Seamless mobile payments via M-Pesa.
- **Real-Time Updates:** WebSocket-powered live order notifications and communication.
- **Secure Authentication:** JWT-based login and token management.
- **Modern Frontend:** Responsive React + Tailwind CSS interface, now with Next.js 15 and Suspense boundaries for client-side rendering.
- **Robust Backend:** Django REST API with PostgreSQL, production-ready Gunicorn server, and improved API permissions.
- **Containerized Deployment:** Dockerized backend and frontend for easy scaling and reliability.
- **Error Handling:** Enhanced frontend error boundaries, Axios interceptors, and TypeScript/ESLint compliance for stability.
- **Planned Features:**
	- **AI Integration:** Smart drug recommendations, predictive analytics, and automated triage (coming soon).
	- **Chatbot Support:** In-app chatbot for patient and health worker assistance (future deployment).

---

## Technology Stack

| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Backend API   | Django REST Framework (Python), Gunicorn     |
| Frontend      | Next.js 15, React.js, Tailwind CSS           |
| Database      | PostgreSQL                                   |
| Real-Time     | WebSocket                                    |
| Payments      | M-Pesa                                       |
| Deployment    | Railway, Render, Vercel                      |
| CI/CD         | GitHub Actions                               |
| Containerization | Docker                                    |

---

## Deployment
- **Backend:** Hosted on Railway/Render for scalability and reliability, using Gunicorn for production.
- **Frontend:** Deployed on Vercel with automated CI/CD and Next.js optimizations.
- **Environment Variables:** Securely configured for API URLs, payment credentials, and authentication secrets.

---

## Impact
- Onboarded 100+ Community Health Workers in Makueni County, Kenya.
- Digitized medicine ordering workflows in rural clinics.
- Improved access to essential medicines for hundreds of patients.
- Established a scalable foundation for expanding healthcare delivery.

---

## Getting Started

### Prerequisites
- Node.js
- Python 3.x
- PostgreSQL
- Docker (optional)

### Installation

#### Clone the repository
```bash
git clone https://github.com/Jujutsualfayo/interiorhealth_vol2.git
```

#### Backend Setup
```bash
cd interiorhealth-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend Setup
```bash
cd interiorhealth-frontend
npm install
npm run dev
```

---

## Contributing
Contributions are welcome! Fork the repo and submit a pull request with improvements or bug fixes.

---

## License
MIT License

---

## Contact
Benjamin Otieno Alfayo  
Email: benjaminalfayo90@gmail.com  
GitHub: Jujutsualfayo  
Phone: +254769753994

---

## Roadmap & Future Plans
- **AI-powered drug recommendations and analytics**
- **Chatbot integration for patient and health worker support**
- **Expanded payment options**
- **Mobile app version**
Frontend	React.js, Tailwind CSS
Database	PostgreSQL
Real-Time	WebSocket
Payments	Mpesa
Deployment	Backend on Railway, Frontend on Vercel, CI/CD via GitHub Actions
Containerization	Docker

Deployment
Backend API is hosted on Railway, providing a scalable and reliable backend service.

Frontend React application is deployed on Vercel with automated builds triggered on code commits for smooth continuous deployment.

Environment variables securely configured for API URLs, payment credentials, and authentication secrets.

Impact
Successfully onboarded over 100 Community Health Workers in Makueni County, Kenya.

Digitized and streamlined medicine ordering workflows in rural clinics.

Improved access to essential medicines for hundreds of patients in remote regions.

Established a scalable foundation for expanding healthcare delivery services in underserved areas.

Getting Started
Prerequisites
Node.js

Python 3.x

PostgreSQL

Docker (optional for containerized setup)

Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/Jujutsualfayo/interiorhealth_vol2.git
Setup Backend

bash
Copy
Edit
cd interiorhealth-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Setup Frontend

bash
Copy
Edit
cd interiorhealth-frontend
npm install
npm run dev
Contributing
Contributions are welcome! Please fork the repo and submit a pull request with improvements or bug fixes.

License
MIT License

Contact
Benjamin Otieno Alfayo
Email: benjaminalfayo90@gmail.com
GitHub: Jujutsualfayo
phone:254769753994
