# Vinny Weds Phani — Interactive 3D Wedding Invitation

An interactive 3D wedding invitation website built with React 19, Vite and Three.js. Instead of a static card, the invitation is a small 3D scene: an envelope that opens to reveal the letter, framed by a traditional toranam (door hanging), with overlay UI for the invitation details.

## Components

- `Envelope.jsx` / `Letter.jsx` — the 3D envelope and the invitation letter it reveals
- `Scene.jsx` — the Three.js scene setup (canvas, lighting, camera)
- `Toranam.jsx` — decorative toranam framing the scene
- `Band.jsx` / `Overlay.jsx` — supporting 3D band and the HTML overlay UI

## Tech stack

- React 19 + Vite
- Three.js with @react-three/fiber and @react-three/drei
- @react-spring/three for animation

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Notes

- The `dist/` folder in this repo is a committed build output — it can be regenerated any time with `npm run build`.
- Screenshots / preview GIF: _(to be added)_
