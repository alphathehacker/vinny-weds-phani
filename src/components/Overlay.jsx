import React, { useEffect, useRef } from "react";
// Import the image from assets. If the image is named differently, update the filename here.
// Assuming the user will place the image at client/src/assets/couple.png
// Image is loaded directly from public/assets/couple.png
import Band from './Band';

const STYLES = `
.wi-root{
  --wi-maroon-deep:#3A0C13;
  --wi-maroon:#651C24;
  --wi-gold:#D4A24C;
  --wi-gold-light:#F0D9A0;
  --wi-cream:#FBF3E2;
  --wi-blush:#E7A091;
  font-family:'Poppins', sans-serif;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(212,162,76,0.10), transparent 60%),
    linear-gradient(180deg, var(--wi-maroon-deep) 0%, #2A090F 55%, #200609 100%);
  min-height:100vh;
  height:100dvh;
  width:100%;
  overflow-x:hidden;
  overflow-y:auto;
  display:flex;
  flex-direction:column; /* Safest for scrollability on mobile */
  align-items:center;
  justify-content:flex-start; /* Allows normal scrolling */
  padding:56px 100px 40px; /* Increased horizontal padding to prevent overlap with garlands */
  position:absolute;
  top:0;
  left:0;
  z-index: 1000;
  box-sizing:border-box;
  transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
}
.wi-root.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.wi-root *{ box-sizing:border-box; }
.wi-dotgrid{
  content:"";
  position:fixed; inset:0;
  background-image: radial-gradient(rgba(212,162,76,0.14) 1px, transparent 1.4px);
  background-size: 26px 26px;
  pointer-events:none;
  opacity:.5;
}
.wi-stage{
  position:relative;
  width:100%;
  max-width:1200px;
  display:flex;
  align-items:center; /* Center items vertically */
  justify-content:space-between;
  gap:40px;
  margin: auto 0; /* Perfectly centers it vertically inside wi-root */
}
.wi-petal-layer{ position:fixed; inset:0; pointer-events:none; z-index:0; }
.wi-petal{
  position:fixed;
  top:-40px;
  opacity:.55;
  animation:wi-fall linear infinite;
  pointer-events:none;
  user-select:none;
}
.wi-petal svg{ width:14px; height:14px; display:block; }
@keyframes wi-fall{
  0%{ transform:translateY(-5vh) translateX(0) rotate(0deg); }
  100%{ transform:translateY(105vh) translateX(30px) rotate(320deg); }
}
.wi-corner{
  position:absolute;
  width:96px; height:96px;
  opacity:.85;
  z-index:5;
}
.wi-corner.wi-tl{ top:34px; left:calc(50% - 380px); }
.wi-corner.wi-tr{ top:34px; right:calc(50% - 380px); transform:scaleX(-1); }
@media (max-width: 900px){
  .wi-corner{ display:none; }
}
.wi-card{
  position:relative;
  z-index:4;
  flex: 1;
  max-width:400px;
  background:
    linear-gradient(180deg, rgba(255,247,231,0.05), rgba(255,247,231,0.02)),
    var(--wi-maroon);
  border:1px solid rgba(212,162,76,0.55);
  border-radius:6px;
  padding:54px 30px;
  text-align:center;
  box-shadow:
    0 0 0 6px rgba(212,162,76,0.10),
    0 20px 60px rgba(0,0,0,0.55);
}
.wi-card::before{
  content:"";
  position:absolute; inset:10px;
  border:1px solid rgba(212,162,76,0.35);
  border-radius:3px;
  pointer-events:none;
}
.wi-om{
  width:34px; height:34px;
  margin:0 auto 14px;
  color:var(--wi-gold);
  opacity:.9;
}
.wi-eyebrow{
  font-family:'Yatra One', cursive;
  font-weight:400;
  font-size:13px;
  letter-spacing:.22em;
  color:var(--wi-gold-light);
  text-transform:uppercase;
  margin:0 0 18px;
}
.wi-names{
  font-family:'Cormorant Garamond', serif;
  font-size:clamp(36px, 6vw, 48px);
  font-weight:600;
  line-height:1.05;
  color:var(--wi-gold);
  text-shadow:0 2px 14px rgba(212,162,76,0.25);
  margin:0;
}
.wi-names .wi-amp{
  font-style:italic;
  font-weight:500;
  color:var(--wi-blush);
  padding:0 6px;
  font-size:.72em;
}
.wi-divider{
  width:120px;
  height:14px;
  margin:20px auto 22px;
  color:var(--wi-gold);
  opacity:.8;
}
.wi-tagline{
  font-family:'Cormorant Garamond', serif;
  font-style:italic;
  font-weight:500;
  font-size:19px;
  color:var(--wi-cream);
  opacity:.92;
  margin:0 0 34px;
}
.wi-cta{
  display:inline-block;
  font-family:'Poppins', sans-serif;
  font-weight:500;
  font-size:13px;
  letter-spacing:.16em;
  color:var(--wi-gold-light);
  background:transparent;
  border:1.4px solid var(--wi-gold);
  padding:15px 40px;
  border-radius:3px;
  cursor:pointer;
  text-transform:uppercase;
  transition:background .25s ease, color .25s ease, box-shadow .25s ease;
}
.wi-cta:hover{
  background:var(--wi-gold);
  color:var(--wi-maroon-deep);
  box-shadow:0 6px 22px rgba(212,162,76,0.35);
}
.wi-cta:focus-visible{
  outline:2px solid var(--wi-gold-light);
  outline-offset:3px;
}
.wi-characters {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-left: -60px; /* Attach to the card on desktop */
  z-index: 3;
}

.wi-character-img {
  width: 100%;
  max-width: 360px;
  height: auto;
  z-index: 3;
  filter: drop-shadow(0 12px 14px rgba(0,0,0,.45));
}

.wi-caption{
  flex: 1;
  color: var(--wi-gold-light);
  font-size: 20px;
  line-height: 1.8;
  font-style: italic;
  max-width: 300px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin-left: 20px; /* Add some breathing room since characters moved left */
}

@media (max-width: 900px){
  .wi-root { padding: 40px 40px 40px; } /* Restored normal bottom padding */
  .wi-stage { flex-direction: column; gap: 40px; }
  
  /* Reorder for mobile: Characters -> Card -> Caption */
  .wi-characters { 
    order: -1; 
    margin-left: 0; 
    margin-bottom: -70px; /* Attach to the top of the card on mobile */
  }
  .wi-card { order: 0; }
  .wi-caption { order: 1; text-align: center; max-width: 100%; font-size: 18px; margin-left: 0; }
}
@media (max-width: 600px){
  .wi-root { padding: 50px 20px 20px; } /* Restored normal bottom padding */
  .wi-stage { gap: 30px; }
  .wi-characters { margin-bottom: -50px; } /* Adjust overlap for smaller screens */
  .wi-character-img{ width: 90%; max-width: 300px; } /* Adjusted size */
  .wi-card{ padding: 44px 20px 30px; margin: 0; width: 100%; }
  .wi-names { font-size: 32px; }
  .wi-eyebrow { font-size: 11px; }
  .wi-tagline { font-size: 16px; margin-bottom: 24px; }
  .wi-caption { font-size: 15px; margin-bottom: 0; }
  .wi-cta { padding: 12px 30px; font-size: 12px; }
}
`;

