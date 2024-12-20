# Instalasi

1. Clone repositori
```

```

2. Install Tailwind
```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
```

3. Install SDK Firebase untuk web
```
    npm install firebase
```

4. Setel konfigurasi Firebase pada `Firebase.jsx`

5. Pastikan sudah terdapat indeks untuk `records`

6. Install Recharts
```
    npm install recharts
```

7. Jalankan secara lokal dengan Vite
```
    npm run dev
```

# Publikasi (Github Pages)

1. Setel url aplikasi melalui `homepage` pada `package.json`
```
    {
        "homepage": "https://<username>.github.io/<repository>",
    }
```

2. Setel nama repositori melalui `base` pada `vite.config.js`
```
    {
        base: "/iot-gui"
    }
```

3. Publikasi ke Github Pages
```
    npm run deploy
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
