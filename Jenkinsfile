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
                // This step should not normally be used in your script. Consult the inline help for details.
                withDockerRegistry(credentialsId: 'docker-hub-test', url: 'https://index.docker.io/v1/') {
    
                    // sh 'docker build -t viehoaduc/jenkins-pipline:v10 .'
                    sh 'docker image push viehoaduc/jenkins-pipline:v10'
                   
                }
            }
        }
    }
}