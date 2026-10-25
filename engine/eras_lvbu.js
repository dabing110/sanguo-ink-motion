// 《吕布》段落表：八幕生平，纯代码水墨。
// 依《三国志·吕布传》：五原九原人，字奉先，骁勇号为飞将 → 杀丁原投董卓 → 虎牢关拒诸侯 →
// 王允连环计，卓诛 → 袭取徐州，反复无常 → 辕门射戟解袁刘之兵 → 白门楼被缚乞命 → 缢死枭首。
// 视觉主线：赤红战袍＋束发金冠＋双雉翎＋方天画戟（与全系列区隔，非绿袍长髯、非黑甲虎须）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/lvbu.js'];
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
  { id: 'lvb1_bingzhou', dur: 3.0,
    counter: col('并州骁将', '约一九〇年') },

  { id: 'lvb2_dingyuan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('弑丁原', '一九〇年') },

  { id: 'lvb3_hulao', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('虎牢关', '一九〇年') },

  { id: 'lvb4_dongzhuo', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('诛董卓', '一九二年') },

  { id: 'lvb5_xuzhou', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('袭徐州', '一九六年') },

  { id: 'lvb6_yuanmen', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('辕门射戟', '一九六年') },

  { id: 'lvb7_baimen', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('白门楼', '一九八年') },

  { id: 'lvb8_yisi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('飞将之殁', '一九八年') },
];
