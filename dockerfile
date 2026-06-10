
# ==========================================
# 1) Build stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first to leverage cache
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Copy full source
COPY . .

# Build with Vite
RUN npx vite build

# ==========================================
# 2) Production stage
# ==========================================
FROM node:20-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve --silent

# Copy built static assets
COPY --from=builder /app/dist ./dist

# Expose the desired port
EXPOSE 5173

# Start the static server
CMD ["serve", "-s", "dist", "-l", "5173"]
