// 《许靖》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·许靖传》：汝南平舆人，与从弟许劭俱知名、好共核论乡党人物 → 董卓乱，周旋州郡、避难交州 →
// 刘璋时为蜀郡太守 → 刘备围成都，靖欲逾城出降，刘备初不悦，法正劝「靖名重天下，宜加敬」→ 克成都，以为左将军长史 →
// 刘备称帝，拜司徒 → 章武二年卒（名士，与许劭齐名）。
// 视觉主线（与田丰/荀彧区分）：清癯浅青名士袍＋高冠＋白须＋麈尾（清谈名士，不是武将、不是深甲）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/xujing_common.js'];
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
  { id: 'xuj1_runan', dur: 3.0,
    counter: col('汝南许靖', '约一八五年') },

  { id: 'xuj2_binan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('避难交州', '约一九〇年') },

  { id: 'xuj3_rushu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('入蜀', '约一九四年') },

  { id: 'xuj4_yucheng', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('逾城', '二一四年') },

  { id: 'xuj5_fazheng', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('法正之言', '二一四年') },

  { id: 'xuj6_zuojun', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('左将军长史', '二一四年') },

  { id: 'xuj7_situ', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('司徒', '二二一年') },

  { id: 'xuj8_xiu', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('文休', '二二二年') },
];
