# Stage 1: Build stage
FROM openjdk:22-jdk AS build
WORKDIR /app

# Copy Maven files and source code
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

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

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Copy the config file from the secrets directory to the expected location
COPY --chown=appuser:appuser /etc/secrets ./src/main/resources

# Set entry point for the application
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the application port
EXPOSE 8080