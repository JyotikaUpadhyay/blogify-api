# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
# Copy dependency files first (for caching)
COPY package*.json ./
# Install ONLY production dependencies
RUN npm install --only=production
# Copy application source code
COPY src ./src
# Stage 2: Runner (Lightweight + Secure)
FROM node:18-alpine AS runner
# Create non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
# Switch to non-root user
USER appuser
# Set working directory
WORKDIR /home/appuser/app
# Copy required files from builder stage
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/src ./src
# Expose application port
EXPOSE 3000
# Start application
CMD ["node", "src/index.js"]