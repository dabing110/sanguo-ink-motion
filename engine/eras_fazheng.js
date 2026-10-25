// 《法正》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·法正传》：右扶风郿人，字孝直 → 建安初入蜀依刘璋，为新都令、军议校尉 →
// 张松谋迎刘备，正为谋主，衔命迎先主 → 内外相助取益州，赐爵关内侯，后为蜀郡太守 →
// 建安二十四年，献定军山之策，渊军大败、斩夏侯渊，先主为汉中王，以正为尚书令、护军将军 →
// 章武元年卒，谥曰翼侯（刘备谋主，奇谋善断；夷陵之败，诸葛亮叹「法孝直若在，则能制主上」）。
// 视觉主线（与许靖/田丰/荀彧区分）：清癯深墨青谋臣袍＋小冠＋羽扇（谋臣，不是名士麈尾、不是武将举刀）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/fazheng_common.js'];
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
  { id: 'faz1_meiyang', dur: 3.0,
    counter: col('郿县法正', '约一九〇年') },

  { id: 'faz2_yingbei', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('迎奉先主', '二一一年') },

  { id: 'faz3_chengdu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('定蜀', '二一四年') },

  { id: 'faz4_hanzhong', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('定军奇谋', '二一九年') },

  { id: 'faz5_shangshu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('尚书令', '二一九年') },

  { id: 'faz6_yili', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('夷陵之叹', '二二二年') },

  { id: 'faz7_yihou', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('翼侯', '二二〇年') },

  { id: 'faz8_mouzhu', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('谋主孝直', '身后') },
];
