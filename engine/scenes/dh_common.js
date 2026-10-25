// 《甄后》敦煌壁画风笔法库（莫高窟·盛唐）——纯代码。
// 复用已验证的 scenes/20_dunhuang.js 视觉词汇（土红地仗／莲花砖地／剥落罩层／祥云／飞天／披帛／天花／油灯），
// 并把甄后重画为唐代供养人（石青短襦／间色裙／披帛／高髻簪花／花钿斜红点唇），道具改矿物色＋铁线描。
// 依赖：z_common.js（Z.bigText 榜题／Z.colophon 题记／Z.seal 钤印）＋ 全局 U / PAINT / KIT / RIG。
// ⚠ 本库为追加型：const Z = window.Z（z_common 已重置根库）；eras 的 SCENE_LIBS = [z_common, dh_common]。
// 分层约定（每幕 draw 内按此序）：dhGround → dhCloud/dhApsara → dhFloor → dhAging → 道具+人物(清晰) → dhVeil。
//   （剥落罩层画在人物之前，人物保持清晰、只被 dhVeil 统一褪色——故事片要读得清脸。）
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT;
const Z = window.Z;
const brush = P.brush;
const C = { red: '#a5452f', redDk: '#7a2e1e', ochre: '#e08a3a', green: '#3f8f6e', green2: '#6ab08e', blue: '#2f5f8f', blue2: '#5a86b0', white: '#ecdfc4', ink: '#2a1a14', line: '#5a2414', skin: '#f2dcc4', gold: '#d8b05a', plaster: '#d8c6a2', hair: '#241a14' };
const LW = 2.6;
const F = (c, p, fill, lw = LW, line = C.line) => { if (fill) { c.fillStyle = fill; c.fill(p); } if (lw) { c.strokeStyle = line; c.lineWidth = lw; c.stroke(p); } };
const ell = (c, x, y, rx, ry, rot = 0) => { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); };

// ---------- 土红地仗（斑驳、烟熏、卷草边＋三角垂幔；缓存）----------
Z.dhGround = () => P.cached('dh_ground', W, H, (g) => {
  g.drawImage(P.texture('dh_red', C.red, { scale: 0.003, amt: 30, grain: 16, dark: '#7a3020', seed: 3 }), 0, 0);
  const r = rng(8);
  for (let i = 0; i < 18; i++) { const x = 60 + r() * 1800, y = 240 + r() * 460;
    g.save(); g.translate(x, y); g.globalAlpha = 0.42;
    for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); g.fillStyle = k % 2 ? C.green2 : C.white; g.beginPath(); g.ellipse(0, -16, 7, 14, 0, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = C.blue2; g.beginPath(); g.arc(0, 0, 8, 0, Math.PI * 2); g.fill(); g.restore(); }
  g.fillStyle = C.redDk; g.fillRect(0, 0, W, 34);
  g.strokeStyle = C.green2; g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= W; x += 4) { const y = 17 + Math.sin(x * 0.05) * 9; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  for (let x = 0; x < W; x += 80) { g.strokeStyle = C.white; g.lineWidth = 2.5; g.beginPath(); g.arc(x + 40, 17 + Math.sin((x + 40) * 0.05) * 9, 8, 0, Math.PI * 1.5); g.stroke(); }
  const cols = [C.blue, C.green, C.white, C.red];
  for (let x = 0, k = 0; x < W; x += 64, k++) { g.fillStyle = cols[k % 4]; g.beginPath(); g.moveTo(x, 34); g.lineTo(x + 64, 34); g.lineTo(x + 32, 84); g.closePath(); g.fill(); g.strokeStyle = C.line; g.lineWidth = 2; g.stroke();
    g.fillStyle = C.gold; g.beginPath(); g.arc(x + 32, 88, 5, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = C.redDk; g.fillRect(0, 34, W, 5);
});

// ---------- 莲花砖地（缓存）----------
Z.dhFloor = () => P.cached('dh_floor', W, H, (g) => {
  g.fillStyle = '#b8654a'; g.fillRect(0, 704, W, H - 704);
  g.fillStyle = C.redDk; g.fillRect(0, 700, W, 8);
  for (let x = 0; x < W; x += 150) for (let y = 714; y < H; y += 150) {
    g.strokeStyle = 'rgba(70,30,20,.6)'; g.lineWidth = 2; g.strokeRect(x + 3, y + 3, 144, 144);
    g.save(); g.translate(x + 75, y + 75);
    for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); g.fillStyle = k % 2 ? C.green2 : C.white; g.beginPath(); g.ellipse(0, -34, 12, 26, 0, 0, Math.PI * 2); g.fill(); g.strokeStyle = C.line; g.lineWidth = 1.6; g.stroke(); }
    g.fillStyle = C.blue2; g.beginPath(); g.arc(0, 0, 16, 0, Math.PI * 2); g.fill(); g.stroke(); g.fillStyle = C.gold; g.beginPath(); g.arc(0, 0, 6, 0, Math.PI * 2); g.fill();
    g.restore(); }
});

