# casst

To install dependencies:

```bash
bun install
```

To run:

```bash
npm run dev
```
This project was created using `bun init` in bun v1.3.5.

## Endpoints

GET `/polls`

GET `/polls/:uuid`

POST `/polls/create`

POST `/polls/:uuid/vote`


## TODO

- [ ] better radio buttons:
  - [x] grouping and highlighting
  - [ ] options for multiple choices
  - [ ] handeling realtime button adding
  - [ ] working percent attribute
- [ ] creating polls
  - [ ] (*) poll admin view
- [ ] voting on polls
  - [ ] caching already voted users
- [ ] JSON storing polls
- [ ] Redis caching polls metadata
- [ ] Realtime vote progress update (socket.io)