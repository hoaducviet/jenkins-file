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
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
    
                    sh 'docker build -t viethoaduc/jenkins-pipline:v10 .'
                    sh 'docker push viethoaduc/jenkins-pipline:v10'
                   
                }
            }
        }
        stage('SSH-Server') {
            steps {
                sshagent(['ssh_remote']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l root 13.238.253.145 touch test.txt'
                }
            }
        }
    }
}