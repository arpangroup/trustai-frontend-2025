export async function checkBackendStatus() {
  try {
    const response = await fetch('/actuator/health', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) return false;

    const data = await response.json().catch(() => null);

    return data && data.status === 'UP'; // only return true if backend really UP
  } catch (error) {
    return false;
  }
}