import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // Lógica para definir a base URL dinamicamente
    // Se estiver rodando no GitHub Actions (para o Pages), usa o subdiretório.
    // Caso contrário (Vercel ou Localhost), usa a raiz '/'.
    const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
    const baseUrl = isGitHubPages ? '/Projetao-SafeJourney/' : '/';

    
    return {
      base: baseUrl,
        
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
