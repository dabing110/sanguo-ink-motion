// 《辛宪英》段落表：八幕女谋士，纯代码水墨，时长约 30 秒。
// 系列定位：**女性线第一人**（辛宪英→王异→蔡文姬→甄宓），接续奇人异士线（左慈→于吉→管辂→华佗）。
// 视觉主线：全系列第一个「不靠兵器也不靠幻术」的人物——以「判断」为骨。
//   她的戏全在堂上、城下、灯前：没有人冲锋，没有人施法，只有一句话说在点子上。
//   所以画面走「静」：深衣素色、峨髻金簪、竹简、灯烛、城门、军旅远去，全部写意不写实。
// 形象：素青深衣 + 峨髻金簪 + 袖手/持竹简，端方沉静（与管辂粗丑、华佗长须、左慈眇跛完全不同）。
// 史实：八幕 **全出《晋书·卷九十六·列女传·羊耽妻辛氏》**，无一处虚构——
//   ① 聪朗有才鉴 ② 曹丕得立抱辛毗项问喜 → 「宜戚而喜，何以能久！魏其不昌乎」
//   ③ 高平陵之变（249）太傅闭城门，弟辛敞惧而问姊 ④ 「安可以不出！职守，人之大义也」
//   ⑤ 敞遂出，事后叹「吾不谋于姊，几不获于义」 ⑥ 钟会为镇西将军（263）→「吾畏其有他志也」
//   ⑦ 诫子羊琇「军旅之间可以济者，其惟仁恕乎」 ⑧ 会至蜀果反，琇竟以全归；锦被嫌华，反而覆之
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → xn_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/xn_common.js'];
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
  { id: 'xn1_caijian', dur: 4.0,
    counter: col('陇西辛氏', '聪朗有才鉴') },

  { id: 'xn2_lisi', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('魏文得立', '魏其不昌乎') },

  { id: 'xn3_bimen', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('高平陵变', '太傅闭城门') },

  { id: 'xn4_zhishou', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('职守大义', '安可以不出') },

  { id: 'xn5_bumou', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('敞遂出', '不谋于姊') },

  { id: 'xn6_xichu', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('钟会西出', '吾畏其有他志') },

  { id: 'xn7_renshu', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('诫子从军', '其惟仁恕') },

  { id: 'xn8_mingjian', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('琇竟全归', '明鉴俭约') },
];
