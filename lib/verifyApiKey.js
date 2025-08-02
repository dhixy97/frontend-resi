export function verifyApiKey(apiKey) {
  return apiKey === process.env.API_KEY;
}
