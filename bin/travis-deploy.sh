#!/bin/bash

abort() {
    local message=$1
    echo $message
    exit -1
}
[ -z ${FTP_PASSWORD} ] && abort "FTP_PASSWORD is undefined"
[ -z ${FTP_USER} ] && abort "FTP_USER is undefined"
[ -z ${FTP_ADDRESS} ] && abort "FTP_ADDRESS is undefined"

npm run build
echo "before lftp"
lftp -u ${FTP_USER},${FTP_PASSWORD} ftp://s45.linuxpl.com/ \
 -e 'set ftp:ssl-allow no; mirror -c -e -R -v dist ~ ; exit'
echo "after lftp"
