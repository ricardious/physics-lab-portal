# Portal de Laboratorios de Física

Este es el repositorio del **Portal de Laboratorios de Física**, un proyecto construido con [Astro](https://astro.build), React y Tailwind CSS, diseñado para ser desplegado en GitHub Pages.

Este portal es una iniciativa para rediseñar y modernizar el sitio web actual ([fisica.usac.edu.gt/fisica/](https://fisica.usac.edu.gt/fisica/)). El objetivo es ofrecer los mismos recursos, prácticas e información general de los laboratorios, pero con una experiencia de usuario (UX) mucho más intuitiva, accesible y una interfaz (UI) moderna y limpia.

## 🚀 Tecnologías utilizadas

- **[Astro](https://astro.build/)**: Framework web optimizado para velocidad, ideal para sitios estáticos enfocados en el contenido.
- **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuario e integraciones interactivas.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de CSS utilitario para un estilizado rápido y moderno.
- **GitHub Actions / Pages**: Despliegue continuo y alojamiento web.

## 🛠️ Desarrollo local

Para iniciar el entorno de desarrollo local desde cero, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ricardious/physics-lab-portal.git
   ```

2. **Entrar al directorio del proyecto y cambiar a la rama de desarrollo:**
   ```bash
   cd physics-lab-portal
   git checkout develop
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   # o si prefieres pnpm
   pnpm install
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```
   El sitio estará disponible localmente en `http://localhost:4321`.

5. **Construir para producción:**
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