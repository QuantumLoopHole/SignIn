#! /bin/bash

echo Installing...

git clone https://github.com/QuantumLoopHole/SignIn.git ~/SignInServer

(
  cd ~/SignInServer/ ||
    docker-compose up --build
)
