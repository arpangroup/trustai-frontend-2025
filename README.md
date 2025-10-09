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

---

## 🔍 What’s happening
In development (Vite dev server), your proxy config works:
````js
'/api': {
  target: 'http://trustai.co.in:8080',
  changeOrigin: true,
  secure: false,
}
````
→ Requests to `/api/..`. are forwarded to `http://trustai.co.in:8080`.

In production, Vite proxy is not used. Your React build is just static files served by Apache (`/var/www/trustai.co.in`), and your frontend directly calls:
````bash
http://trustai.co.in:8080/api/auth/accessToken
````
Browser blocks this because:
1. **CORS**: your Spring Boot must explicitly allow requests from `https://trustai.co.in`.
2. **Mixed ports**: React app runs on `443 (https)`, but API call is on `8080 (http)`. That’s cross-origin.


## ✅ Solutions
### Option 1: **Configure Apache reverse proxy** (recommended)

Add this inside your `trustai.co.in-le-ssl.conf`:

````apache
<IfModule mod_ssl.c>
<VirtualHost *:443>
    ServerName trustai.co.in
    ServerAlias www.trustai.co.in
    DocumentRoot /var/www/trustai.co.in

    <Directory /var/www/trustai.co.in>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/trustai.co.in_error.log
    CustomLog ${APACHE_LOG_DIR}/trustai.co.in_access.log combined

    # 🔑 Proxy API calls to Spring Boot
    ProxyPreserveHost On
    ProxyPass /api http://localhost:8080/api
    ProxyPassReverse /api http://localhost:8080/api

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/trustai.co.in/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/trustai.co.in/privkey.pem
</VirtualHost>
</IfModule>
````

Then:

````bash
sudo a2enmod proxy proxy_http
sudo systemctl reload apache2
````
👉 Now your frontend can just call `/api/...` (no need for port `8080` or full URL).

So update `.env.production`:
````env
VITE_API_BASE_URL=/   # so axios uses /api/... relative to same domain
````

## Option 2: Enable CORS in Spring Boot
If you want to keep calling http://trustai.co.in:8080, you must allow CORS in Spring Boot:
````java
@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("https://trustai.co.in")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
````
But this still feels messy (different origin, different port, browser preflights, etc).

In SecurityConfig.java:
````java
http
    .securityMatcher("/api/**")
    .cors(cors -> {})   // 👈 enable CORS handling here
    .csrf(csrf -> csrf.disable())
    ...
````
Without `.cors(cors -> {})`, Spring Security ignores the `WebMvcConfigurer` CORS settings.