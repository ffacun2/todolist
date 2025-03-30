FROM amazoncorretto:23-alpine-jdk

COPY out/artifacts/todo_jar/todo.jar todo.jar

ENTRYPOINT ["java", "-jar", "todo.jar"]