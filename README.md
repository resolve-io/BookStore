# BookStore

# Spring Boot 3 with Swagger, Reactive Web, and Project Loom (Java 21)

This project is a Spring Boot 3 application that leverages **Java 21** and **Project Loom** for enhanced concurrency, *
*Swagger** for API documentation, and **Spring WebFlux** for reactive web support.

## Features

- **Spring Boot 3**: The latest version of Spring Boot designed to work with Java 17+.
- **Swagger UI**: Automatically generated API documentation for the REST API using Swagger/OpenAPI.
- **Reactive Web**: Built using Spring WebFlux for handling asynchronous and non-blocking requests.
- **Project Loom**: Leveraging Project Loom features for lightweight, user-mode threads (fibers) to improve scalability
  and concurrency.

## Prerequisites

- **Java 21** (or higher) — includes features from **Project Loom** (early access features).
- **Maven** or **Gradle** (for project management and building).
- **IDE**: IntelliJ IDEA, Eclipse, or any other IDE supporting Java 21 and Loom.

## Setup

1. Clone the repository:

    ```bash
    git clone [<repository_url>](https://github.com/PalanivelLakshmi/BookStore.git)
    cd backend/bookstore
    ```

2. Open the project in your preferred IDE or editor.

3. Build the application:

    - With Gradle:

        ```bash
        gradle build
        ```

4. Run the application:

    - With Gradle:

        ```bash
        gradle bootRun
        ```

The application should now be running at `http://localhost:9090`.

## Accessing Swagger UI

Swagger UI is available at:
http://localhost:9090/swagger-ui/index.html

This UI allows you to interact with and test the API endpoints directly.

## Building Docker image

```bash
gradlew dockerImage
```

Optionally, you can specify image tag by setting value for the property **imageName**
The default image name is _nexus-insights.resolvesys.com:8443/resolve-io/bookstore_

After the image is built, you can run the application with this command

```bash
docker run -it --rm -p 8080:8080 nexus-insights.resolvesys.com:8443/resolve-io/bookstore:0.0.1
```

If you want to persist the database file, you can mount a volume to the **/db** directory from the container to a
directory on the host operating system.

If you need to pass additional options to the JVM, you can use environment variable **JVM_OPTS**.
For additional parameters to the application, use the environment variable **APP_OPTS**.

## Project Structure

- **`src/main/java`**: Contains the main source code for the application.
    - `com.resolve.bookstore.controller`: Contains all REST controllers.
    - `com.resolve.bookstore.model`: Contains data models and entities.
    - `com.resolve.bookstore.service`: Contains business logic.
    - `com.resolve.bookstore.configuration`: Contains application configurations, including Swagger setup.

- **`src/main/resources`**: Contains application resources.
    - `application.properties`: Configuration properties for the Spring Boot application.

# FrontEnd

## Accessing UI

```bash
    cd frontend
```

## Install npm dependency

```bash
    npm install
```

## Start the Dev Server

```bash
    cd frontend
    npm run dev
```

```bash
Node Version: 23+
React: 18+
TypeScript: 5.6+
```
