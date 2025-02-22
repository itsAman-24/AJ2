# Healthcare Management System

A modern, responsive web application for managing student healthcare records, appointments, and medical documentation.

## Features

### 1. User Authentication
- Secure email-based registration and login
- Profile management with personal and medical information
- Persistent user sessions

### 2. Appointment Management
- Book appointments with various healthcare providers
- View and manage upcoming appointments
- Real-time appointment status updates
- Cancel or reschedule appointments

### 3. Medical Records
- Comprehensive view of medical history
- Download medical records as PDF
- Search and filter functionality
- Secure storage of health information

### 4. Dashboard
- Personalized welcome message
- Quick overview of upcoming appointments
- Recent medical records
- Important notifications and reminders

### 5. Profile Management
- Update personal information
- Manage medical details
- Emergency contact information
- Blood group and allergy information

### 6. Theme Support
- Light and dark mode
- Seamless theme switching
- Persistent theme preference

## Technology Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF
- **Date Handling**: date-fns
- **Icons**: React Icons
- **UI Components**: Headless UI
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
healthcare-management-system/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main application pages
│   ├── assets/           # Static assets
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Public assets
└── package.json         # Project dependencies and scripts
```

## Key Components

### Pages
- **Dashboard**: Main overview page with appointments and notifications
- **Appointments**: Appointment booking and management
- **Records**: Medical records viewing and downloading
- **Profile**: User profile management
- **Auth**: User authentication (login/register)

### Features
- Responsive design for all screen sizes
- Secure local storage for data persistence
- PDF generation for medical records
- Real-time notifications
- Search and filter functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All other open-source contributors
