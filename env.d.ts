namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}
