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