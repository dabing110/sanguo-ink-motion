// 《陈宫》专属笔法库：刚直谋士、白门楼、残阳、不还顾。
// 依赖 h_common.js。陈宫的辨识要素（与荀彧的文官、姜维的儒将都区分）：
// ① 束发高巾 + 大氅 + 佩剑——带兵的谋士，不是坐衙的文官
// ② 白门楼（他生命终点的建筑，全片反复出现）③ 残阳（血色黄昏收束全片）④ 背对不还顾的身法
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 陈宫：公台（o: { t, raise, stance, flip, sword(按剑), back(背对), bound(被缚) }） ----------
Z.chenGong = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, stance = 0, flip = 0, sword = 0, back = 0, bound = 0 } = o;
  const br = Math.sin(t * 1.6) * 0.014;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  c.translate(0, Math.sin(stance * 2) * 3.5);
  const hem = Math.sin(t * 1.7) * 5;
  if (back) {
    // 背对：只见氅背与巾后（不还顾的身法）
    c.fillStyle = 'rgba(92,84,72,.62)';
    c.beginPath();
    c.moveTo(-30, -160); c.quadraticCurveTo(-56, -80, -58 + hem, -6);
    c.quadraticCurveTo(0, 2, 58 + hem * 0.6, -6); c.quadraticCurveTo(56, -82, 30, -160);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,24,20,.9)'; c.lineWidth = 3.2; c.stroke();
    // 中缝与巾后
    c.strokeStyle = 'rgba(28,24,20,.7)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, -160); c.lineTo(0, -10); c.stroke();
    c.fillStyle = 'rgba(34,32,30,.95)'; c.beginPath(); c.ellipse(0, -186, 15, 12, 0, 0, Math.PI * 2); c.fill();
  } else {
    // 腿
    const step = Math.sin(stance * 2) * 3.5;
    brush(c, [[-16, -74], [-26 + step, -34], [-32 + step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 801, head: 0.06, tail: 0.2 });
    brush(c, [[16, -74], [26 - step, -34], [32 - step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 802, head: 0.06, tail: 0.2 });
    // 深衣袍身
    c.fillStyle = 'rgba(198,188,168,.72)';
    c.beginPath();
    c.moveTo(-30, -166); c.quadraticCurveTo(-52, -84, -54 + hem, -6);
    c.quadraticCurveTo(0, 2 + hem * 0.3, 54 + hem * 0.6, -6); c.quadraticCurveTo(52, -86, 30, -166);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,26,22,.9)'; c.lineWidth = 3; c.stroke();
    // 束腰 + 佩剑（带兵的谋士）
    c.fillStyle = 'rgba(72,58,40,.9)'; c.fillRect(-36, -122, 72, 12);
    // 大氅领（肩部披领）
    c.fillStyle = 'rgba(104,84,58,.55)';
    c.beginPath(); c.moveTo(-38, -162); c.quadraticCurveTo(0, -144, 38, -162); c.quadraticCurveTo(30, -138, 0, -132); c.quadraticCurveTo(-30, -138, -38, -162); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(44,34,24,.75)'; c.lineWidth = 2; c.stroke();
    // 双臂（bound 时反剪）
    const rl = ease.out(clamp(raise));
    if (bound) {
      brush(c, [[-28, -150], [-52, -110], [-40, -86]], { w: 14, tone: 0.6, dry: 0.45, seed: 803 });
      brush(c, [[28, -150], [52, -110], [40, -86]], { w: 14, tone: 0.6, dry: 0.45, seed: 804 });
    } else {
      brush(c, [[-28, -150], [-56 - 6 * rl, -138 - 16 * rl], [-80 - 10 * rl, -120 - 34 * rl]], { w: 15, tone: 0.6, dry: 0.45, seed: 803, head: 0.1, tail: 0.2 });
      brush(c, [[28, -150], [56 + 6 * rl, -138 - 16 * rl], [80 + 10 * rl, -120 - 34 * rl]], { w: 15, tone: 0.6, dry: 0.45, seed: 804, head: 0.1, tail: 0.2 });
    }
    // 头 + 束发高巾（顶有高髻式巾角）
    c.save(); c.translate(2, -190);
    c.fillStyle = 'rgba(246,238,220,.96)';
    c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(36,32,30,.95)';
    c.beginPath();
    c.moveTo(-18, -8); c.quadraticCurveTo(-12, -26, 0, -28); c.quadraticCurveTo(16, -26, 19, -8);
    c.quadraticCurveTo(8, -14, -12, -6); c.closePath(); c.fill();
    // 巾角（高起 + 随风小摆）
    const sw = Math.sin(t * 2.1) * 4;
    c.beginPath(); c.moveTo(4, -24); c.quadraticCurveTo(16 + sw, -46, 26 + sw, -38); c.quadraticCurveTo(14 + sw * 0.5, -30, 8, -22); c.closePath(); c.fill();
    // 目（忠直：眉头微蹙）
    c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -2, 5.2, 3.8, -0.08, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -2, 2.3, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(24,20,16,.7)'; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(2, -9); c.lineTo(12, -8); c.stroke();
    // 须（中年短须，硬直）
    const wf = Math.sin(t * 1.7) * 3;
    c.strokeStyle = 'rgba(40,36,32,.88)'; c.lineWidth = 2.8; c.lineCap = 'round';
    [[-7, 8, -10, 24], [0, 10, 0, 28], [7, 8, 11, 23]].forEach(([x1, y1, x2, y2], k) => {
      c.beginPath(); c.moveTo(x1, y1);
      c.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + 3, x2 + wf * (0.25 + k * 0.15), y2 + wf * 0.2);
      c.stroke();
    });
    c.restore();
  }
  c.restore();
  const sx = flip ? -1 : 1;
  if (sword && !bound) {                                    // 佩剑悬腰（不拄地）
    c.save(); c.translate(x + 46 * s * sx, y - 112 * s); c.rotate(0.5 * sx);
    c.fillStyle = 'rgba(84,64,40,.9)'; c.fillRect(-5, -14, 10, 88);
    c.strokeStyle = 'rgba(40,32,24,.85)'; c.lineWidth = 2; c.strokeRect(-5, -14, 10, 88);
    c.restore();
  }
};

