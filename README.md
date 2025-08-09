Interior Health
A digital health logistics and ordering platform designed to improve medicine accessibility in rural and underserved communities by connecting patients, health workers, and clinics.

Overview
Interior Health addresses the challenge of limited access to essential medicines in remote areas by digitizing the drug ordering, tracking, and payment processes. The platform empowers Community Health Extension Workers (CHEWs) to place orders on behalf of patients, manage deliveries, and ensure timely availability of drugs.

Features
Role-Based Access Control: Three main user roles — Admin, Health Worker, and Patient — each with specific permissions.

Drug Catalog: Patients and health workers can browse and select drugs from an updated catalog.

Order Management: Health workers can place and track orders for patients, with real-time status updates.

Payment Integration: Seamless mobile payments via M-Pesa integrated directly into the platform.

Real-Time Updates: Uses WebSocket for live order status notifications and communications.

Secure Authentication: JWT-based login and token management ensuring secure access.

Responsive Frontend: Built with React and Tailwind CSS for an accessible and intuitive user experience.

Scalable Backend: Django REST Framework API with PostgreSQL database for robust data handling.

Containerized Deployment: Dockerized backend and frontend for easy deployment and scaling.

Technology Stack
Layer	Technology
Backend API	Django REST Framework (Python)
Frontend	React.js, Tailwind CSS
Database	PostgreSQL
Real-Time	WebSocket
Payments	Flutterwave & M-Pesa Integration
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
Portfolio: Benjamin Alfayo | Portfolio