dev:
	export NODE_ENV=development
	pug src/index.pug -o dist --watch &
	webpack-dev-server --inline --hot --progress

build:
	export NODE_ENV=production
	sh -c 'rm -rf dist'
	sh -c 'mkdir -p dist'
	sh -c 'cp -r src/assets dist'
	webpack
	pug src/index.pug -o dist
