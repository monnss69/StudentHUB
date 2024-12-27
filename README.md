# StudentHub Singapore

StudentHub Singapore is a full-stack web application built to serve as a forum platform for Singapore students. It features dedicated spaces for academic discussions, campus community engagement, and platform support.

## Features

- **User Authentication**: Complete registration and login system with password protection
- **Categorical Forums**: Three main discussion areas:
  - Academic Hub: For study-related discussions and resources
  - Campus Community: For student life and social activities
  - Platform Support: For technical assistance and feedback
- **Post Management**: Create, read, update, and delete posts across categories
- **Modern UI**: Responsive design with animations and intuitive navigation
- **Real-time Updates**: Dynamic content loading and state management

## Tech Stack

### Frontend
- React 19.0 with Vite
- TypeScript for type safety
- TailwindCSS for styling
- Framer Motion for animations
- Axios for API communication
- React Router v7 for navigation
- Lucide React for icons

### Backend
- Go with Gin framework
- GORM for database operations
- PostgreSQL with UUID support
- JWT planned for authentication
- CORS enabled for development

## Getting Started

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Go dependencies
go mod tidy

# Start the server
go run backend
```

The backend API will run on `http://localhost:3333`

### Environment Setup

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=!
DB_NAME=postgres
```

## API Endpoints

### Users
- `POST /users` - Register new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `DELETE /users/:id` - Delete user

### Posts
- `POST /post` - Create new post
- `GET /post/:post_id` - Get specific post
- `PUT /post/:post_id` - Edit post
- `DELETE /post/:post_id` - Delete post
- `GET /:category` - Get posts by category

### Comments
- `GET /comment/:post_id` - Get comments for a post

### Categories
- `GET /category` - Get all categories

## Project Structure

```
StudentHub/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Layout.tsx      # Main layout wrapper
│   │   │   ├── Post.jsx        # Post display component
│   │   │   └── UploadButton.jsx # Post creation button
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── [category].jsx  # Category pages
│   │   ├── services/           # API services
│   │   │   ├── api.ts         # API functions
│   │   │   └── types.ts       # TypeScript interfaces
│   │   └── App.jsx            # Main app component
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.js
│
└── backend/
    ├── db/                    # Database operations
    │   └── db.go
    ├── interfaces/            # Data models
    │   └── interfaces.go
    ├── main.go               # Server entry point
    └── go.mod
```

## Development Notes

### Frontend
- Built with React and TypeScript for better type safety
- Uses Tailwind CSS for responsive design
- Implements client-side routing with React Router
- Features smooth animations with Framer Motion
- Organized by feature with separate components and pages
- Type-safe API calls with Axios

### Backend
- RESTful API design with Gin framework
- UUID for primary keys
- GORM for database operations
- CORS configured for development
- Structured error handling
- Category-based post organization

### Planned Features
- User authentication with JWT
- Rich text editor for posts
- Image upload support
- Real-time notifications
- Search functionality
- User profiles
- Comment threading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

## License

This project is open source and available under the MIT License.
