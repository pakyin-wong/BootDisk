# bootable-ethereum-keygen
The project is built following the guide from https://github.com/cfenollosa/os-tutorial. The guide is one of the best "building OS from scratch" tutorial I have ever seen in the internet.

## Installation
I only tried the installation in Mac at this momemnt.


Please install qemu nasm first
```
brew install qemu nasm
```

Please install the following related library
```
brew install gmp mpfr libpc
```

Install of gcc may take more than one hour.
```
brew install gcc
```

Please also install i386-elf-binutils i386-elf-gcc for i386 compatibility
```
brew install i386-elf-binutils i386-elf-gcc
```

Lastly, install a cross-compiled gdb.
```
cd /tmp/src
curl -O http://ftp.rediris.es/mirror/GNU/gdb/gdb-7.8.tar.gz
tar xf gdb-7.8.tar.gz
mkdir gdb-build
cd gdb-build
export PREFIX="/usr/local/i386elfgcc"
export TARGET=i386-elf
../gdb-7.8/configure --target="$TARGET" --prefix="$PREFIX" --program-prefix=i386-elf-
make
make install
```

Install developer library for stdout
```
xcode-select --install
```

And then run
```
/Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14. pkg
```


## Build
Just simply make

```
make
```

## Run in virtual machine (qemu)
```
qemu-system-i386 -fda os-image.bin
```

## Pending
```
1. As cross-compiler is trouble to setup, currently it use brew's 
```

## Run in usb drive
### Windows
Download Rufus and burn the bin file into the usb drive

### Mac
Download unetbootin and burn the bin file into the usb drive


## Reference
1. https://github.com/cfenollosa/os-tutorial

## Log
2-Jan-2019 First commit. Referenced from Mike OS (http://mikeos.sourceforge.net/write-your-own-os.html).

7-Jan-2019 Removed the reference from Mike OS. Now reference from https://github.com/cfenollosa/os-tutorial.

8-Jan-2019 The cross-compiler installation of cfenollosa does not work. Reference from Kazuma Takata (https://github.com/cfenollosa/os-tutorial/issues/45).

