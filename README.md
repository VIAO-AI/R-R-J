
# El Rincon de Jorgito - Web App

## Description

El Rincon de Jorgito is a modern and functional web platform for a Peruvian restaurant, allowing online orders, dish customization, delivery or pickup options, multiple payment methods, and a loyalty program called "JorgitoRewards."

## Main Features

- Online orders with dish customization.
- Delivery and pickup options.
- Various payment methods.
- "JorgitoRewards" loyalty program.
- Modern and optimized interface.
- Reservation management integrated with Supabase and Vercel.
- Automated Edge Function deployment via GitHub Actions.

## Installation and Setup

1. Clone the repository:
   ```sh
   https://github.com/VIAO-AI/el-rincon-digital.git
   ```
2. Access the project directory:
   ```sh
   cd el-rincon-digital
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure environment variables in `.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## GitHub Actions Deployment Setup

The project is configured to automatically deploy Supabase Edge Functions using GitHub Actions. To set this up:

1. In your GitHub repository, go to Settings > Secrets and Variables > Actions
2. Add the following secrets:
   - `SUPABASE_ACCESS_TOKEN`: Your Supabase access token
   - `RESEND_API_KEY`: Your Resend API key (if using Resend for emails)
3. When you push changes to the `main` branch that affect files in `supabase/functions/handle-reservation`, 
   GitHub Actions will automatically deploy the updated Edge Function.

## Project Structure

```
el-rincon-digital-main/
│── public/                 # Archivos estáticos y recursos
│   ├── images-uploads/    # Imágenes subidas por usuarios
│   ├── favicon.ico         # Ícono del sitio
│   ├── placeholder.svg     # Imagen de marcador de posición
│
│── src/                    # Código fuente principal
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/             # Componentes de UI (botones, formularios, etc.)
│   │   ├── FoodItem.tsx    # Ejemplo de componente
│   │   ├── Navbar.tsx      # Barra de navegación
│   │   ├── Footer.tsx      # Pie de página
│   │
│   ├── contexts/           # Context API para estado global
│   │   ├── LanguageContext.tsx
│   │
│   ├── hooks/              # Hooks personalizados
│   │   ├── use-mobile.tsx  # Hook para detectar móvil
│   │
│   ├── lib/                # Funciones utilitarias
│   │   ├── utils.ts
│   │
│   ├── pages/              # Páginas principales
│   │   ├── Index.tsx       # Página de inicio
│   │   ├── About.tsx       # Página "Sobre Nosotros"
│   │   ├── Contact.tsx     # Página de contacto
│   │   ├── Menu.tsx        # Página del menú
│   │   ├── Admin.tsx       # Panel de administración
│   │   ├── NotFound.tsx    # Página 404
│   │
│   ├── App.tsx             # Componente raíz
│   ├── main.tsx            # Punto de entrada principal
│
│── .github/                # Configuración de GitHub Actions
│   ├── workflows/
│   │   ├── deploy-edge-functions.yml
│
│── .gitignore              # Archivos ignorados por Git
│── package.json            # Dependencias del proyecto
│── tailwind.config.ts      # Configuración de Tailwind CSS
│── vite.config.ts          # Configuración de Vite
│── tsconfig.json           # Configuración de TypeScript
│── README.md               # Documentación del proyecto

```

## Contribution

This project is private and protected by copyright. Any unauthorized reproduction, distribution, or modification is strictly prohibited.

## License

All rights reserved © 2025. Unauthorized use is prohibited.
