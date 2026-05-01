# Portal de Laboratorios de Física

Este es el repositorio del **Portal de Laboratorios de Física**, un proyecto construido con [Astro](https://astro.build), React y Tailwind CSS, diseñado para ser desplegado en GitHub Pages.

Este portal es una iniciativa para rediseñar y modernizar el sitio web actual ([fisica.usac.edu.gt/fisica/](https://fisica.usac.edu.gt/fisica/)). El objetivo es ofrecer los mismos recursos, prácticas e información general de los laboratorios, pero con una experiencia de usuario (UX) mucho más intuitiva, accesible y una interfaz (UI) moderna y limpia.

## 🚀 Tecnologías utilizadas

- **[Astro](https://astro.build/)**: Framework web optimizado para velocidad, ideal para sitios estáticos enfocados en el contenido.
- **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuario e integraciones interactivas.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de CSS utilitario para un estilizado rápido y moderno.
- **GitHub Actions / Pages**: Despliegue continuo y alojamiento web.

## 🛠️ Desarrollo local

Para iniciar el entorno de desarrollo local, sigue estos pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   # o
   pnpm install
   ```

2. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```
   El sitio estará disponible en `http://localhost:4321`.

3. **Construir para producción:**
   ```bash
   npm run build
   ```
   Genera los archivos estáticos en el directorio `dist/`.

## 📁 Estructura del proyecto

```text
/
├── public/           # Archivos estáticos e imágenes (favicon, assets)
├── src/
│   ├── components/   # Componentes de React y Astro
│   ├── layouts/      # Plantillas de diseño principales
│   └── pages/        # Rutas de las páginas (basado en el sistema de archivos de Astro)
├── astro.config.mjs  # Configuración principal de Astro
└── package.json      # Dependencias y scripts
```

---
*Desarrollado como iniciativa personal por Ricardo (ricardious).*