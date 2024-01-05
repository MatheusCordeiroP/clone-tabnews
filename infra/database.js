import { Client } from 'pg';

const query = async queryObject => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  const res = await client.query(queryObject);
  console.log(res.rows[0].message); // Hello world!
  await client.end;
  return res;
};

export default {
  query: query,
};
