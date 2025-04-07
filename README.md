# Enterprise Chatbot

A modern, responsive chatbot application built with React, TypeScript, and FastAPI. This application provides a beautiful UI for interacting with an AI-powered chatbot that can be integrated with various backend services.

![Enterprise Chatbot Screenshot](screenshot.png)

## Features

- 🎨 Modern, responsive UI with gradient themes
- 💬 Real-time chat interface with typing indicators
- 🔄 Knowledge base integration
- 📱 Mobile-friendly design
- 🌙 Dark mode support
- 🚀 Fast and efficient performance
- 🔒 Secure API communication

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Shadcn UI
- Lucide React Icons

### Backend
- FastAPI
- Python 3.9+

## Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- Docker and Docker Compose (for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/enterprisechatbot.git
   cd enterprisechatbot
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:3000`

### Backend Setup

1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8080 --reload
   ```

## Docker Deployment

### Frontend Dockerfile

Create a `Dockerfile` in the root directory:

```dockerfile
# Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

Create a `Dockerfile.backend` in the root directory:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:8080
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8080:8080"
    environment:
      - ENVIRONMENT=production
```

### Nginx Configuration

Create an `nginx.conf` file:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Deployment

### Using Docker Compose

1. Build and start the containers:
   ```bash
   docker-compose up -d --build
   ```

2. The application will be available at:
   - Frontend: `http://your-server-ip`
   - Backend API: `http://your-server-ip:8080`

### Manual Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your web server

3. Deploy the backend to your server:
   ```bash
   # Install dependencies
   pip install -r requirements.txt
   
   # Start the server (using gunicorn for production)
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8080
   ```

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL

### Backend
- `ENVIRONMENT`: Production/Development environment
- `API_KEY`: API key for external services (if needed)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icons
- [Framer Motion](https://www.framer.com/motion/) for animations