
export function findMockResponse(url, mockMap) {
  for (const key in mockMap) {
    const match = matchPattern(url, key);
    if (match) {
      return { handler: mockMap[key], params: match };
    }
  }
  return null;
}

function matchPattern(url, pattern) {
  const urlParts = url.split('/');
  const patternParts = pattern.split('/');

  if (urlParts.length !== patternParts.length) return null;

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const paramName = patternParts[i].substring(1);
      params[paramName] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null;
    }
  }

  return params;
}