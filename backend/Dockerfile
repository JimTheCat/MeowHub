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

# Tworzymy katalog na konfigurację i kopiujemy secrets
RUN mkdir -p /app/config \
    && cp -r /etc/secrets/* /app/config/ || true

# Ustawiamy zmienną środowiskową, aby Spring Boot widział pliki w /app/config
ENV SPRING_CONFIG_LOCATION=file:/app/config/

# Expose the application port
EXPOSE 8080

# Set entry point for the application
ENTRYPOINT ["java", "-jar", "/app.jar"]
