import { Request, Response } from "express";
import { getRedisClient, isRedisReady } from './redis';
import { getPollByUUID } from "./db";
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

const pollMetaKey = (pollId: string) => `poll:${pollId}`;
const pollVotesKey = (pollId: string) => `poll:${pollId}:votes`;
const pollVotersKey = (pollId: string) => `poll:${pollId}:voters`;


export async function handleGetPoll(req: Request, res: Response) {
	const { uuid } = req.params;
	const client = await getRedisClient();

	if(typeof uuid !== "string") {
		console.error(`bad key`);
		return;
	}

	const pollMetadataKey = pollMetaKey(uuid);
	const pollMetadataString = await client.get(pollMetadataKey);

	if(pollMetadataString != null) {
		console.log(`Retuned cached "${pollMetadataKey}"`)
		const data = JSON.parse(pollMetadataString);
		res.send({ status: 'ok', data });
		return;
	}

	const pollMetadata = await getPollByUUID(uuid);

	if(pollMetadata == null) {
		console.error(`no poll with this uuid in db`);
		return;
	}

	await client.set(pollMetadataKey, JSON.stringify(pollMetadata));

	res.send({ status: 'ok', data: pollMetadata });
}

export async function initalizePollVotesSet(poll: Poll) {
	const votes: Record<string, number> = {};
	poll.options.forEach(option => {votes[option.id] = 0;})

	const votesKey = pollVotesKey(poll.uuid);
	const client = await getRedisClient();
	await client.hSet(votesKey, votes);

	console.log(votesKey, votes);
}

export async function handlePollVote(req: Request, res: Response) {
	const { uuid, optionId } = req.body;
	const client = await getRedisClient();
	
	const votesKey = pollVotesKey(uuid);
	const voteCount = await client.hIncrBy(votesKey, optionId, 1);
	console.log(votesKey, voteCount);
	res.send({ status: 'ok' })
}