// 《张昭》段落表：八幕生平，纯代码水墨。
// 依《三国志·吴书·张昭传》：彭城人，少好学善隶书，弱冠察孝廉不就 → 汉末南渡江 →
// 孙策创业命为长史、抚军中郎将，升堂拜母如比肩之旧 → 策临亡以弟权托昭，昭率群僚立而辅之 →
// 权悲感未视事，昭谓「为人后者贵能负荷先轨」，身自扶权上马 → 权每田猎，昭变色谏 →
// 魏使邢贞入门不下车，昭谓「君敢自尊大，岂以江南寡弱」，贞遽下车 → 武昌钓台酗酒，昭正色不言而出 →
// 公孙渊称藩，权按刀怒，昭涕泣，权掷刀对泣 → 昭称疾不朝，权土塞其门，昭又内封之 →
// 容貌矜严有威风，年八十一卒，遗令幅巾素棺，谥文侯。
// 视觉主线：江东老仲父 —— 深青宽袍＋纶巾＋手板（朝板），以言语为兵器。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/zhangzhao.js'];
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
  { id: 'zz1_pengcheng', dur: 3.0,
    counter: col('弱冠不就', '汉末') },

  { id: 'zz2_nandu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('南渡江', '汉末') },

  { id: 'zz3_tuogu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('身自扶权上马', '二〇〇年') },

  { id: 'zz4_jianlie', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('变色谏猎', '二〇〇年代') },

  { id: 'zz5_diaotai', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('糟丘酒池', '二二二年') },

  { id: 'zz6_andao', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('按刀对泣', '二三七年') },

  { id: 'zz7_fengmen', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('内外封土', '二三七年') },

  { id: 'zz8_suguan', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('幅巾素棺', '享年八十一') },
];