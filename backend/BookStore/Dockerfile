FROM eclipse-temurin:23-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY entrypoint.sh entrypoint.sh
RUN chmod a+x entrypoint.sh
WORKDIR /
ENTRYPOINT ["./entrypoint.sh", "app.jar"]
