// 《曹操》段落表：八幕，纯代码水墨。
// 依《三国志·武帝纪》：沛国谯人，字孟德 → 洛阳北部尉设五色棒 → 陈留起兵、奉天子 → 官渡破袁绍 →
// 赤壁折戟 → 潼关割须弃袍 → 进爵魏王、铜雀台 → 遗令分香卖履。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/caocao.js'];
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
  { id: 'cc1_xiaowei', dur: 3.0,
    counter: col('洛阳北部尉', '约一八四年') },

  { id: 'cc2_chenliu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('陈留起兵', '一八九九年') },

  { id: 'cc3_guandu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('官渡焚粮', '二〇〇年') },

  { id: 'cc4_chibi', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('赤壁折戟', '二〇八年') },

  { id: 'cc5_geshu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('割须弃袍', '二一一年') },

  { id: 'cc6_weiwang', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('进爵魏王', '二一六年') },

  { id: 'cc7_tongque', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('铜雀遗令', '二二〇年') },

  { id: 'cc8_nengchen', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('治世能臣', '身后') },
];
