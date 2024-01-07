# Excelsior
Full-stack News Website

Excelsior is a modern news website that uses the power of Django for the backend and React for the frontend. It provides a platform for delivering and consuming news content in an efficient and user-friendly manner.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic News Content:** Retrieve and display news articles dynamically from the backend.
- **User Authentication:** Secure user authentication and authorization system.
- **Responsive Design:** Mobile-friendly design for a seamless user experience.
- **Fast Frontend Development:** Utilizes React with Vite for rapid frontend development.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Python (3.8 or higher)
- Node.js (14.x or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/AustinMaturure/Excelsior.git
    
    ```

2. **Backend Setup:**
  ( You may set up your virtual enviroment here)
    ```bash
    cd Excelsior
    
    pip install -r requirements.txt
    cd frontend
    python manage.py migrate
    python manage.py runserver
    ```

    The Django backend will be accessible at `http://localhost:8000`.

3. **Frontend Setup:**
   (in new terminal)
    ```bash
   
    cd Excelsior/frontend
    npm install
    npm run dev
    ```

    The React with Vite frontend will be accessible at `http://localhost:3000`.

## Project Structure

- **`backend/`:** Django backend code.
- **`frontend/`:** React with Vite frontend code.
- **`docs/`:** Documentation files.

## Usage

- Visit `http://localhost:8000` for the Django backend.
- Visit `http://localhost:3000` for the React with Vite frontend.

Customize and extend the project based on your specific requirements.

## Contributing

welcome to suggestions 

## License

No liscence currently

