// 《诸葛亮》段落表：八幕，纯代码水墨。
// 依《三国志·诸葛亮传》：琅琊人，字孔明，躬耕陇亩 → 三顾隆中对 → 赤壁借风 → 白帝受遗诏 →
// 五月渡泸平南中 → 六出祁山 → 五丈原星落。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/zhugeliang.js'];
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
  { id: 'zg1_longzhong', dur: 3.0,
    counter: col('隆中高卧', '约二〇七年') },

  { id: 'zg2_sangu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('三顾出山', '二〇七年') },

  { id: 'zg3_chibi', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('赤壁借风', '二〇八年') },

  { id: 'zg4_tuogu', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('白帝托孤', '二二三年') },

  { id: 'zg5_lu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('五月渡泸', '二二五年') },

  { id: 'zg6_qishan', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('六出祁山', '二二八—二三四') },

  { id: 'zg7_wuzhang', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('五丈原', '二三四年') },

  { id: 'zg8_xingluo', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('星落秋风', '二三四年') },
];
