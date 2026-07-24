import { Request, Response } from "express";
import { getRedisClient, isRedisReady } from './redis';
import { Poll } from './types';

function responseError(res: Response, message: string) {
	return res.status(400).json({ status: 'error', message});
}

export async function getKey(req: Request, res: Response) {
	const { key } = req.params;
	const keyString: string = key as string;

	const client = getRedisClient();
	if(!isRedisReady()) {
		return responseError(res, 'Redis is not ready');
	}

    const value = await client.get(keyString);
    if (value === null) {
      return responseError(res, 'Key not found');
    }

    res.json({ status: 'ok', data:{key, value} });
}

export async function storeKey(req: Request, res: Response) {
	const { key, value } = req.body;

	const client = getRedisClient();
	if(!isRedisReady()) {
		return responseError(res, 'Redis is not ready');
	}

    if (!key || value === undefined) {
      return responseError(res, 'Arguments "key" and "value" are required');
    }
	
    await client.set(key, String(value));
    res.json({ status: 'ok', data: {key, value} });
}

const polls: Poll[] = [
	{
		id: "1",
		title: "What is my name?",
		options: [
			{id: "1", value: "A"},
			{id: "2", value: "B"},
			{id: "3", value: "C"}
		],
		votes: new Map<string, number>([
			["1", 2],
			["2", 1],
			["4", 5]
		])
	}
];

export function handleGetPoll(req: Request, res: Response) {
	const { uuid } = req.params;

	res.send({ status: 'ok', data: polls[0]});
} 