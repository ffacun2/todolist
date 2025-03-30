FROM amazoncorretto:23-alpine-jdk

COPY todobackend/out/artifacts/todo_jar/todo.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]