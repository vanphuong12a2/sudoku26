FROM openjdk:8-jdk-alpine as build
WORKDIR /workspace/app

COPY build.gradle .
COPY gradle gradle
COPY gradlew .
COPY settings.gradle .

COPY src src
COPY frontend frontend

RUN apk add --update yarn
RUN ./gradlew build
RUN mkdir -p build/libs/dependency && (cd build/libs/dependency; jar -xf ../*.jar)

FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/libs/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.herokuapp.sudoku26.Application"]