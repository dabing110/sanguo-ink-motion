// 《典韦》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·典韦传》：陈留己吾人，形貌魁梧、膂力过人 → 逐虎过涧为夏侯惇所见，荐于太祖 →
// 帐下壮士有典君，提一双戟八十斤 → 一九四年濮阳先登，手持十余戟所抵无不应手倒 →
// 一九七年宛城夜变，双戟先失 → 战于门中，贼不得入 → 创重发，瞋目大骂而死 → 太祖为流涕，亲自临哭，遣归葬襄邑。
// 视觉主线（与赵云、马超、黄忠区分）：全片步战不骑马 + 双铁戟（不是单枪、不是弓、不是银甲白袍）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js'];   // 复用同一套水墨笔法 + 典韦专属
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
  { id: 'w1_jiwu', dur: 3.0,
    counter: col('陈留己吾', '约一七〇年') },

  { id: 'w2_zhuhu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('逐虎过涧', '初平中') },

  { id: 'w3_zhangxia', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('帐下壮士', '一双戟八十斤') },

  { id: 'w4_puyang', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('濮阳先登', '一九四年') },

  { id: 'w5_wancheng', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('宛城夜变', '一九七年') },

  { id: 'w6_yuanmen', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('独守辕门', '一九七年') },

  { id: 'w7_dama', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('瞋目大骂', '一九七年') },

  { id: 'w8_kuiji', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('哭祭归葬', '归葬襄邑') },
];
