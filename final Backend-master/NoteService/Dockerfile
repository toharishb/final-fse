FROM java:8-jre
WORKDIR usr/src
ENV DATABASE=noteDb
ADD ./target/NoteService-0.0.1-SNAPSHOT.jar /usr/src/NoteService-0.0.1-SNAPSHOT.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","NoteService-0.0.1-SNAPSHOT.jar"]