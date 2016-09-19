app_main = src/app/main.js
dist = dist
dist_web = $(dist)/web
dist_electron = $(dist)/electron

build_webpack_web = webpack $(app_main) $(dist_web)/bundle.js
build_pug_web = pug src/web -o $(dist_web) --pretty
copy_assets_web = cp -r src/assets dist/web

run-web: build-web
	start ./dist/web/index.html

run-electron: build-electron
	electron dist/electron/app.js

dev-web:
	mkdir -p $(dist_web)
	$(copy_assets_web)
	$(build_webpack_web) --watch &
	$(build_pug_web) --watch &
	webpack-dev-server src/app/main.js --inline --hot --content-base=$(dist_web)

build: clean build-web build-electron

clean:
	rm -rf $(dist)

build-web:
	mkdir -p $(dist_web)
	$(build_webpack_web)
	$(build_pug_web)
	$(copy_assets_web)

build-electron:
	mkdir -p $(dist_electron)
	webpack $(app_main) $(dist_electron)/bundle.js
	pug src/electron -o $(dist_electron) --pretty
	babel src/electron -d $(dist_electron)
	cp -r src/assets $(dist_electron)
