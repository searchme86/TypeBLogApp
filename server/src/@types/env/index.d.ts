declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      SERVICEACCOUNT_KEY_PRIVATE_KEY_ID: string;
      SERVICEACCOUNT_KEY_PRIVATE_KEY: string;
      SERVICEACCOUNT_KEY_CLIENT_EMAIL: string;
      SERVICEACCOUNT_KEY_CLIENT_ID: string;
      SERVICEACCOUNT_KEY_AUTH_URI: string;
      SERVICEACCOUNT_KEY_TOKEN_URI: string;
      SERVICEACCOUNT_AUTH_PROVIDER_X509_CERT_URL: string;
      SERVICEACCOUNT_CLIENT_X509_CERT_URL: string;
    }
  }
}

export {};
