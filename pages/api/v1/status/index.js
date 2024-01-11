import database from 'infra/database.js';

const status = async (request, response) => {
  const dbName = process.env.POSTGRES_DB;
  const dbMaxConnections = await database.query('SHOW max_connections;');
  const dbOpenedConnections = await database.query({
    text: `SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1 AND state = 'active';`,
    values: [dbName],
  });
  const dbVersion = await database.query('SHOW server_version;');

  const databaseResponse = {
    max_connections: Number.parseInt(dbMaxConnections.rows[0].max_connections),
    opened_connections: dbOpenedConnections.rows[0].opened_connections,
    version: dbVersion.rows[0].server_version,
  };

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: databaseResponse,
    },
  });
};

export default status;
