app_main = src/app/main.js


build: build-web build-electron


build-web: build-web-scripts build-web-templates build-web-assets

build-web-assets:
	cp -r src/assets dist/web/assets

build-web-scripts:
	webpack $(app_main) dist/web/bundle.js

build-web-templates:
	pug src/web -o dist/web --pretty


build-electron: build-electron-scripts build-electron-templates build-electron-assets

build-electron-assets:
	cp -r src/assets dist/electron/assets

build-electron-scripts:
	babel src/electron -d dist/electron
	webpack $(app_main) dist/electron/bundle.js

build-electron-templates:
	pug src/electron -o dist/electron --pretty