// ---------- 剥落罩层（白灰地仗剥落＋边缘暗线＋颜料粉化＋龟裂＋顶部烟熏；缓存，画在人物之前）----------
Z.dhAging = () => P.cached('dh_age', W, H, (g) => {
  const img = g.createImageData(W, H), d = img.data, pl = P.hex(C.plaster), r = rng(91);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const n = P.fbm(x * 0.0032 + 11, y * 0.0032 + 4, 5) + 0.12 * P.noise(x * 0.03, y * 0.03);
    if (n > 0.3) { const v = (r() - 0.5) * 22 + (n - 0.3) * 60; d[i] = pl[0] + v; d[i + 1] = pl[1] + v; d[i + 2] = pl[2] + v * 0.8; d[i + 3] = 255; }
    else if (n > 0.28) { d[i] = 70; d[i + 1] = 45; d[i + 2] = 30; d[i + 3] = 150; }
    else { const m = P.fbm(x * 0.02, y * 0.02 + 7, 3); d[i] = 255; d[i + 1] = 245; d[i + 2] = 225; d[i + 3] = clamp(m * 0.5 + 0.1) * 80; }
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = 'rgba(50,25,15,.35)'; g.lineWidth = 1;
  for (let k = 0; k < 500; k++) { let x = r() * W, y = r() * H, a = r() * 6.28; g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 5 + r() * 8; s++) { a += (r() - .5) * 1.4; x += Math.cos(a) * (5 + r() * 12); y += Math.sin(a) * (5 + r() * 12); g.lineTo(x, y); } g.stroke(); }
  const sg = g.createLinearGradient(0, 0, 0, 380); sg.addColorStop(0, 'rgba(40,20,10,.35)'); sg.addColorStop(1, 'rgba(40,20,10,0)'); g.fillStyle = sg; g.fillRect(0, 0, W, 380);
});

// ---------- 罩层（整体褪色；每幕最后调用）----------
Z.dhVeil = (c) => {
  c.save(); c.globalCompositeOperation = 'saturation'; c.fillStyle = 'rgba(128,128,128,.3)'; c.fillRect(0, 0, W, H); c.restore();
  c.save(); c.globalCompositeOperation = 'multiply'; c.globalAlpha = 0.5; c.drawImage(P.texture('dh_dirt', '#e8dcc8', { scale: 0.002, amt: 40, grain: 20, seed: 9 }), 0, 0); c.restore();
};

// ---------- 祥云（圆团＋渐细云尾，缓漂）----------
Z.dhCloud = (c, x, y, s, t, ph = 0) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = C.white; c.strokeStyle = C.line; c.lineWidth = 2.2 / s;
  [[0, 0, 18], [-22, 6, 13], [20, 6, 14], [-8, -14, 12], [10, -12, 11]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(dx, dy, r, 0, Math.PI * 2); c.fill(); c.stroke(); });
  c.fillStyle = C.white; c.beginPath(); c.ellipse(0, 4, 32, 12, 0, 0, Math.PI * 2); c.fill();
  [[0, 0, 10], [-22, 6, 7], [20, 6, 8]].forEach(([dx, dy, r]) => { c.strokeStyle = C.green; c.beginPath(); c.arc(dx, dy, r, 0.3, Math.PI * 1.7); c.stroke(); });
  c.fillStyle = C.white; c.fill(KIT.ribbon(KIT.densify([[30, 8], [60, 14 + Math.sin(ph) * 3], [95, 6 + Math.sin(ph + 1) * 5], [120, 12]], 5), q => 16 * (1 - q) + 1));
  c.restore();
};