// ---------- 白门楼（下邳城楼：白墙 + 黑柱 + 重檐，「白门」即白马西门） ----------
Z.baiMenLou = (c, x, y, s, t, o = {}) => {
  const { tone = 0.78, seed = 41 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 城台（白灰）
  c.fillStyle = 'rgba(226,220,204,.82)';
  c.fillRect(-260, -220, 520, 220);
  c.strokeStyle = 'rgba(60,52,40,.88)'; c.lineWidth = 3.4; c.strokeRect(-260, -220, 520, 220);
  // 门洞
  c.fillStyle = 'rgba(70,60,48,.9)';
  c.beginPath(); c.moveTo(-70, 0); c.lineTo(-70, -120); c.quadraticCurveTo(0, -160, 70, -120); c.lineTo(70, 0); c.closePath(); c.fill();
  // 城楼（重檐）
  c.fillStyle = 'rgba(178,148,100,.82)';
  c.fillRect(-200, -320, 400, 100);
  c.strokeStyle = 'rgba(52,42,32,.9)'; c.lineWidth = 3; c.strokeRect(-200, -320, 400, 100);
  [[-160, -220], [-60, -220], [60, -220], [160, -220]].forEach(([px], k) => {
    brush(c, [[px, -220], [px + 1, -322]], { w: 12, tone: tone * 0.9, dry: 0.4, seed: seed + k });
  });
  c.fillStyle = 'rgba(150,116,74,.82)';
  c.beginPath(); c.moveTo(-250, -322); c.quadraticCurveTo(0, -392, 250, -322); c.lineTo(196, -314); c.lineTo(-196, -314); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,38,28,.88)'; c.lineWidth = 3; c.stroke();
  // 匾
  c.fillStyle = 'rgba(160,124,76,.86)'; c.fillRect(-70, -300, 140, 40);
  c.strokeStyle = 'rgba(52,40,28,.88)'; c.lineWidth = 2.4; c.strokeRect(-70, -300, 140, 40);
  c.font = '28px "LXGWWenKai-500"'; c.fillStyle = 'rgba(40,32,24,.9)'; c.textAlign = 'center';
  c.fillText('白门', 0, -272);
  c.restore();
};

// ---------- 残阳（低垂的赤日：全片黄昏母题） ----------
Z.canYang = (c, x, y, r, t, o = {}) => {
  const { alpha = 0.5 } = o;
  c.save(); c.globalAlpha = alpha;
  const g = c.createRadialGradient(x, y, r * 0.2, x, y, r * 2.6);
  g.addColorStop(0, 'rgba(196,84,52,.6)');
  g.addColorStop(0.45, 'rgba(196,84,52,.22)');
  g.addColorStop(1, 'rgba(196,84,52,0)');
  c.fillStyle = g;
  c.beginPath(); c.arc(x, y + Math.sin(t * 0.5) * 3, r * 2.6, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(178,62,40,.8)';
  c.beginPath(); c.arc(x, y + Math.sin(t * 0.5) * 3, r, 0, Math.PI * 2); c.fill();
  c.restore();
};

// ---------- 被缚者（跪地反剪：白门楼阶下用） ----------
Z.fuZhe = (c, x, y, s, t, o = {}) => {
  const { tone = 'rgba(96,88,76,.68)', seed = 90 } = o;
  const sway = Math.sin(t * 1.3 + seed) * 0.02;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(sway);
  brush(c, [[-40, -4], [-8, -26], [36, -10]], { w: 18, tone: 0.8, dry: 0.5, seed: seed + 1, head: 0.1, tail: 0.3 });
  brush(c, [[-40, -4], [38, -6]], { w: 14, tone: 0.8, dry: 0.6, seed: seed + 2, tail: 0.4 });
  c.fillStyle = tone;
  c.beginPath(); c.moveTo(-28, -22); c.lineTo(-22, -100); c.quadraticCurveTo(0, -112, 24, -98); c.lineTo(30, -22); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 3; c.stroke();
  // 反剪双臂
  brush(c, [[24, -88], [44, -56], [36, -28]], { w: 12, tone: 0.66, dry: 0.5, seed: seed + 3 });
  brush(c, [[-24, -88], [-44, -56], [-36, -28]], { w: 12, tone: 0.66, dry: 0.5, seed: seed + 4 });
  // 低首
  c.fillStyle = 'rgba(240,232,214,.94)';
  c.beginPath(); c.ellipse(10, -122, 15, 17, 0.5, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.86)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(60,52,44,.9)'; c.beginPath(); c.ellipse(8, -130, 16, 8, 0.4, Math.PI, 0); c.fill();
  // 缚绳（胸前一道）
  c.strokeStyle = 'rgba(140,108,64,.9)'; c.lineWidth = 4;
  c.beginPath(); c.moveTo(-26, -78); c.quadraticCurveTo(0, -66, 28, -76); c.stroke();
  c.restore();
};
})();
