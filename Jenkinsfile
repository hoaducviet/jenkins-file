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
                withDockerRegistry(credentialsId: 'docker-hub-test') {
    
                    sh 'docker build -t viet/jenkins-pipline:v10 .'
                    sh 'docker push viet/jenkins-pipline:v10'

                }
            }
        }
    }
}