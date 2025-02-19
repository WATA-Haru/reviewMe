/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZIP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly vitest: typeof import('vitest')
}
