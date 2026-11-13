export async function verifyToken(token: string): Promise<{ id: number; rol: 'socio' | 'admin' } | null> {
  // Valida el JWT emitido por el login del club (omitido en este ejemplo).
  return token ? { id: 1, rol: 'socio' } : null;
}