const PETAL_SVGS = [
  '<svg viewBox="0 0 16 16"><path d="M8 0 C 11 3, 11 8, 8 16 C 5 8, 5 3, 8 0 Z" fill="#6B8F55"/></svg>',
  '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#D4A24C"/><circle cx="8" cy="8" r="2.6" fill="#F0D9A0"/></svg>',
  '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#E7A091"/></svg>',
];

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("wi-fonts")) return;
    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";
    const sheet = document.createElement("link");
    sheet.id = "wi-fonts";
    sheet.rel = "stylesheet";
    sheet.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500;1,600&family=Yatra+One&family=Poppins:wght@300;400;500;600&display=swap";
    document.head.appendChild(pre1);
    document.head.appendChild(pre2);
    document.head.appendChild(sheet);
  }, []);
}

function usePetals(layerRef, count = 16) {
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "wi-petal";
      p.innerHTML = PETAL_SVGS[i % PETAL_SVGS.length];
      p.style.left = Math.random() * 100 + "vw";
      const dur = 9 + Math.random() * 10;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = -Math.random() * dur + "s";
      p.style.fontSize = 10 + Math.random() * 8 + "px";
      layer.appendChild(p);
      nodes.push(p);
    }
    return () => nodes.forEach((n) => n.remove());
  }, [layerRef, count]);
}

export default function Overlay({
  brideName = "Vineela",
  groomName = "Phanikumar",
  tagline = "Join us in celebrating our special day",
  caption = "— Two souls, one heart. Join us as we step into our beautiful new forever, surrounded by love and light. —",
  onStart,
  hasStarted
}) {
  const petalLayerRef = useRef(null);
  useGoogleFonts();
  usePetals(petalLayerRef);

  return (
    <div className={`wi-root ${hasStarted ? 'fade-out' : ''}`}>
      <style>{STYLES}</style>
      <div className="wi-dotgrid" />
      <div className="wi-petal-layer" ref={petalLayerRef} />

      <div className="wi-stage">
        {/* Left Side: Name Board */}
        <div className="wi-card">
          <svg className="wi-om" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 55 Q20 30 42 30 Q58 30 56 45 Q55 55 42 55 Q30 55 32 46 Q34 40 42 42" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M50 60 Q68 60 68 45 Q68 34 58 34" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M20 68 Q40 55 62 68 Q75 76 78 60" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M74 28 Q80 34 74 40" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </svg>

          <p className="wi-eyebrow">You are invited to the wedding of</p>

          <h1 className="wi-names">
            {brideName} <span className="wi-amp">&amp;</span> {groomName}
          </h1>

          <svg className="wi-divider" viewBox="0 0 120 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="7" x2="46" y2="7" stroke="currentColor" strokeWidth="1" />
            <line x1="74" y1="7" x2="120" y2="7" stroke="currentColor" strokeWidth="1" />
            <path d="M60 2 L64 7 L60 12 L56 7 Z" fill="currentColor" />
            <circle cx="52" cy="7" r="1.6" fill="currentColor" />
            <circle cx="68" cy="7" r="1.6" fill="currentColor" />
          </svg>

          <p className="wi-tagline">{tagline}</p>

          <button className="wi-cta" type="button" onClick={onStart}>
            Open Invitation
          </button>
        </div>

        {/* Center: Couple Image */}
        <div className="wi-characters">
          <img 
            src="/assets/couple.png" 
            alt="Bride and Groom" 
            className="wi-character-img" 
            onError={(e) => {
              // Fallback if the image doesn't exist
              e.target.onerror = null; 
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Right Side: Caption */}
        <div className="wi-caption">
          {caption}
        </div>
      </div>

      <Band />
    </div>
  );
}
