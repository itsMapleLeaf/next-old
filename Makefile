app_main = src/app/main.js
dist = dist
dist_web = $(dist)/web
dist_electron = $(dist)/electron

mkdir_web = sh -c 'mkdir -p $(dist_web)'
copy_assets_web = sh -c 'cp -r src/assets $(dist_web)'
build_webpack_web = webpack $(app_main) $(dist_web)/bundle.js -p
build_pug_web = pug src/web -o $(dist_web) --pretty

default: dev-web

run-web: build-web
	start ./dist/web/index.html

run-electron: build-electron
	electron dist/electron/app.js

dev-web:
	$(mkdir_web)
	$(copy_assets_web)
	$(build_pug_web) --watch
	$(build_webpack_web) --watch
	NODE_ENV=development webpack-dev-server src/app/main.js --inline --hot --content-base=$(dist_web)

build: clean build-web build-electron

clean:
	sh -c 'rm -rf $(dist)'

build-web:
	export NODE_ENV=production
	$(mkdir_web)
	$(copy_assets_web)
	$(build_pug_web)
	$(build_webpack_web)

build-electron:
	export NODE_ENV=production
	sh -c 'mkdir -p $(dist_electron)'
	webpack $(app_main) $(dist_electron)/bundle.js
	pug src/electron -o $(dist_electron) --pretty
	babel src/electron -d $(dist_electron)
	sh -c 'cp -r src/assets $(dist_electron)'
