// 《姜维》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·姜维传》：天水冀人，好郑氏学 → 二二八年祁山归亮，亮称其「忠勤时事、思虑精密」→
// 亮卒后继志北伐，号为九伐中原 → 二五五年洮西大破王经，斩首万计 → 二五六年段谷为邓艾所破，星散流离 →
// 二六二年避黄皓屯田沓中 → 二六三年剑阁拒钟会，会不能克 → 二六四年一计害三贤，乱兵杀之，剖腹胆如斗大。
// 视觉主线（与赵云/马超/典韦/黄忠区分）：纶巾儒服 + 长枪的儒将（唯一带书卷气的武人）+ 栈道祁山（北伐地理）+ 麒麟。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/j_common.js'];   // 复用同一套水墨笔法 + 姜维专属
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
  { id: 'j1_tianshui', dur: 3.0,
    counter: col('天水麒麟儿', '约二〇二年') },

  { id: 'j2_qishan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('祁山归亮', '二二八年') },

  { id: 'j3_beifa', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('继志北伐', '二三四—二六二') },

  { id: 'j4_taoxi', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('洮西大捷', '二五五年') },

  { id: 'j5_duangu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('段谷之败', '二五六年') },

  { id: 'j6_tazhong', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('沓中屯田', '二六二年') },

  { id: 'j7_jiange', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('剑阁拒敌', '二六三年') },

  { id: 'j8_sanxian', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('一计害三贤', '二六四年') },
];
