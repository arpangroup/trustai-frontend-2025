## Start the development server:
```bash
npm run dev
````

## Build the App
````bash
npm run build
````
🔧 What this does:
- Compiles your app using Rollup
- Minifies JS/CSS
- Outputs static assets to the `dist/` folder


## ✅ To preview the production build locally:
````bash
npm run preview
````
This will start a local server (usually on http://localhost:4173


---

## Give Write Permissions to the Deployment User
If the remote directory` /var/www/trustai.co.in` already exists, and is owned by another user (e.g. root), you'll need to:

### Option A: Change Ownership (recommended)

````bash
sudo chown -R deploy:deploy /var/www/trustai.co.in
````
> Replace `deploy` with the actual username you're using in the GitHub Action.

### Option B: Adjust Permissions (less secure)
Allow group or world write access:

````bash
sudo chmod -R 775 /var/www/trustai.co.in
````
Or, if desperate:
````bash
sudo chmod -R 777 /var/www/trustai.co.in  # ⚠️ Not recommended for production
````

## 🔧 Option 2: Use a Writable Directory (e.g. in Home)
If you're not allowed to write to `/var/www/`, you can change the deploy path temporarily to something like:

````bash
env:
  DEPLOY_PATH: "/home/youruser/deploy/trustai.co.in"
````

---
## ✅ Update Apache Config for Single Page App (React/Vite)
React/Vite apps need to serve `index.html` on all unknown routes (like `/about`, `/dashboard`, etc.).

Apache doesn’t do this by default — you need to add a `.htaccess` file in `/var/www/trustai.co.in` with the following:

### 📄 .htaccess file:
````apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
````
This tells Apache:
> If the request is not a real file or directory, serve **index.html**.


## ✅ 3. Enable .htaccess Files in Apache Config
Your config already has:

````
AllowOverride All
````
That’s good — this allows .htaccess to control rewrites.

Make sure `mod_rewrite` is enabled:
````bash
sudo a2enmod rewrite
sudo systemctl restart apache2
````

## ✅ 4. Check Permissions
Ensure Apache can **read** the files:
````bash
sudo chown -R www-data:www-data /var/www/trustai.co.in
sudo chmod -R 755 /var/www/trustai.co.in
````

## ✅ 5. Check Logs
````bash
sudo tail -n 100 /var/log/apache2/trustai.co.in_error.log
````