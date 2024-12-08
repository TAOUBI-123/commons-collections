# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements. See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to you under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Use a base image with Maven and JDK installed
FROM maven:3.8.6-eclipse-temurin-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml /app/pom.xml
RUN mvn dependency:go-offline -B

# Copy the source code into the container
COPY src /app/src

# Build the project
RUN mvn package -DskipTests

# Use a lightweight JRE image for the final container
FROM openjdk:17-jdk-slim

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your application will run on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app.jar"]
