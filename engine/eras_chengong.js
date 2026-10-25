// 《陈宫》段落表：八幕生平，纯代码水墨。
// 年表依《三国志》及裴注：东郡人，太祖过中牟，宫见而义之，夜释之弃官相从 → 说邈迎操领兖州 →
// 兴平元年与张邈叛操迎吕布，据濮阳，火几毙操 → 佐布数谏（「曹操远来，势不能久」），布妻言而布不听 →
// 建安三年操围下邳，决泗沂之水灌城 → 城破，白门楼上宫指布曰「但坐此人」→ 「请出就戮，以明军法」，操泣送，宫不还顾 →
// 宫死，操养其母终身、嫁其女；世称「刚直壮烈」。
// 视觉主线（与荀彧的文臣、姜维的儒将区分）：束发高巾 + 大氅佩剑的带兵谋士 + 白门楼 + 残阳 + 不还顾的背影。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/c_common.js'];   // w_common 只用 Z.leader（曹操）
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
  { id: 'c1_zhongmu', dur: 3.0,
    counter: col('捉放曹', '约一八九年') },

  { id: 'c2_mingshi', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('命世之才', '一九二年') },

  { id: 'c3_puyang', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('濮阳火起', '一九四年') },

  { id: 'c4_xiance', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('画策下邳', '一九八年') },

  { id: 'c5_guancheng', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('决水灌城', '一九八年') },

  { id: 'c6_danzuo', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('但坐此人', '一九八年') },

  { id: 'c7_buhuangu', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('不还顾', '一九八年') },

  { id: 'c8_shenhou', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('刚直壮烈', '养其母嫁其女') },
];
