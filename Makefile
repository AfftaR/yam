PACKAGER=./app/node_modules/.bin/electron-packager
DEFAULT_CMD=$(PACKAGER) ./app YAM --arch=all --electron-version=2.0.4 --out=./build --asar --name=YAM --overwrite

.PHONY: run build

run:
	./app/node_modules/.bin/electron ./app/main.js

build: build_darwin package_darwin build_win package_win build_linux package_linux

build_darwin:
	@$(DEFAULT_CMD) --platform=darwin --icon=./app/icons/source_colored.icns

package_darwin:
	@tar czf build/yam-darwin-x64.tar.gz build/YAM-darwin-x64

build_win:
	@$(DEFAULT_CMD) --platform=win32 --icon=./app/icons/source_colored.ico # requires wine

package_win:
	@tar czf build/yam-win32-ia32.tar.gz build/YAM-win32-ia32
	@tar czf build/yam-win32-x64.tar.gz build/YAM-win32-x64

build_linux:
	@$(DEFAULT_CMD) --platform=linux --icon=./app/icons/source_colored_png/128x128.png

package_linux:
	@tar czf build/yam-linux-ia32.tar.gz build/YAM-linux-ia32
	@tar czf build/yam-linux-x64.tar.gz build/YAM-linux-x64
