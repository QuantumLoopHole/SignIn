# User Logging System for Physical Spaces

User logging system built apon docker, with a focus in simplicity for maintainability.

## Version 1.0.0 

> [!CAUTION]
> README is currently underconstruction, don't expect anything glamours down here until this is sorted out :)


## Install

### Pre-Rec
1. [Git](https://git-scm.com/)
2. [Docker](https://www.docker.com/)
3. [Docker-compose](https://docs.docker.com/compose/)
4. [Python](https://www.python.org/)

Development was under Arch linux, commands may vary between operating systems. This system was built for linux, but should work under Windows. 

### Docs for Pre-rec


Clone repository: 
``` sh
git clone https://github.com/QuantumLoopHole/SignIn.git ~/SignInServer 
```


Build docker containers:

Arch
``` sh
cd ~/SignInServer
sudo docker-compose up --build
```

Ubuntu
``` sh
cd ~/SignInServer
sudo docker compose up --build
```

## Update

### Update repository
go to the SignInServer directory
``` sh
git pull
```

### Stop the docker containers

Find running containers
``` sh
sudo docker stats
```

You should see an output which looks like this:
``` sh
CONTAINER ID   NAME                       CPU %     MEM USAGE / LIMIT   MEM %     NET I/O   BLOCK I/O   PIDS
846dc6bf852c   signinserver-webserver-1   --        -- / --             --        --        --          --
46a76b068e0b   signinserver-api-1         --        -- / --             --        --        --          --
```


Kill the containers if any are running

``` sh
sudo docker stop <Docker container name>
```

Eg: `sudo docker stop signinserver-webserver-1`

### Rebuild and start docker containers

Still within `SignInServer` run

Arch
``` sh
sudo docker-compose down ; sudo docker-compose up --build
```

Ubuntu
```
sudo docker compose down ; sudo docker compose up --build
```
