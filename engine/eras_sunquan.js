// 《孙权》段落表：八幕，纯代码水墨。
// 依《三国志·吴主传》：吴郡富春人，字仲谋，兄策遇刺后继领江东 → 赤壁决断 → 濡须坞 →
// 合肥之败 → 武昌称帝 → 二宫之争 → 晚年昏聩，前后五十二年。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/sunquan.js'];
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
  { id: 'sq1_xiongzhong', dur: 3.0,
    counter: col('兄终弟及', '二〇〇年') },

  { id: 'sq2_chibi', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('赤壁决断', '二〇八年') },

  { id: 'sq3_ruxu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('濡须坞', '二一三年') },

  { id: 'sq4_hefei', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('合肥十万', '二一五年') },

  { id: 'sq5_chengdi', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('武昌称帝', '二二九年') },

  { id: 'sq6_ergong', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('二宫之争', '二四二年') },

  { id: 'sq7_wannian', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('晚年昏聩', '二五〇年') },

  { id: 'sq8_jiangdong', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('江东之主', '二五二年') },
];
