import { User } from '@/slices/app/parts/auth';

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to login. Please check your email and password.');
    }

    const data = await response.json();
    return data.user as User;
  } catch (error) {
    console.error('Error during login:', (error as Error).message);
    throw error;
  }
}

// Použití:
// loginUser('user@example.com', 'password123')
//   .then(user => console.log('Logged in user:', user))
//   .catch(error => console.error('Login error:', error));
