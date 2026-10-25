// 《周瑜》段落表：八幕，纯代码水墨。
// 依《三国志·周瑜传》：庐江人，字公瑾，与孙策同年相友善 → 佐定江东 → 赤壁火攻破曹 →
// 攻南郡中流矢 → 荆州之争 → 既生瑜何生亮 → 巴丘病卒，年三十六。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/zhouyu.js'];
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
  { id: 'zy1_lujiang', dur: 3.0,
    counter: col('庐江少年', '约一九〇年') },

  { id: 'zy2_sunce', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('辅佐孙策', '一九五年') },

  { id: 'zy3_chibi', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('赤壁火攻', '二〇八年') },

  { id: 'zy4_nanjun', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('南郡中箭', '二〇九年') },

  { id: 'zy5_jingzhou', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('借荆州', '二一〇年') },

  { id: 'zy6_jisheng', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('既生瑜何生亮', '二一〇年') },

  { id: 'zy7_baqiu', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('巴丘病卒', '二一〇年') },

  { id: 'zy8_fengliu', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('儒将风流', '身后') },
];
