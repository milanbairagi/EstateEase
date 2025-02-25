# EstateEase

EstateEase is a real estate platform designed to help property owners sell and rent their properties while allowing buyers to explore and choose properties based on location. The platform focuses on the Kathmandu district and aims to simplify property transactions with an intuitive user interface and robust backend.

## Features

- **Property Listings**: Owners can list properties for sale or rent with detailed descriptions and images.
- **User Authentication**: Secure login and registration using JWT authentication.
- **Search and Filter**: Buyers can search for properties based on location, price, and other attributes.
- **Messaging System**: Users can send inquiries to property owners.
- **Dashboard**: Property owners can manage their listings and view received messages.

## Technologies Used

### Frontend
- React.js
- Axios (for API requests)
- Tailwind CSS (for styling)

### Backend
- Django & Django REST Framework (DRF)
- SQLite (database)
- JWT for authentication

## Installation

### Prerequisites
- Node.js & npm
- Python & pip

### Clone the Repository
```bash
git clone https://github.com/yourusername/estateease.git
cd estateease
```

## Backend Setup
### Create a Virtual Environment & Install Dependencies
```sh
cd backend  # Change directory to estate/backend
python -m venv venv
venv\Scripts\activate  # On Mac: source venv/bin/activate
pip install -r requirements.txt
```

### Backend Environment (`backend/.env`)
Create a `.env` file inside the `backend/` directory:
```ini
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```
Replace `your-secret-key-here` with a secure random key. Generate one using:
```sh
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Apply Migrations & Run Server
```sh
python manage.py migrate
python manage.py runserver
```

## Frontend Setup
### Install Dependencies for Frontend
```sh
cd ../frontend  # Change directory to estate/frontend
npm install
```

### Frontend Environment (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory:
```ini
VITE_API_URL="http://127.0.0.1:8000"  # (Backend Server Url) for local development
```

### Run Frontend Server
```sh
npm run dev
```

## Usage
- Visit `http://localhost:5173/` to access the frontend.
- Login or register to manage properties.
- Search for available properties and contact owners.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.