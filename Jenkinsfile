pipeline {
    agent any  // Sử dụng bất kỳ agent nào có sẵn

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/hoaducviet/jenkins-file.git'
            }
        }
        stage('Build Image') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t viet/jenkins-pipline:v10 .'
                    sh 'docker push viet/jenkins-pipline:v10'

                }
            }
        }
    }
}