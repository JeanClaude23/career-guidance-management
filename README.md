# Career Guidance Management Information System (CGMIS)

A comprehensive web application for managing career guidance programs, student information, and counseling sessions.

## Features

- **Student Management**: Add, edit, and manage student records
- **Session Tracking**: Schedule and track career guidance sessions
- **Analytics Dashboard**: View insights and statistics about student progress
- **User Authentication**: Secure login and access management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd career-guidance-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build

## Technology Stack

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Local Database** - Your local database implementation
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Recharts** - Data visualization

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── data/               # Mock data and constants
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.