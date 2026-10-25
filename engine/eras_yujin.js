// 《于禁》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·于禁传》：泰山钜平人，黄巾起附鲍信 → 建安二年宛城之乱「在乱能整」，太祖称古名将 →
// 官渡延津焚绍别营三十余屯 → 昌豨降，禁以法斩之「豨虽旧友，禁可失节乎」→ 二一九年汉水泛溢七军俱没，遂降 →
// 囚于江陵、系之于吴 → 二二〇年归魏，拜安远将军 → 二二一年谒高陵，见陵屋降服之画，惭恚发病薨。
// 视觉主线（与赵云/马超/典韦/黄忠/姜维区分）：毅重——立姿永远端方（呼吸幅度减半）+ 大水漫营 + 陵屋壁画。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/y_common.js'];   // 复用同一套水墨笔法 + 于禁专属
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
  { id: 'y1_juping', dur: 3.0,
    counter: col('泰山钜平', '约一八四年') },

  { id: 'y2_luannengzheng', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('在乱能整', '一九七年') },

  { id: 'y3_raotun', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('焚屯三十', '二〇〇年') },

  { id: 'y4_buwang', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('法不可枉', '二〇六年') },

  { id: 'y5_qijun', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('七军俱没', '二一九年') },

  { id: 'y6_jiangling', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('南囚江陵', '二一九—二二〇') },

  { id: 'y7_beigui', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('北归故国', '二二〇年') },

  { id: 'y8_lingwu', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('陵屋见画', '二二一年') },
];
