// 《太史慈》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·太史慈传》《吴历》：东莱黄人，为郡奏曹史，以计坏州章 → 北海突围求援，请兵于刘备 →
// 猿臂善射、弦不虚发 → 一九五年神亭酣战，与孙策互易手戟与兜鍪 → 归孙，策曰「今日之事，当与卿共之」→
// 拜折冲中郎将，后为建昌都尉，委以南方之事 → 二〇六年临终叹「丈夫生世，当带三尺之剑」→ 权甚悼惜之。
// 视觉主线（与赵云/马超/典韦/姜维区分）：**美须髯 + 猿臂 + 单手长戟**（弓是第二母题，主兵器是戟）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/t_common.js'];  // 水墨笔法 + 夜火/坟冢/主公 + 太史慈专属
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
  { id: 't1_donglai', dur: 3.0,
    counter: col('东莱奏曹', '中平中') },

  { id: 't2_beihai', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('北海求援', '约一九三年') },

  { id: 't3_yuanbi', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('猿臂善射', '弦不虚发') },

  { id: 't4_shenting', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('神亭酣战', '一九五年') },

  { id: 't5_guisun', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('归孙', '一九六年') },

  { id: 't6_jianchang', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('建昌都尉', '二〇〇年') },

  { id: 't7_linzhong', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('临终之叹', '二〇六年') },

  { id: 't8_ziyi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('权甚悼惜', '二〇六年') },
];
