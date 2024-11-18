import db from '../../../../db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // Ověření, že jsou všechna data přítomna
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }

  try {
    const statement = db.prepare(
      'SELECT * FROM users WHERE email = ? AND password = ?',
    );
    const user = statement.get(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Úspěšné přihlášení
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}
