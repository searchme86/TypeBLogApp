const serviceAccountKey = {
  type: 'service_account',
  project_id: 'typeblogapp',
  private_key_id: process.env.SERVICEACCOUNT_KEY_PRIVATE_KEY_ID,
  private_key: process.env.SERVICEACCOUNT_KEY_PRIVATE_KEY,
  client_email: process.env.SERVICEACCOUNT_KEY_CLIENT_EMAIL,
  client_id: process.env.SERVICEACCOUNT_KEY_CLIENT_ID,
  auth_uri: process.env.SERVICEACCOUNT_KEY_AUTH_URI,
  token_uri: process.env.SERVICEACCOUNT_KEY_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.SERVICEACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICEACCOUNT_CLIENT_X509_CERT_URL,
};
