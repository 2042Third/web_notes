FROM ubuntu:latest 

RUN apt-get -y update
RUN apt-get -y install openjdk-11-jre
RUN apt-get -y install openjdk-11-jdk