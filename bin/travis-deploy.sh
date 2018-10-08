#!/bin/bash
abort() {
    local message=$1
    echo $message
    exit -1
}
[ -z $FTP_PASSWORD ] && abort "FTP_PASSWORD is undefined"
[ -z $FTP_USER ] && abort "FTP_USER is undefined"

lftp -u $FTP_USER,$FTP_PASSWORD ftp://s45.linuxpl.com/ \
 -e 'mirror -c -e -R source ~ ; exit'