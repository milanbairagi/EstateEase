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

### Backend Setup
```sh
# Clone the repository
git clone https://github.com/NoName3755/EstateEase.git
cd estateease/backend

# Create a virtual environment and install dependencies
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Apply migrations and start the server
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```sh
cd estateease/frontend
npm install
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