// ---------- 飞天（横卧朝左飞，三条飘带行波，头光，托花盘；o:{y,speed,x0,scale,phase}）----------
Z.dhApsara = (c, t, lt, o = {}) => {
  const { y = 300, speed = 300, x0 = 1900, scale = 1.0, phase = 0 } = o;
  const x = x0 - lt * speed, yy = y + Math.sin(lt * 3.2 + phase) * 22;
  c.save(); c.translate(x, yy); c.scale(scale * 1.35, scale * 1.35); c.rotate(-0.12 + Math.sin(lt * 3.2 + phase) * 0.05);
  const rib = (ox, oy, len, col, ph, amp) => { const pts = []; for (let i = 0; i <= 18; i++) { const q = i / 18; pts.push([ox + q * len, oy + Math.sin(q * 5.5 - t * 7 + ph) * amp * (0.3 + q) - q * 30]); } F(c, KIT.ribbon(pts, q => 15 * (1 - q * 0.7)), col, 2); };
  rib(40, -6, 300, C.green, 0, 26); rib(30, 10, 270, C.red, 1.6, 30);
  { const pts = []; for (let i = 0; i <= 30; i++) { const q = i / 30; let px, py; if (q < 0.45) { const a = Math.PI * 0.9 - q / 0.45 * Math.PI * 1.15; px = -40 + Math.cos(a) * 70; py = -30 - Math.abs(Math.sin(a)) * 80; } else { const u = (q - 0.45) / 0.55; px = -40 + Math.cos(Math.PI * 0.9 - Math.PI * 1.15) * 70 + u * 260; py = -30 - Math.abs(Math.sin(-Math.PI * 0.25)) * 80 + Math.sin(u * 5 - t * 7) * 26 * u - u * 20; } pts.push([px, py]); }
    F(c, KIT.ribbon(pts, q => 13 * (1 - q * 0.6)), C.blue2, 2); }
  F(c, RIG.smooth([[0, -16], [70, -18], [150, -10 + Math.sin(t * 6) * 6], [190, 4 + Math.sin(t * 6 + 1) * 8], [140, 20], [60, 18], [0, 14]]), C.blue, 2.2);
  for (let k = 0; k < 3; k++) { c.strokeStyle = C.white; c.lineWidth = 2; c.beginPath(); c.moveTo(30 + k * 40, -12); c.quadraticCurveTo(60 + k * 40, 0, 40 + k * 46, 16); c.stroke(); }
  F(c, RIG.smooth([[-40, -18], [0, -22], [8, 0], [0, 16], [-36, 12]]), C.skin, 2.2);
  F(c, RIG.smooth([[-30, -14], [-70, -34], [-86, -30], [-78, -20], [-40, -4]]), C.skin, 2);
  c.fillStyle = C.gold; c.beginPath(); c.ellipse(-90, -36, 18, 6, -0.2, 0, Math.PI * 2); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.stroke();
  [[-98, -44, C.red], [-88, -46, C.white], [-80, -42, C.red]].forEach(([fx, fy, fc]) => { c.fillStyle = fc; c.beginPath(); c.arc(fx, fy, 5, 0, Math.PI * 2); c.fill(); });
  c.fillStyle = 'rgba(106,176,142,.28)'; c.beginPath(); c.arc(-56, -24, 30, 0, Math.PI * 2); c.fill(); c.strokeStyle = C.line; c.lineWidth = 1.4; c.stroke();
  c.strokeStyle = C.white; c.lineWidth = 2.5; c.beginPath(); c.arc(-56, -24, 24, 0, Math.PI * 2); c.stroke();
  F(c, (() => { const p = new Path2D(); p.ellipse(-56, -22, 15, 17, 0, 0, Math.PI * 2); return p; })(), C.skin, 2);
  c.fillStyle = '#1e1410'; c.beginPath(); c.ellipse(-52, -38, 13, 9, 0.3, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(-46, -48, 7, 0, Math.PI * 2); c.fill();
  c.fillStyle = C.line; c.fillRect(-64, -23, 4, 1.6); c.fillStyle = '#c0392b'; c.beginPath(); c.arc(-66, -14, 1.8, 0, Math.PI * 2); c.fill();
  c.restore();
};

// ---------- 天花（花瓣从窟顶散落，旋转翻面下落）----------
Z.dhFlower = (c, t) => {
  P.particles(30, 13, t, { x0: 0, x1: W, y0: 60, y1: H, speed: 90, drift: 50, life: 3 }).forEach(p => {
    c.save(); c.translate(p.x, p.y); c.rotate(p.a); c.scale(p.s * 1.6, p.s * 1.6 * (Math.abs(Math.cos(t * 3 + p.i)) * 0.8 + 0.2));
    const fc = [C.white, C.red, C.green2, '#e8a0a0'][p.i % 4];
    for (let j = 0; j < 4; j++) { c.rotate(Math.PI / 2); c.fillStyle = fc; c.beginPath(); c.ellipse(0, -7, 4, 8, 0, 0, Math.PI * 2); c.fill(); c.strokeStyle = C.line; c.lineWidth = 1.2; c.stroke(); }
    c.restore(); });
};

// ---------- 披帛（石绿正面＋白虚线描花＋红点；pts 为局部坐标点列）----------
Z.dhShawl = (c, pts, w, t) => {
  const D = KIT.densify(pts, 3), wq = q => w * (0.75 + 0.25 * Math.sin(q * 9 - t * 5)) * (1 - q * 0.25);
  const p = KIT.ribbon(D, wq);
  c.fillStyle = C.green2; c.fill(p);
  c.strokeStyle = C.line; c.lineWidth = 2.2; c.stroke(p);
  c.save(); c.strokeStyle = C.white; c.lineWidth = 2; c.beginPath(); D.forEach((pp, i) => i ? c.lineTo(pp[0], pp[1]) : c.moveTo(pp[0], pp[1])); c.setLineDash([3, 9]); c.stroke(); c.setLineDash([]); c.restore();
  D.forEach((pp, i) => { if (i % 9 !== 4) return; c.fillStyle = C.red; c.beginPath(); c.arc(pp[0], pp[1], 3.2, 0, Math.PI * 2); c.fill(); });
};

// ---------- 油灯（灯盏＋跳动的火苗＋光晕）----------
Z.dhLamp = (c, x, y, s = 1, t) => {
  if (s <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s);
  const fl = 1 + Math.sin(t * 17) * 0.12 + Math.sin(t * 29) * 0.08, sw = Math.sin(t * 11) * 4;
  c.save(); c.globalCompositeOperation = 'lighter'; const gg = c.createRadialGradient(0, -25, 2, 0, -25, 60); gg.addColorStop(0, 'rgba(255,200,90,.45)'); gg.addColorStop(1, 'rgba(255,200,90,0)'); c.fillStyle = gg; c.fillRect(-60, -85, 120, 120); c.restore();
  F(c, new Path2D('M-30 4 Q0 18 30 4 L24 16 Q0 26 -24 16 Z'), C.gold, 2);
  F(c, new Path2D(`M-8 4 Q${-12 + sw} ${-2 - 14 * fl} ${0 + sw} ${-26 - 14 * fl} Q${12 + sw * 0.5} ${-4 - 10 * fl} 8 4 Z`), '#f2a43a', 1.8);
  c.fillStyle = '#fbe7a0'; c.beginPath(); c.ellipse(sw * 0.4, -4, 4, 7 * fl, 0, 0, Math.PI * 2); c.fill();
  c.restore();
};

// ---------- 甄后：唐代供养人（单位坐标，原点＝脚底，头顶 ≈ -198）----------
// o: { t, flip, bow(俯首), fade, young(少女), queen(后妃:步摇冠+组绶), kneel(伏膝), hairDown(以发覆面), raise(进言抬手), seed }
Z.dhZhenhou = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, young = 0, queen = 0, kneel = 0, hairDown = 0, raise = 0, seed = 61 } = o;
  if (fade <= 0) return;
  const br = Math.sin(t * 1.5 + seed * .1) * .013;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  const kn = ease.out(clamp(kneel));
  c.translate(0, Math.sin(t * 1.5) * 3 + kn * 46);
  c.rotate(br * .5 + bow * .28 + kn * .22);
  const hem = Math.sin(t * 1.4) * 6;

  // 双足（舄）
  c.fillStyle = C.ink;
  ell(c, -16, 26, 13, 6.5); c.fill(); ell(c, 16, 26, 13, 6.5); c.fill();

  // 披帛·背后段（大 S 甩向身后，末端上扬；画在身体之前＝在躯干之后）
  { const pts = []; for (let i = 0; i <= 24; i++) { const q = i / 24; pts.push([-34 - q * 175 + Math.sin(q * 4.2 - t * 5.5) * 44 * q, -150 + q * 300 - Math.max(0, q - 0.68) * 200 * (0.7 + 0.3 * Math.sin(t * 4))]); } Z.dhShawl(c, pts, 26, t); }

  // 间色裙（红底，斜梯绿条，每 ~44px 一条，向下随 x 发散）
  const skirt = new Path2D();
  skirt.moveTo(-22, -140); skirt.quadraticCurveTo(-64, -74, -72 + hem, -6); skirt.quadraticCurveTo(0, 10 + hem * .4, 72 + hem * .6, -6); skirt.quadraticCurveTo(62, -76, 22, -140); skirt.closePath();
  c.fillStyle = C.red; c.fill(skirt);
  c.save(); c.clip(skirt);
  for (let gx = -96; gx <= 96; gx += 44) { c.fillStyle = C.green; c.beginPath(); c.moveTo(gx + 6, -150); c.lineTo(gx + 26, -150); c.lineTo(gx + 14 - gx * 0.16, 14); c.lineTo(gx - 8 - gx * 0.16, 14); c.closePath(); c.fill(); }
  c.restore();
  c.strokeStyle = C.line; c.lineWidth = 3; c.stroke(skirt);
  c.strokeStyle = C.gold; c.lineWidth = 3; c.beginPath(); c.moveTo(-72 + hem, -6); c.quadraticCurveTo(0, 10 + hem * .4, 72 + hem * .6, -6); c.stroke();

  // 石青短襦＋白交领＋高腰红带
  c.fillStyle = C.blue; c.beginPath(); c.moveTo(-26, -146); c.quadraticCurveTo(-34, -112, -30, -92); c.lineTo(30, -92); c.quadraticCurveTo(34, -112, 26, -146); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.8; c.stroke();
  c.strokeStyle = C.white; c.lineWidth = 6; c.beginPath(); c.moveTo(-14, -148); c.quadraticCurveTo(2, -120, 16, -144); c.stroke();
  c.fillStyle = C.red; c.beginPath(); c.moveTo(-30, -96); c.lineTo(30, -96); c.lineTo(30, -80); c.lineTo(-30, -80); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.stroke();

  // 组绶（后妃：腰下垂挂的丝组与玉佩）
  if (queen) {
    for (let k = 0; k < 3; k++) { const sw = Math.sin(t * 1.3 + k) * 7; brush(c, [[-14 + k * 14, -84], [-16 + k * 14 + sw * .5, -44], [-14 + k * 14 + sw, -12]], { w: 4, tone: .4, dry: .7, seed: 2965 + k, tail: .7, col: C.green }); }
    c.strokeStyle = `rgba(200,216,210,${.85 + Math.sin(t * 2.1) * .1})`; c.lineWidth = 4.6; c.beginPath(); c.arc(0, -6, 11, 0, Math.PI * 2); c.stroke();
  }

  // 双臂（raise 进言抬手；kneel 前伸扶膝）
  const rl = ease.out(clamp(raise));
  const ey = kneel > 0 ? -96 : (-118 - 30 * rl);
  const ex = kneel > 0 ? 52 : (44 + 8 * rl);
  brush(c, [[-26, -142], [-42, -112], [-46, -104 + 8 * (1 - kn)]], { w: 13, tone: .42, dry: .5, seed: 2971, head: .1, tail: .2, col: C.blue });
  brush(c, [[26, -142], [42, -124], [ex, ey]], { w: 13, tone: .42, dry: .5, seed: 2972, head: .1, tail: .2, col: C.blue });
  c.fillStyle = C.skin; ell(c, ex + 3, ey, 9, 10); c.fill(); c.strokeStyle = '#8a3a24'; c.lineWidth = 2; c.stroke();
  ell(c, -46 + 3, -104 + 8 * (1 - kn), 9, 10); c.fill(); c.stroke();

  // 披帛·前段（绕近侧臂垂下）
  { const pts = []; for (let i = 0; i <= 20; i++) { const q = i / 20; pts.push([ex + 6 - q * 42 + Math.sin(q * 5 - t * 6 + 1) * 30 * q, ey + 6 + q * 250 - Math.max(0, q - 0.62) * 150 * (0.7 + 0.3 * Math.sin(t * 4.6 + 1))]); } Z.dhShawl(c, pts, 22, t); }

  // 头（脸＋花钿＋斜红＋蛾眉＋点唇）
  c.save(); c.translate(0, -172 - bow * 6 - kn * 10); c.rotate(bow * .14 + kn * .1);
  c.fillStyle = C.skin; ell(c, 0, 0, young ? 14 : 15, young ? 15.5 : 16.5); c.fill(); c.strokeStyle = '#8a3a24'; c.lineWidth = 2.2; c.stroke();
  const dl = bow * 2.2 + kn * 2.4;
  c.strokeStyle = '#5a3a1a'; c.lineWidth = 2.6; c.lineCap = 'round';                                                    // 蛾眉
  c.beginPath(); c.moveTo(-11, -7 - dl); c.quadraticCurveTo(-6, -12 - dl, -1, -8 - dl); c.stroke();
  c.beginPath(); c.moveTo(11, -7 - dl); c.quadraticCurveTo(6, -12 - dl, 1, -8 - dl); c.stroke();
  c.fillStyle = C.ink; ell(c, -5.5, 1 + dl * .5, 2.5, 2.6); c.fill(); ell(c, 5.5, 1 + dl * .5, 2.5, 2.6); c.fill();      // 眼
  c.fillStyle = '#c0392b'; ell(c, 0, 9, 3.2, 2); c.fill();                                                              // 点唇
  c.fillStyle = '#c0392b'; c.save(); c.translate(0, -14 - dl); for (let j = 0; j < 4; j++) { c.rotate(Math.PI / 2); c.beginPath(); c.ellipse(0, -4, 2, 4, 0, 0, Math.PI * 2); c.fill(); } c.restore();  // 花钿
  c.strokeStyle = 'rgba(200,60,50,.32)'; c.lineWidth = 2; c.beginPath(); c.moveTo(13, -8 - dl); c.quadraticCurveTo(18, 2, 13, 14); c.stroke();        // 斜红

  // 发式
  c.fillStyle = C.hair;
  if (hairDown) {                                                                                                        // 以发覆面
    ell(c, 0, -8, 15, 12); c.fill();
    for (let k = 0; k < 7; k++) { const wf = Math.sin(t * 1.3 + k * 1.2) * 6; brush(c, [[-13 + k * 4.5, -4], [-18 + k * 6 + wf, 22], [-16 + k * 7 + wf * 1.4, 52]], { w: 6, tone: .68, dry: .8, seed: 2981 + k, tail: .75, col: C.hair }); }
  } else if (young) {                                                                                                    // 双鬟
    ell(c, 0, -10, 14.5, 9); c.fill(); ell(c, -12, -22, 8, 8); c.fill(); ell(c, 12, -22, 8, 8); c.fill();
    c.strokeStyle = C.ink; c.lineWidth = 2; ell(c, 0, -10, 14.5, 9); c.stroke();
  } else {                                                                                                               // 高髻＋金钗＋簪花
    ell(c, 0, -10, 15.5, 10); c.fill(); ell(c, 0, -30, 13, 15); c.fill(); ell(c, -6, -42, 9, 9, -.3); c.fill();
    c.strokeStyle = C.ink; c.lineWidth = 2.2; ell(c, 0, -30, 13, 15); c.stroke();
    // 垂髾
    const wf = Math.sin(t * 1.6) * 8;
    brush(c, [[-14, -22], [-26 + wf * .5, -6], [-32 + wf, 16]], { w: 5.5, tone: .6, dry: .7, seed: 2983, tail: .7, col: C.hair });
    brush(c, [[14, -22], [26 - wf * .4, -6], [32 - wf * .8, 16]], { w: 5.5, tone: .6, dry: .7, seed: 2984, tail: .7, col: C.hair });
    // 簪花（三朵）
    [[-16, -44, C.red], [2, -50, C.white], [18, -44, C.red]].forEach(([fx, fy, fc], k) => { const sw = Math.sin(t * 5 + k) * 3; for (let j = 0; j < 5; j++) { c.fillStyle = fc; c.beginPath(); c.arc(fx + sw + Math.cos(j * 1.26) * 6, fy + Math.sin(j * 1.26) * 6, 4.5, 0, Math.PI * 2); c.fill(); } c.fillStyle = C.gold; c.beginPath(); c.arc(fx + sw, fy, 3, 0, Math.PI * 2); c.fill(); });
    if (queen) {                                                                                                        // 步摇冠（金枝摇曳）
      c.strokeStyle = C.gold; c.lineWidth = 3; c.beginPath(); c.moveTo(-13, -32); c.lineTo(13, -32); c.stroke();
      for (let k = 0; k < 5; k++) { const ang = -1.9 + k * 0.95 + Math.sin(t * 2.4 + k * 1.1) * .22; const bx = -12 + k * 6, by = -36; c.save(); c.translate(bx, by); c.rotate(ang); c.strokeStyle = C.gold; c.lineWidth = 2.2; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -22); c.stroke(); c.fillStyle = `rgba(226,196,104,${.9 + Math.sin(t * 3 + k) * .1})`; c.beginPath(); c.arc(0, -26, 3.2, 0, Math.PI * 2); c.fill(); c.restore(); }
    } else {                                                                                                            // 未为后：一支素金钗
      c.strokeStyle = `rgba(216,176,90,${.8 + Math.sin(t * 2.2) * .12})`; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-13, -34); c.lineTo(11, -22); c.stroke();
    }
  }
  c.restore();
  c.restore();
};

