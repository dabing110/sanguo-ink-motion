// 《老将黄忠》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·黄忠传》：刘表以为中郎将、与刘磐共守长沙 → 操克荆州仍复故任 → 随先主常为先锋 →
// 定军山斩夏侯渊 → 先主为汉中王拜后将军 → 勇冠三军、老而益壮 → 卒，追谥刚侯。
window.SCENE_LIBS = ['scenes/h_common.js'];        // 黄忠专属笔法库（白发白须、硬弓、弯弓）
window.COUNTER_IN_TRANSITION = 'cut';              // 榜题版式统一，转场中点硬切，不叠字
window.PUNCH = 0.02;                               // 拍点轻冲

// 榜题：右上角竖排题跋（事件名＋年份小字）
const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);                  // 入幕 0.28s 内淡入
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 50, gap: 58, subSize: 24 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'h1_nanyang', dur: 3.0,
    counter: col('南阳汉升', '约一九〇年') },

  { id: 'h2_changsha', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('长沙守信', '二〇五年') },

  { id: 'h3_jingzhou', dur: 2.8, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('荆州归曹', '二〇八年') },

  { id: 'h4_xianfeng', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('常为先锋', '二一四年') },

  { id: 'h5_dingjun', dur: 3.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('定军山', '二一九年') },

  { id: 'h6_houjiang', dur: 2.8, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('后将军', '二一九年') },

  { id: 'h7_yongguan', dur: 3.2, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('勇冠三军', '老而益壮') },

  { id: 'h8_ganghou', dur: 3.4, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('刚侯', '二二〇年') },
];
