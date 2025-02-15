#!/bin/sh

# Check if a JAR file name is provided as a parameter.
if [ -z "$1" ]; then
  echo "Usage: $0 <JAR_FILE>"
  exit 1
fi

JAR_FILE="$1"

# Check if the JAR file exists.
if [ ! -f "$JAR_FILE" ]; then
  echo "Error: JAR file '$JAR_FILE' not found."
  exit 1
fi

# Create default database directory
if [ ! -d "/db" ]; then
  mkdir -p /db
fi

# Construct the Java command line, including JVM_OPTS and APP_OPTS.
JAVA_CMD="java ${JVM_OPTS} -jar ${JAR_FILE} ${APP_OPTS}"

# Execute the Java command.
eval "$JAVA_CMD"

# Check the exit code of the Java application.
if [ $? != 0 ]; then
  echo "Error: Java application exited with a non-zero status."
  exit 1
fi

exit 0