// ---------- 男性（文帝／使者）：幞头＋圆领袍（矿物色，铁线描）----------
// o: { t, flip, bow, fade, scroll(持诏), seed }
Z.dhOfficial = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, scroll = 0, seed = 71 } = o;
  if (fade <= 0) return;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  c.rotate(Math.sin(t * 1.3 + seed * .1) * .012 + bow * .16);
  c.translate(0, Math.sin(t * 1.3) * 2);
  const hem = Math.sin(t * 1.2) * 5;
  // 双足
  c.fillStyle = C.ink; ell(c, -15, 26, 12, 6); c.fill(); ell(c, 15, 26, 12, 6); c.fill();
  // 圆领袍（石青，曳地）
  const robe = new Path2D();
  robe.moveTo(-24, -150); robe.quadraticCurveTo(-56, -80, -64 + hem, -4); robe.quadraticCurveTo(0, 8 + hem * .4, 64 + hem, -4); robe.quadraticCurveTo(56, -80, 24, -150); robe.closePath();
  c.fillStyle = C.blue; c.fill(robe); c.strokeStyle = C.line; c.lineWidth = 3; c.stroke(robe);
  // 袍褶
  brush(c, [[-10, -140], [-6, -70], [-12, -12]], { w: 2.6, tone: .26, dry: .78, seed: 2711, tail: .6, bristles: 3, col: C.blue2 });
  brush(c, [[8, -138], [12, -68], [6, -10]], { w: 2.4, tone: .22, dry: .78, seed: 2712, tail: .6, bristles: 3, col: C.blue2 });
  // 圆领＋腰带
  c.fillStyle = C.redDk; ell(c, 0, -150, 12, 7); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.stroke();
  c.fillStyle = C.gold; c.beginPath(); c.rect(-28, -104, 56, 10); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.stroke();
  // 双臂（scroll：双手前拱持诏）
  const sy = scroll > 0 ? -108 : -120;
  brush(c, [[-24, -146], [-40, -118], [-42, sy]], { w: 12, tone: .42, dry: .5, seed: 2721, head: .1, tail: .2, col: C.blue });
  brush(c, [[24, -146], [40, -118], [42, sy]], { w: 12, tone: .42, dry: .5, seed: 2722, head: .1, tail: .2, col: C.blue });
  c.fillStyle = C.skin; ell(c, -42, sy, 8, 9); c.fill(); c.strokeStyle = '#8a3a24'; c.lineWidth = 2; c.stroke(); ell(c, 42, sy, 8, 9); c.fill(); c.stroke();
  // 头＋幞头
  c.save(); c.translate(0, -172 - bow * 6); c.rotate(bow * .12);
  c.fillStyle = C.skin; ell(c, 0, 0, 14, 15.5); c.fill(); c.strokeStyle = '#8a3a24'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = C.ink; ell(c, -5, 1, 2.2, 2.4); c.fill(); ell(c, 5, 1, 2.2, 2.4); c.fill();
  c.strokeStyle = '#5a3a1a'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-10, -7); c.lineTo(-2, -9); c.moveTo(10, -7); c.lineTo(2, -9); c.stroke();
  c.strokeStyle = '#3a2a20'; c.lineWidth = 2; c.beginPath(); c.moveTo(-3, 9); c.lineTo(3, 9); c.stroke();
  // 幞头（黑，双 lobe＋顶）
  c.fillStyle = '#1e1410'; ell(c, 0, -12, 17, 11); c.fill(); ell(c, -17, -16, 9, 9); c.fill(); ell(c, 17, -16, 9, 9); c.fill();
  c.strokeStyle = C.line; c.lineWidth = 2; ell(c, 0, -12, 17, 11); c.stroke();
  c.restore();
  // 诏（素帛卷，随呼吸微动）
  if (scroll > 0) { c.save(); c.globalAlpha = clamp(fade) * .94 * clamp(scroll); c.translate(0, sy - 6); c.rotate(-0.5 + Math.sin(t * 1.8) * .06);
    c.fillStyle = C.white; c.beginPath(); c.moveTo(-4, 0); c.lineTo(50, -8); c.lineTo(46, -150); c.lineTo(-8, -142); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.4; c.stroke();
    c.strokeStyle = C.red; c.lineWidth = 6; c.beginPath(); c.moveTo(2, -20); c.lineTo(44, -26); c.stroke(); c.restore(); }
  c.restore();
};

