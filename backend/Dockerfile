# Stage 1: Build stage
FROM openjdk:22-jdk AS build
WORKDIR /app

# Copy Maven files and source code
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

# Copy the JAR file from the build stage
COPY ../etc/secrets /backend/src/main/resources

# Set execution permission for the Maven wrapper and build the application
RUN chmod +x ./mvnw \
    && ./mvnw clean package -DskipTests

# Stage 2: Runtime stage
FROM openjdk:22-jdk
VOLUME /tmp

# Create a non-root user
RUN useradd -m -s /bin/bash appuser

# Switch to non-root user
USER appuser

COPY --from=build /app/target/*.jar app.jar

# Set entry point for the application
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the application port
EXPOSE 8080