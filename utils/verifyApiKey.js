export function verifyApiKey(headers) {
  const key = headers.get('x-api-key');
  return key === process.env.NEXT_PUBLIC_API_KEY;
}
