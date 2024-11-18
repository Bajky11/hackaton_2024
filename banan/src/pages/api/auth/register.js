import db from '../../../../db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  // Ověření, že jsou všechna data přítomna
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide all required fields' });
  }

  try {
    const statement = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    );
    statement.run(name, email, password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message });
  }
}
