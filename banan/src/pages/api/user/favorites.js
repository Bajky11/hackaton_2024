import db from '../../../../db';

export default function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST': {
        const { sasName, userId } = req.body;
        if (!sasName || !userId) {
          return res
            .status(400)
            .json({ message: 'sasName and userId are mandatory parameters' });
        }
        return handlePostRequest(sasName, userId, res);
      }

      case 'DELETE': {
        const { userId, sasName } = req.body;
        if (!userId || !sasName) {
          return res
            .status(400)
            .json({ message: 'userId or sasName is a mandatory parameter' });
        }
        return handleDeleteRequest(userId, sasName, res);
      }

      case 'GET': {
        const { userId: getUserId } = req.query;
        if (!getUserId) {
          return res
            .status(400)
            .json({ message: 'userId is a mandatory parameter' });
        }
        return handleGetRequest(getUserId, res);
      }

      default: {
        res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
        res.status(405).json({ message: `Method ${method} not allowed` });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function handlePostRequest(sasName, userId, res) {
  try {
    const statement = db.prepare(
      'INSERT INTO user_sas (user_id, sas_name) VALUES (?, ?)',
    );
    statement.run(userId, sasName);
    res.status(201).json({ message: 'sasName added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add sasName' });
  }
}

function handleDeleteRequest(userId, sasName, res) {
  try {
    const statement = db.prepare(
      'DELETE FROM user_sas WHERE user_id = ? AND sas_name = ?',
    );
    const result = statement.run(userId, sasName);

    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: 'No record found for the given userId and sasName' });
    }

    return res.status(200).json({ message: 'sasName deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Failed to delete sasName' });
  }
}

function handleGetRequest(userId, res) {
  try {
    const statement = db.prepare('SELECT * FROM user_sas WHERE user_id = ?');
    const rows = statement.all(userId);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sasNames' });
  }
}
