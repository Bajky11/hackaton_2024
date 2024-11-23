export async function fetchFavorites(userId: number) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const response = await fetch(`/api/user/favorites?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch favorites');
    }

    const data = await response.json();
    return data; // Vrátí seznam oblíbených položek
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
}
