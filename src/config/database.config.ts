function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required. Copy .env.example to .env.`);
  }
  return value;
}

export const DATABASE = {
  path: required('DATABASE_PATH'),
} as const;
