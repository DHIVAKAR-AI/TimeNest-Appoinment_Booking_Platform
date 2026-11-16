# =========================================================
# Stage 1: Build Application
# =========================================================
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy POM and download dependencies first (cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build package
COPY src ./src
RUN mvn clean package -DskipTests

# =========================================================
# Stage 2: Production JRE Runtime
# =========================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S timenest && adduser -S timenest -G timenest
USER timenest:timenest

# Copy built JAR from builder stage
COPY --from=builder /app/target/timenest-platform-*.jar app.jar

# Expose Spring Boot server port
EXPOSE 8081

# Environment variables
ENV PORT=8081 \
    SPRING_PROFILES_ACTIVE=prod

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
