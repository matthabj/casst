import { Pool as PostgressPool } from 'pg';
import { UUID, Poll } from './types';

export const postgressPool = new PostgressPool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

export async function getPollByUUID(uuid: UUID): Promise<Poll | undefined> {
  const { rows } = await postgressPool.query<Poll>(
    'SELECT * FROM polls WHERE uuid = $1',
    [uuid]
  );
  return rows[0];
}