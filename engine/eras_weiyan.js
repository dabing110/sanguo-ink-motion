// 《魏延》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·魏延传》：义阳人，以部曲随先主入蜀 → 数有战功 → 先主取汉中，拔延为太守、镇北拒曹 →
// 诸葛亮北伐，延每请兵万人与亮异道会潼关（子午谷奇谋），亮制而不许 → 迁前军师征西大将军，假节，封南郑侯 →
// 亮卒，延与杨仪争权，为马岱所斩，夷三族。
// 视觉主线（与赵云/马超区分）：深青战袍＋长柄大刀＋汉中城垣（不是淡墨袍、不是银甲、不是弓、不是西凉风沙）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/weiyan_common.js'];   // 复用同一套水墨笔法 + 共享母题 + 魏延专属
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
  { id: 'weiy1_yiyang', dur: 3.0,
    counter: col('义阳魏延', '约二〇九年') },

  { id: 'weiy2_rushu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('入蜀建功', '二一四年') },

  { id: 'weiy3_hanzhong', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('独镇汉中', '二一九年') },

  { id: 'weiy4_zimu', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('子午奇谋', '二二八年') },

  { id: 'weiy5_qishan', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('祁山鏖兵', '二三一年') },

  { id: 'weiy6_qianjun', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('前军师', '二三四年') },

  { id: 'weiy7_bingbian', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('亮卒惊变', '二三四年') },

  { id: 'weiy8_nanzheng', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('南郑侯', '二三四年') },
];
