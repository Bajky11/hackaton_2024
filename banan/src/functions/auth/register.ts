import { User } from '@/slices/app/parts/auth';

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to register.');
    }

    const data = await response.json();
    return data.user as User;
  } catch (error) {
    console.error('Error during registration:', (error as Error).message);
    throw error;
  }
}

// Použití:
// register('John Doe', 'john@example.com', 'password123')
//   .then(user => console.log('Registered user:', user))
//   .catch(error => console.error('Registration error:', error));
