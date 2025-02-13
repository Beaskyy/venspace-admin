// lib/fetcher.ts
export const fetcher = async (url: string , token: string | null | unknown) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};
