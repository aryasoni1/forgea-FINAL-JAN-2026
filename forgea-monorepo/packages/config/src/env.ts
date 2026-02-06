const REQUIRED_ENV_VARS = ['DATABASE_URL'] as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const key of REQUIRED_ENV_VARS) {
    const value = process.env[key];
    if (!value || value.trim().length === 0) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