// ---------- 卧榻（矮榻＋帷；矿物色）----------
Z.dhCouch = (c, x, y, s, t, o = {}) => {
  const { a = 1, curtain = 1, seed = 21 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  F(c, new Path2D('M-190 0 L190 -6 L184 -18 L-184 -12 Z'), C.green, 3);
  F(c, new Path2D('M-166 6 L-160 62 L-142 62 L-150 6 Z'), C.redDk, 2.6);
  F(c, new Path2D('M166 4 L160 60 L142 60 L150 4 Z'), C.redDk, 2.6);
  F(c, new Path2D('M-176 -14 L176 -20 L172 -46 L-172 -40 Z'), C.red, 2.6);
  if (curtain) { const sw = Math.sin(t * 1.1) * 8 + Math.sin(t * 0.53) * 5; c.save(); c.globalAlpha = clamp(a) * .82; c.fillStyle = C.blue2;
    c.beginPath(); c.moveTo(-210 + sw * .4, -46); c.lineTo(-190, -320); c.lineTo(-120, -318); c.lineTo(-110 + sw * .4, -46); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.4; c.stroke();
    c.beginPath(); c.moveTo(210 - sw * .4, -46); c.lineTo(190, -320); c.lineTo(120, -318); c.lineTo(110 - sw * .4, -46); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  c.restore();
};

// ---------- 邺城（城墙＋城楼；土红夯土）----------
Z.dhYeWall = (c, x, y, s, o = {}) => {
  const { a = 1, tower = 1, seed = 71 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = '#a5452f'; c.beginPath(); c.moveTo(-460, 0); c.lineTo(-450, -320); c.lineTo(450, -320); c.lineTo(460, 0); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 3.6; c.stroke();
  c.strokeStyle = 'rgba(90,40,26,.4)'; c.lineWidth = 1.4; for (let r = 1; r < 6; r++) { c.beginPath(); c.moveTo(-456 + r * 2, -r * 54); c.lineTo(456 - r * 2, -r * 54); c.stroke(); }
  c.fillStyle = '#b0563c'; for (let k = 0; k <= 11; k++) { const px = -440 + k * 80; c.fillRect(px - 26, -368, 52, 48); c.strokeStyle = C.line; c.lineWidth = 2.4; c.strokeRect(px - 26, -368, 52, 48); }
  if (tower) {
    c.fillStyle = '#8a3a24'; c.beginPath(); c.moveTo(-160, -320); c.lineTo(-160, -470); c.lineTo(160, -470); c.lineTo(160, -320); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 3.2; c.stroke();
    c.fillStyle = C.green; c.beginPath(); c.moveTo(-210, -470); c.quadraticCurveTo(-120, -538, 0, -548); c.quadraticCurveTo(120, -538, 210, -470); c.lineTo(180, -470); c.lineTo(-180, -470); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.6; c.stroke();
    c.fillStyle = C.gold; c.beginPath(); c.arc(0, -552, 8, 0, Math.PI * 2); c.fill();
    c.fillStyle = C.white; [-90, 0, 90].forEach((wx) => { c.beginPath(); c.rect(wx - 26, -446, 52, 62); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.strokeRect(wx - 26, -446, 52, 62); });
  }
  c.restore();
};

// ---------- 皇堂（阶＋柱＋座；邺城破那一场）----------
Z.dhHuangTang = (c, x, y, s, o = {}) => {
  const { a = 1, seed = 81 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = '#b0563c'; [[-380, 0, 760, 26], [-330, -28, 660, 26], [-280, -56, 560, 26]].forEach(([px, py, ww, hh]) => { c.fillRect(px, py, ww, hh); c.strokeStyle = C.line; c.lineWidth = 2; c.strokeRect(px, py, ww, hh); });
  [[-300, 0], [300, 1]].forEach(([px2, k]) => { c.save(); c.translate(px2, -80); brush(c, [[0, 0], [-5, -300], [-9, -600]], { w: 30, tone: .6, dry: .55, seed: 2821 + k, col: C.red }); c.restore(); });
  F(c, new Path2D('M-120 -84 L120 -90 L124 -170 L-116 -164 Z'), C.blue, 3);
  F(c, new Path2D('M-126 -164 L126 -170 L120 -198 L-120 -192 Z'), C.red, 2.6);
  c.restore();
};

// ---------- 玉衣（「持玉衣覆其上」：悬浮淡青玉影）----------
Z.dhYuYi = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 11 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.translate(0, Math.sin(t * 0.9) * 8);
  for (let r = 0; r < 9; r++) for (let col = 0; col < 7; col++) {
    const px = -108 + col * 36 + (r % 2) * 4, py = -300 + r * 36;
    if (Math.abs(col - 3) > 3 - Math.floor(r / 4)) continue;
    c.globalAlpha = clamp(a) * (0.3 + 0.34 * Math.sin(t * 1.6 + r * .7 + col * .5));
    c.fillStyle = 'rgba(206,222,214,.9)'; c.beginPath(); c.rect(px, py, 30, 30); c.fill(); c.strokeStyle = 'rgba(96,120,110,.7)'; c.lineWidth = 1.4; c.stroke();
  }
  c.globalAlpha = clamp(a) * .5; c.strokeStyle = 'rgba(150,180,168,.8)'; c.lineWidth = 2.4;
  c.beginPath(); c.moveTo(-118, -304); c.quadraticCurveTo(-150, -160, -132, -6); c.lineTo(132, -6); c.quadraticCurveTo(150, -160, 118, -304); c.closePath(); c.stroke();
  c.restore();
};

// ---------- 简册与笔砚（九岁喜书；竹黄＋铁线）----------
Z.dhSlate = (c, x, y, s, t, o = {}) => {
  const { a = 1, open = 1, seed = 31 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a); c.rotate(Math.sin(t * 1.2) * .04);
  for (let k = 0; k < 3; k++) { const px = -30 + k * 30;
    c.fillStyle = '#d8b45a'; c.beginPath(); c.moveTo(px, 0); c.lineTo(px + 24, -4); c.lineTo(px + 22, -92); c.lineTo(px - 2, -88); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2; c.stroke();
    c.strokeStyle = 'rgba(60,44,24,.6)'; c.lineWidth = 1.4; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(px + 5, -14 - i * 15); c.lineTo(px + 18, -14 - i * 15); c.stroke(); } }
  if (open > 0) { c.save(); c.globalAlpha = clamp(a) * open; c.translate(66, -88); c.rotate(-0.5 + Math.sin(t * 2.6) * .3);
    c.fillStyle = '#e2c46a'; c.beginPath(); c.moveTo(0, 0); c.lineTo(26, -6); c.lineTo(22, -80); c.lineTo(-4, -74); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 1.8; c.stroke(); c.restore(); }
  c.restore();
};

// ---------- 储谷（麻袋堆；赭石，敞口落谷粒）----------
Z.dhGrainSacks = (c, x, y, s, t, o = {}) => {
  const { a = 1, n = 6, open = 0, seed = 41 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const row = Math.floor(k / 3), col = k % 3, px = -150 + col * 150 + rr() * 10, py = -row * 96;
    const bulge = open > 0 && row === 0 ? open * 10 : 0;
    c.fillStyle = `rgba(${196 - row * 8},${150 - row * 6},${96 - row * 6},.92)`;
    c.beginPath(); c.moveTo(px - 62, py); c.quadraticCurveTo(px - 74 - bulge, py - 48, px - 40, py - 92); c.quadraticCurveTo(px, py - 104, px + 40, py - 92); c.quadraticCurveTo(px + 74 + bulge, py - 48, px + 62, py); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.6; c.stroke();
    c.strokeStyle = 'rgba(90,66,38,.9)'; c.lineWidth = 3; c.beginPath(); c.moveTo(px - 34, py - 88); c.lineTo(px + 34, py - 88); c.stroke();
    if (open > 0 && row === 0) { c.fillStyle = 'rgba(226,196,116,.9)'; for (let i = 0; i < 8; i++) { const q = (t * .5 + i / 8) % 1; c.beginPath(); c.arc(px - 30 + i * 9, py - 90 + q * 26, 3, 0, Math.PI * 2); c.fill(); } }
  }
  c.restore();
};

// ---------- 珠玉宝物（与谷堆对照；玉璧金饼）----------
Z.dhJadePile = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 51 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  [[-60, -16, 16], [-14, -26, 20], [36, -14, 15], [-38, -52, 12], [12, -58, 14], [62, -46, 11]].forEach(([px, py, r0], k) => {
    c.save(); c.translate(px, py);
    c.fillStyle = `rgba(212,224,220,${.9 + Math.sin(t * 2.2 + k) * .08})`; c.beginPath(); c.arc(0, 0, r0 * .5, 0, Math.PI * 2); c.fill(); c.strokeStyle = 'rgba(78,92,88,.7)'; c.lineWidth = 1.6; c.stroke();
    c.strokeStyle = `rgba(196,214,204,${.8 + Math.sin(t * 1.8 + k) * .1})`; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, r0, 0, Math.PI * 2); c.stroke(); c.restore();
  });
  [[-24, -8, 15], [26, -4, 13]].forEach(([px, py, r0], k) => { c.fillStyle = `rgba(216,176,90,${.9 + Math.sin(t * 2.6 + k) * .1})`; c.beginPath(); c.ellipse(px, py, r0, r0 * .5, 0, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#8a6a26'; c.lineWidth = 2; c.stroke(); });
  c.restore();
};

// ---------- 玉玺（「天子羡思慈亲」；白玉＋朱文＋微光）----------
Z.dhJadeSeal = (c, x, y, s, t, o = {}) => {
  const { a = 1, glow = 1, seed = 91 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a); c.translate(0, Math.sin(t * 1.1) * 4);
  if (glow) { const g = c.createRadialGradient(0, 20, 8, 0, 20, 170); g.addColorStop(0, `rgba(240,246,238,${.5 + .2 * Math.sin(t * 2)})`); g.addColorStop(1, 'rgba(226,240,232,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 20, 170, 0, Math.PI * 2); c.fill(); }
  F(c, new Path2D('M-22 0 Q-30 -34 0 -46 Q30 -34 22 0 Z'), 'rgba(206,222,214,.94)', 2.4);
  F(c, new Path2D('M-46 0 L46 0 L42 54 L-42 54 Z'), 'rgba(214,228,220,.95)', 3);
  c.strokeStyle = C.red; c.lineWidth = 3; c.beginPath(); c.moveTo(-30, 22); c.lineTo(30, 22); c.moveTo(-30, 40); c.lineTo(30, 40); c.stroke();
  c.restore();
};

// ---------- 寝庙（台基＋重檐＋香烟上升）----------
Z.dhShrine = (c, x, y, s, t, o = {}) => {
  const { a = 1, incense = 1, seed = 101 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  F(c, new Path2D('M-300 0 L-280 -60 L280 -60 L300 0 Z'), '#b0563c', 3.2);
  F(c, new Path2D('M-240 -60 L-240 -340 L240 -340 L240 -60 Z'), '#a5452f', 3.4);
  [[-300, -340, 600, 90], [-260, -430, 520, 80]].forEach(([px, py, ww, hh], k) => { F(c, new Path2D(`M${px} ${py} Q${px + ww / 2} ${py - hh} ${px + ww} ${py} L${px + ww - 30} ${py + 22} L${px + 30} ${py + 22} Z`), k ? C.blue2 : C.green, 2.6); });
  F(c, new Path2D('M-70 -60 L-70 -300 L70 -300 L70 -60 Z'), C.ink, 0);
  F(c, new Path2D('M-90 -336 L90 -336 L90 -296 L-90 -296 Z'), C.gold, 2.4);
  if (incense) { for (let k = 0; k < 3; k++) { const ph = (t * .3 + k / 3) % 1; c.globalAlpha = clamp(a) * Math.sin(Math.PI * ph) * .4;
    brush(c, [[-20 + k * 20, -70], [-20 + k * 20 + Math.sin(t * 1.7 + k) * 30, -70 - ph * 240], [-20 + k * 20 - Math.sin(t * 1.3 + k) * 34, -70 - ph * 420]], { w: 18, tone: .14, dry: .9, seed: 2901 + k, tail: .7, col: [200, 190, 178] }); } }
  c.restore();
};

// ---------- 诏书卷帛（使者所持；素帛＋朱题）----------
Z.dhScroll = (c, x, y, s, t, o = {}) => {
  const { a = 1 } = o;
  if (a <= 0) return;
  c.save(); c.globalAlpha = clamp(a); c.translate(x, y); c.scale(s, s); c.rotate(-0.5 + Math.sin(t * 1.8) * .06);
  c.fillStyle = C.white; c.beginPath(); c.moveTo(0, 0); c.lineTo(54, -8); c.lineTo(50, -150); c.lineTo(-4, -142); c.closePath(); c.fill(); c.strokeStyle = C.line; c.lineWidth = 2.4; c.stroke();
  c.strokeStyle = C.red; c.lineWidth = 6; c.beginPath(); c.moveTo(6, -20); c.lineTo(48, -26); c.stroke();
  c.restore();
};

})();
