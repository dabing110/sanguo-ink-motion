// 《锦马超》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·马超传》：马腾子、羌胡畏服 → 二一一年与韩遂等据潼关反曹 → 渭南突击几获曹公 →
// 离间计破、走保诸戎 → 二一四年自汉中来奔，兵至城下而璋稽首 → 二一九年拜骠骑将军领凉州牧 → 二二二年卒，谥威侯。
// 视觉主线（与赵云、黄忠区分）：银甲白袍 + 长枪 + 成阵列的西凉铁骑 + 黄沙（不是单骑、不是弓）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/m_common.js'];   // 复用同一套水墨笔法 + 马超专属
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
  { id: 'm1_fufeng', dur: 3.0,
    counter: col('扶风孟起', '约一九〇年') },

  { id: 'm2_tongguan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('潼关举兵', '二一一年') },

  { id: 'm3_weinan', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('渭南突击', '二一一年') },

  { id: 'm4_maoer', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('曹公之叹', '二一一年') },

  { id: 'm5_lixian', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('离间西走', '二一二年') },

  { id: 'm6_chengdu', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('引兵归刘', '二一四年') },

  { id: 'm7_piaoji', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('骠骑将军', '二一九年') },

  { id: 'm8_weihou', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('威侯', '二二二年') },
];
