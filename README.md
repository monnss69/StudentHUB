# StudentHub Singapore

A forum platform for academic resources, campus community, and platform support.

## Project Structure

```
StudentHUB/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript interfaces
│   │   ├── services/    # API services
│   │   └── hooks/       # Custom React hooks
│   └── ...
├── backend/            # Go backend
│   ├── cmd/
│   │   └── api/        # Main application entry
│   ├── handlers/       # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Data models
│   └── db/            # Database operations
└── database/          # Database schema and migrations
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- Go (v1.16 or later)
- PostgreSQL (v13 or later)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Go dependencies:
   ```bash
   go mod tidy
   ```

3. Create a .env file:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=studenthub
   JWT_SECRET=your_secret_key
   ```

4. Run the server:
   ```bash
   go run cmd/api/main.go
   ```

### Database Setup

1. Create a new PostgreSQL database:
   ```bash
   createdb studenthub
   ```

2. Apply the schema:
   ```bash
   psql -d studenthub -f database/schema.sql
   ```

## Development Notes

### Frontend
- Components are organized by feature
- Use TypeScript for type safety
- Follow React best practices and hooks
- Use Tailwind CSS for styling

### Backend
- RESTful API design
- JWT for authentication
- Middleware for logging and auth
- GORM for database operations

### Database
- UUID for primary keys
- Timestamps for auditing
- Proper indexing for performance
- Foreign key constraints

## Next Steps

1. Implement authentication logic
2. Add form validation
3. Implement error handling
4. Add loading states
5. Implement search functionality
6. Add pagination
7. Implement file uploads
8. Add user profiles
9. Implement notifications
10. Add admin features