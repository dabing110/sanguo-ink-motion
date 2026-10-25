// 《关羽》段落表：八幕，纯代码水墨。
// 依《三国志·关羽传》：亡命奔涿 → 桃园结义 → 白马斩颜良 → 封金挂印、千里寻兄 →
// 华容道义释曹操 → 水淹七军、威震华夏 → 吕蒙袭后、败走麦城。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/guanyu.js'];
window.COUNTER_IN_TRANSITION = 'cut';
window.PUNCH = 0.02;

const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 50, gap: 58, subSize: 24 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'gy1_wangming', dur: 3.0,
    counter: col('亡命奔涿', '约一八四年') },

  { id: 'gy2_taoyuan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('桃园结义', '一八四年') },

  { id: 'gy3_baima', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('白马斩良', '二〇〇年') },

  { id: 'gy4_fengjin', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('封金挂印', '二〇〇年') },

  { id: 'gy5_qianli', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('千里独行', '二〇〇年') },

  { id: 'gy6_huarong', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('华容释曹', '二〇八年') },

  { id: 'gy7_shuiyan', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('水淹七军', '二一九年') },

  { id: 'gy8_maicheng', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('败走麦城', '二一九年') },
];
