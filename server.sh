webpack-dev-server --inline --hot &
webpack --watch &
sleep 3; start http://localhost:8080
