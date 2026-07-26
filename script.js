const canvas = document.getElementById('animeCanvas');
const ctx = canvas.getContext('2d');
const scaleSlider = document.getElementById('scaleSlider');
const scaleValue = document.getElementById('scaleValue');

let scale = 1.0;

function drawRimuru(s) {
  ctx.clearRect(0, 0, 800, 800);

  // ===== BACKGROUND GRADIENT =====
  const bg = ctx.createRadialGradient(400, 400, 50, 400, 400, 500);
  bg.addColorStop(0, '#1a1a2e');
  bg.addColorStop(1, '#0a0a12');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 800, 800);

  // ===== MIST / AURA =====
  ctx.save();
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(400 + Math.sin(Date.now()/2000 + i)*60, 400 + Math.cos(Date.now()/1500 + i)*60, 120 + i*20, 0, Math.PI*2);
    ctx.fillStyle = '#4080ff';
    ctx.fill();
  }
  ctx.restore();

  // ===== TRANSFORM SCALE =====
  ctx.save();
  ctx.translate(400, 400);
  ctx.scale(s, s);
  ctx.translate(-400, -400);

  // ===== BODY (SLIME BASE) =====
  // Bayangan
  ctx.shadowColor = 'rgba(60,120,255,0.25)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 10;

  // Tubuh utama - bentuk humanoid dengan volume
  const gradient = ctx.createRadialGradient(380, 340, 40, 400, 380, 220);
  gradient.addColorStop(0, '#b0d8ff');
  gradient.addColorStop(0.4, '#6aafff');
  gradient.addColorStop(0.7, '#3a80d0');
  gradient.addColorStop(1, '#1a3a6a');

  ctx.shadowColor = 'rgba(60,120,255,0.3)';
  ctx.shadowBlur = 50;

  // Dada / torso
  ctx.beginPath();
  ctx.ellipse(400, 380, 120, 150, 0, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // ===== BUST / DADA BESAR =====
  ctx.shadowBlur = 40;

  // Payudara kiri
  const leftBreastGrad = ctx.createRadialGradient(355, 310, 20, 355, 310, 48);
  leftBreastGrad.addColorStop(0, '#c0e4ff');
  leftBreastGrad.addColorStop(0.5, '#70b0ff');
  leftBreastGrad.addColorStop(1, '#2a6aaa');
  ctx.beginPath();
  ctx.ellipse(355, 310, 45, 42, -0.08, 0, Math.PI * 2);
  ctx.fillStyle = leftBreastGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,160,255,0.15)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Payudara kanan
  const rightBreastGrad = ctx.createRadialGradient(445, 310, 20, 445, 310, 48);
  rightBreastGrad.addColorStop(0, '#c0e4ff');
  rightBreastGrad.addColorStop(0.5, '#70b0ff');
  rightBreastGrad.addColorStop(1, '#2a6aaa');
  ctx.beginPath();
  ctx.ellipse(445, 310, 45, 42, 0.08, 0, Math.PI * 2);
  ctx.fillStyle = rightBreastGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,160,255,0.15)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ===== CLEAVAGE BAYANGAN =====
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.ellipse(400, 335, 30, 20, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(20,60,120,0.35)';
  ctx.fill();

  // ===== LEHER =====
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.ellipse(400, 225, 40, 30, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#7ab8ff';
  ctx.fill();

  // ===== KEPALA =====
  ctx.shadowBlur = 30;
  const headGrad = ctx.createRadialGradient(385, 185, 30, 400, 185, 70);
  headGrad.addColorStop(0, '#c8e8ff');
  headGrad.addColorStop(0.5, '#8ac4ff');
  headGrad.addColorStop(1, '#3a80c0');
  ctx.beginPath();
  ctx.ellipse(400, 175, 70, 80, 0, 0, Math.PI * 2);
  ctx.fillStyle = headGrad;
  ctx.fill();

  // ===== RAMBUT (SLIME-BLUE) =====
  ctx.shadowBlur = 25;
  ctx.shadowColor = 'rgba(60,150,255,0.25)';

  // Rambut utama - tumpukan gelombang
  const hairColors = ['#4a8aff', '#5a9aff', '#3a7ae0', '#2a6ac0'];
  for (let layer = 0; layer < 4; layer++) {
    ctx.beginPath();
    const offsetX = 400 + Math.sin(layer * 1.2) * 15;
    const offsetY = 155 - layer * 10;
    const w = 90 - layer * 8;
    const h = 40 - layer * 6;
    ctx.ellipse(offsetX, offsetY, w, h, 0.1 * layer, 0, Math.PI * 2);
    ctx.fillStyle = hairColors[layer % hairColors.length];
    ctx.fill();
  }

  // Poni
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    const x = 365 + i * 14;
    const y = 145 - Math.sin(i * 0.8) * 12;
    ctx.ellipse(x, y, 16, 28, -0.2 + i * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#4a8aff' : '#5a9aff';
    ctx.fill();
  }

  // ===== MATA =====
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(255,255,255,0.1)';

  // Mata kiri
  ctx.beginPath();
  ctx.ellipse(368, 168, 20, 24, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a18';
  ctx.fill();
  // Iris
  const irisL = ctx.createRadialGradient(368, 168, 4, 368, 168, 16);
  irisL.addColorStop(0, '#80ccff');
  irisL.addColorStop(0.5, '#3080dd');
  irisL.addColorStop(1, '#104080');
  ctx.beginPath();
  ctx.ellipse(368, 168, 16, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = irisL;
  ctx.fill();
  // Pupil
  ctx.beginPath();
  ctx.arc(368, 168, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  // Highlight
  ctx.beginPath();
  ctx.arc(362, 160, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(374, 172, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fill();

  // Mata kanan
  ctx.beginPath();
  ctx.ellipse(432, 168, 20, 24, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a18';
  ctx.fill();
  const irisR = ctx.createRadialGradient(432, 168, 4, 432, 168, 16);
  irisR.addColorStop(0, '#80ccff');
  irisR.addColorStop(0.5, '#3080dd');
  irisR.addColorStop(1, '#104080');
  ctx.beginPath();
  ctx.ellipse(432, 168, 16, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = irisR;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(432, 168, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(426, 160, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(438, 172, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fill();

  // ===== ALIS =====
  ctx.shadowBlur = 5;
  ctx.strokeStyle = '#2a5a8a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(348, 144);
  ctx.quadraticCurveTo(368, 132, 386, 140);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(414, 140);
  ctx.quadraticCurveTo(432, 132, 452, 144);
  ctx.stroke();

  // ===== MULUT =====
  ctx.shadowBlur = 6;
  ctx.strokeStyle = '#3a5a7a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(400, 195, 18, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // ===== BAHU & LENGAN =====
  ctx.shadowBlur = 30;
  ctx.shadowColor = 'rgba(60,120,255,0.2)';

  // Bahu kiri
  ctx.beginPath();
  ctx.ellipse(270, 360, 40, 50, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#6aaaff';
  ctx.fill();

  // Bahu kanan
  ctx.beginPath();
  ctx.ellipse(530, 360, 40, 50, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#6aaaff';
  ctx.fill();

  // Lengan kiri
  ctx.beginPath();
  ctx.ellipse(240, 420, 28, 50, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#5a9aee';
  ctx.fill();

  // Lengan kanan
  ctx.beginPath();
  ctx.ellipse(560, 420, 28, 50, 0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#5a9aee';
  ctx.fill();

  // ===== TANGAN =====
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#7ab8ff';
  // Tangan kiri
  ctx.beginPath();
  ctx.ellipse(218, 468, 20, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  // Tangan kanan
  ctx.beginPath();
  ctx.ellipse(582, 468, 20, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // ===== JUBBAH / BAJU =====
  ctx.shadowBlur = 25;
  ctx.shadowColor = 'rgba(40,80,160,0.15)';

  // Baju bagian bawah
  const robeGrad = ctx.createLinearGradient(280, 450, 520, 600);
  robeGrad.addColorStop(0, '#2a4a7a');
  robeGrad.addColorStop(0.4, '#1a3a6a');
  robeGrad.addColorStop(0.7, '#0a2a5a');
  robeGrad.addColorStop(1, '#0a1a3a');

  ctx.beginPath();
  ctx.moveTo(280, 450);
  ctx.quadraticCurveTo(320, 580, 260, 700);
  ctx.quadraticCurveTo(400, 720, 540, 700);
  ctx.quadraticCurveTo(480, 580, 520, 450);
  ctx.fillStyle = robeGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(60,120,200,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // ===== DETAIL BAJU =====
  ctx.shadowBlur = 10;
  ctx.strokeStyle = 'rgba(100,180,255,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const y = 480 + i * 28;
    ctx.beginPath();
    ctx.moveTo(300 + i * 8, y);
    ctx.quadraticCurveTo(400, y + 10, 500 - i * 8, y);
    ctx.stroke();
  }

  // ===== AKSESORI: KALUNG / MANIK =====
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(80,180,255,0.25)';
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI + Math.PI * 0.8;
    const x = 400 + Math.sin(angle) * 70;
    const y = 235 + Math.cos(angle) * 28;
    ctx.beginPath();
    ctx.arc(x, y, 5 + Math.sin(i * 1.5) * 2, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#40a0ff' : '#80d0ff';
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,240,255,0.2)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // ===== SOROTAN CAHAYA =====
  ctx.shadowBlur = 60;
  ctx.shadowColor = 'rgba(100,200,255,0.08)';
  const highlight = ctx.createRadialGradient(300, 200, 20, 400, 300, 300);
  highlight.addColorStop(0, 'rgba(200,240,255,0.05)');
  highlight.addColorStop(0.5, 'rgba(100,180,255,0.03)');
  highlight.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = highlight;
  ctx.fillRect(0, 0, 800, 800);

  ctx.restore(); // scale
}

function animate() {
  drawRimuru(scale);
  requestAnimationFrame(animate);
}

scaleSlider.addEventListener('input', (e) => {
  scale = parseFloat(e.target.value);
  scaleValue.textContent = scale.toFixed(2);
});

animate();
