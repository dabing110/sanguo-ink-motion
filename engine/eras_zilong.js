// 《常山赵子龙》段落表：八幕生平，纯代码水墨。
// 时长按口播节奏给 dur（秒）；转场取下一幕最有辨识度的形式元素（墨洇、红旗楔、水波、涟漪、青绿扫、洒金、光圈）。
window.SCENE_LIBS = ['scenes/z_common.js'];          // 共用笔法库（index.js 先加载）
window.COUNTER_IN_TRANSITION = 'cut';                 // 榜题版式统一，转场中点硬切，不叠字
window.PUNCH = 0.02;                                  // 拍点轻冲

// 榜题：右上角竖排题跋（事件名＋年份小字）
const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);                     // 入幕 0.28s 内淡入
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 50, gap: 58, subSize: 24 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'z1_changshan', dur: 3.2,
    counter: col('常山真定', '约一九一年') },

  { id: 'z2_panhe', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('磐河突围', '一九一年') },

  { id: 'z3_changban', dur: 3.8, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('长坂坡', '二〇八年') },

  { id: 'z4_duodou', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('截江夺斗', '二一一年') },

  { id: 'z5_hanshui', dur: 3.0, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('汉水空营', '二一九年') },

  { id: 'z6_jigu', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('箕谷敛众', '二二八年') },

  { id: 'z7_dan', dur: 2.8, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('一身是胆', '二一九年') },

  { id: 'z8_end', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('顺平侯', '二二九年') },
];
