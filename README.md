# Admin WebDuet

A UI like chat for conversation between Site (CMS) and Client.

API for Site declared in the folder `/share/protos`.

## Environment

### IDE

VS Code

### Tech Stack

ChatGPT or any LLMs

NextJS

Typescript

TailwindCSS

gRPC

## Prepare to Start

In a terminal VS Code run in the `/server` and `/client` directories this commanf:

```bash
npm i
```

## Start Client and Server

In a terminal start the gRPC server in the `/server` directory:

```bash
npm run start
```

In another terminal, start the NextJS development server in the `/client` directory:

```bash
npm run dev
```

## Visual Testing

Open `http://localhost:3000/api/100/background/color?rgb=aabbcc` in a browser.

You should see:

```json
{ "ok": true, "new_rgb": "aabbcc" }
```
