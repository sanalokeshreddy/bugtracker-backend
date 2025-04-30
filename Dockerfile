# Use a lightweight OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set work directory inside container
WORKDIR /app

# Copy project files
COPY . .

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Run the app
CMD ["java", "-jar", "target/bugtracker-0.0.1-SNAPSHOT.jar"]
