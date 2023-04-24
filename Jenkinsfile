pipeline {
    agent any
tools {
   nodejs 'Node14'
}  
parameters {
  choice choices: ['DEV'], name: 'ENVIRONMENT'
  string defaultValue: 'develop', name: 'BRANCH'
}

    stages {
        stage('CheckOut') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            when {
                expression { 
                   return params.ENVIRONMENT == 'DEV'
                }
            }
            steps {
                 sh 'node --version'
                 sh 'ls && npm install && npm run build'
                 echo "Build completed Successfully"
            }
            
        }
        stage('Deploy to DEV') {
             when {
                expression { 
                   return params.ENVIRONMENT == 'DEV'
                }
            }
           steps {
                echo 'Deploying the build file to the server'
                       sshagent(credentials : ['a5a073bd-e907-40b4-8a9a-b792391369e4']) {
                        sh "ssh -o StrictHostKeyChecking=no root@192.168.1.141 uptime"
                        sh "scp -r $WORKSPACE/build root@192.168.1.141:/var/www/html"
                  }
                
            }
        }
    }
}
