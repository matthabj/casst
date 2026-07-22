import express = require("express");
import { Request, Response } from "express";
import { routes } from './routes';
import { connectRedisInBackground } from './redis';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req: Request, res: Response) => {
	res.sendFile("index.html");
});

connectRedisInBackground();

app.use(routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
