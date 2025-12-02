/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LITEAPI_BASE_URL: string;
  readonly VITE_LITEAPI_KEY: string;
  readonly VITE_API_MODE: 'mock' | 'real' | 'hybrid';
  readonly VITE_APP_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
