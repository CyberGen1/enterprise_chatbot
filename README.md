# Enterprise Chatbot

A modern, responsive chatbot application built with React, TypeScript, and connected to a FastAPI backend. This application provides a beautiful UI for interacting with an AI-powered chatbot.

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

## Prerequisites

- Node.js 16+ and npm
- Docker (for containerized deployment)

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
   VITE_API_URL=http://10.229.220.15:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:3000`

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

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create an `nginx.conf` file:

```nginx
server {
    listen 3000;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the existing backend
    location /api {
        proxy_pass http://10.229.220.15:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Deployment

### Using Docker

1. Build and run the frontend container:
   ```bash
   docker build -t enterprise-chatbot-frontend .
   docker run -d -p 3000:3000 enterprise-chatbot-frontend
   ```

2. The application will be available at `http://your-server-ip:3000`

### Manual Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your web server (Nginx, Apache, etc.)

3. Configure your web server to serve the static files and proxy API requests to the existing backend at `http://10.229.220.15:8080`

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (should be set to `http://10.229.220.15:8080` or your API domain)

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