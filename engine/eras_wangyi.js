// 《王异》段落表：八幕守城女将，纯代码水墨，时长约 30 秒。
// 系列定位：**女性线第二人**（辛宪英→王异→蔡文姬→甄宓）。
// 与辛宪英刻意做反差：辛是「堂上判断」，王是「城上行动」——
//   辛宪英＝素青深衣＋峨髻金簪＋竹简（静）；王异＝灰褐战裙＋布韝臂鞲＋束发＋短刀（动）。
//   两人都用布帛写意，不画明光铠（水墨画不了铁片，也不好看）。
// 视觉主线：西城之难 → 冀城之围 → 祁山之守。全片不画血腥：两男之死只画倒影与空甲，
//   「质其子月于南郑」只画一纸质押文书与远去的骑影，绝不画亲子受害。
// 史实：全出《三国志·魏书·卷二十五·杨阜传》裴松之注引皇甫谧《列女传》，无一处虚构——
//   ① 梁双反，攻破西城，害异两男；女英年六岁 ② 引刀欲自刎，顾英叹「身死尔弃，当谁恃哉」
//   ③ 以溷粪涅麻而被之，尠食瘠形，自春至冬 → 竟以是免难
//   ④ 建安中马超攻冀，「异躬著布韝，佐昂守备」⑤「又悉脱所佩环、黼黻以赏战士」
//   ⑥ 韦康欲与超和，昂谏不听 → 异曰「当共勉卒高勋，全节致死，不可从也」
//   ⑦ 昂与杨阜结谋讨超，问「当奈月何」→ 异厉声「忠义立于身，雪君父之大耻，丧元不足为重，况一子哉」
//   ⑧ 闭门逐超；保祁山为超所围三十日，救兵到乃解；超卒杀异子月
//   ⑨ 本传定评：「凡自冀城之难，至于祁山，昂出九奇，异辄参焉」
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → wy_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/wy_common.js'];
window.COUNTER_IN_TRANSITION = 'cut';
window.PUNCH = 0.02;

const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 46, gap: 52, subSize: 22 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'wy1_liangshuang', dur: 4.0,
    counter: col('梁双反', '攻破西城') },

  { id: 'wy2_guying', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('引刀欲刎', '身死尔弃') },

  { id: 'wy3_hunma', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('粪麻被之', '自春至冬') },

  { id: 'wy4_shouji', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('马超攻冀', '躬著布韝') },

  { id: 'wy5_shangshi', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('悉脱环佩', '以赏战士') },

  { id: 'wy6_buke', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('韦康欲和', '不可从也') },

  { id: 'wy7_shezi', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('丧元不足为重', '况一子哉') },

  { id: 'wy8_jiuqi', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('祁山三十日', '昂出九奇') },
];
