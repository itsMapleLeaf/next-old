app_main = src/app/main.js
dist = dist
dist_web = $(dist)/web
dist_electron = $(dist)/electron

run-web: build-web
	start ./dist/web/index.html

run-electron: build-electron
	electron dist/electron/app.js

dev-web:
	webpack-dev-server src/app/main.js --inline --hot --content-base=$(dist_web)

build: clean build-web build-electron

clean:
	rm -rf $(dist)

build-web:
	mkdir -p $(dist_web)
	webpack $(app_main) $(dist_web)/bundle.js
	pug src/web -o $(dist_web) --pretty
	cp -r src/assets dist/web

build-electron:
	mkdir -p $(dist_electron)
	webpack $(app_main) $(dist_electron)/bundle.js
	pug src/electron -o $(dist_electron) --pretty
	babel src/electron -d $(dist_electron)
	cp -r src/assets $(dist_electron)
