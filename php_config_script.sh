#!/bin/bash

#Change Path
sed -i '/cgi.fix_pathinfo=/c\cgi.fix_pathinfo=0'  /etc/php/7.2/fpm/php.ini
