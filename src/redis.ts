import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;
let clientConnected = false;
let connectPromise: Promise<void> | null = null;

export function getRedisClient(){
	if(!client) {
		client = createClient({ url: 'redis://localhost:6379' });
		client.on('error', err => console.error('Redis error:', err));
	}

	return client;
}

export function isRedisReady() {
  return clientConnected && client?.isOpen === true;
}

export function connectRedisInBackground() {
	const redisClient = getRedisClient();

	connectPromise = redisClient.connect()
		.then(() => {
			clientConnected = true;
			console.log('Redis connected');
		})
		.catch(err => {
			clientConnected = false;
			console.error('Redis connection failed (server still running):', err);
	});

	return connectPromise;
}