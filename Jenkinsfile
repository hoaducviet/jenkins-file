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
                    script{

                        def timestamp = new Date().format('yyyy-MM-dd')

                        sh "docker build -t viethoaduc/jenkins-pipline:${timestamp} ."
                        sh "docker tag viethoaduc/jenkins-pipline:${timestamp} viethoaduc/jenkins-pipline:latest} || true"
        
                        sh "docker push viethoaduc/jenkins-pipline:${timestamp} || true"
                        sh 'docker push viethoaduc/jenkins-pipline:latest'
                    }
                   
                }
            }
        }
        stage('SSH-Server') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'remote-server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cp package.json package-demo.json', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'package.json')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}