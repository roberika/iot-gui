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

# Perangkat IoT

Kode untuk perangkat IoT yang dirakit dapat dilihat pada [repositori berikut](https://github.com/roberika/iot-esp). Laporan hasil pengerjaan proyek dapat dilihat pada [repositori berikut](https://github.com/roberika/iot-gui).
