// 《满宠》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·满宠传》：山阳昌邑人，字伯宁 → 初为许令，曹洪宾客犯法，宠收治不挠，太祖善之 →
// 从太祖，迁汝南太守，募兵破敌 → 与张辽、李典共守合肥，拒孙权 → 迁奋威将军，封安昌亭侯 →
// 文帝即位，为征东将军，进封南乡侯 → 明帝时表筑合肥新城，徙屯据险，屡拒吴师 → 薨，谥曰景侯。
// 视觉主线（与许褚/魏延/法正区分）：深褐硬甲＋兜鍪＋刚毅短须＋持律简（执法武将，非虎皮、非深青袍、非羽扇）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/mancong_common.js'];
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
  { id: 'man1_xuling', dur: 3.0,
    counter: col('许令执法', '约一九六年') },

  { id: 'man2_runan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('汝南太守', '约二〇八年') },

  { id: 'man3_hefei', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('合肥拒吴', '二一五年') },

  { id: 'man4_dongguan', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('奋威将军', '二一九年') },

  { id: 'man5_zhengdong', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('征东将军', '二二〇年') },

  { id: 'man6_xincheng', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('新城屯守', '二三三年') },

  { id: 'man7_jinghou', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('景侯', '二四二年') },

  { id: 'man8_zhenglue', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('魏之良将', '身后') },
];
