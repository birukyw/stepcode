# Putting StepCode online

Two pieces, both free to start:

| Piece | Host | What it does |
|---|---|---|
| Website (React, Vite) | **Vercel** | Everything you see. **Python runs inside the visitor's browser** (Pyodide), so it needs no server. |
| Code runner (`server/`) | **Render** | Only needed for **Java**. Skip it and Java shows a friendly "not switched on yet" message. |

## 1. Push the code to GitHub

The repo already has a remote called `origin` (`github.com/birukyw/stepcode`). From the project folder:

```bash
git push -u origin main
```

## 2. Deploy the website on Vercel

1. Go to vercel.com, sign in with GitHub, **Add New > Project**, and import the `stepcode` repository.
2. Vercel reads `vercel.json` and detects Vite. Leave the defaults (build `npm run build`, output `dist`).
3. Click **Deploy**. You get a link like `https://stepcode.vercel.app`. Open it on your phone.

Python lessons work straight away. The first Run downloads the Python engine (about 10 MB, cached afterwards).

## 3. (Optional) Deploy the Java runner on Render

1. Go to render.com, sign in with GitHub, **New > Blueprint**, and pick the same repository. Render reads `render.yaml` and builds `server/Dockerfile`.
2. When asked for `ALLOWED_ORIGINS`, enter your Vercel link exactly, with no trailing slash, for example `https://stepcode.vercel.app`. (Separate several sites with commas.)
3. Wait for the deploy. Copy the service address, for example `https://stepcode-runner.onrender.com`. Check `https://stepcode-runner.onrender.com/healthz` shows `{"ok":true,...}`.
4. In Vercel, open the project, **Settings > Environment Variables**, and add `VITE_API_URL` with the Render address (no trailing slash). **Redeploy** so the site picks it up.

Free Render services sleep after a quiet period, so the first Java run after a pause can take about a minute.

## Safety notes for the runner

The runner executes code that strangers type into the site. It already has:

- a container with no secrets, run as an unprivileged user,
- a clean environment, a 20 second time limit, 128 MB of Java memory, an output cap and a code size cap,
- a per-visitor rate limit, a cap on simultaneous runs, and CORS limited to your site.

It does **not** block network access from inside the container, so treat it as disposable: never put keys, databases or other services next to it, and never run it on your own computer's network for the public. If abuse appears, set `RUNNER_LANGUAGES` to an empty value on Render or suspend the service. The website keeps working for Python.

## Running locally

```bash
npm install
npm run dev        # site on :3000, runner on :3001
```

## Phone checklist

- Open the Vercel link on the phone. Lessons show three tabs: **Read**, **Code**, **Terminal**. Pressing Run jumps to Terminal.
- "Add to Home Screen" in the browser menu installs it like an app (manifest and icons are included).
