# turnstile-app

Aplicación para gestionar y validar accesos mediante turnstile.

## Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```
SITE_KEY=tu_clave_de_turnstile
SECRET_KEY=tu_clave_secreta
PORT=3005
```

## Instalación y uso

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia la aplicación:
   ```bash
   npm start
   ```
3. Accede a [http://localhost:3005](http://localhost:3005) en tu navegador.
