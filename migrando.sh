sudo mkdir -p /var/www/html/vector
sudo cp -r dist/spa/* /var/www/html/vector/
sudo chown -R www-data:www-data /var/www/html/vector
sudo chmod -R 755 /var/www/html/vector
