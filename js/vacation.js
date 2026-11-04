/**
 * =========================================================================
 * 🏖️ PauseWell · The Gifted Vacation Interlude (悠長假期彩蛋終端)
 * 100% Client-Side Pure JS / Zero-Asset / Web Audio Native Synthesis
 * =========================================================================
 */
(function () {
  'use strict';

  var FONT_MONO = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';

  var S = {
    billboard: 'background: #0f172a; color: #38bdf8; font-family: ' + FONT_MONO + '; font-size: 13px; font-weight: 900; padding: 8px 12px; border-left: 5px solid #38bdf8; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; display: block;',
    sub: 'background: #0f172a; color: #fbbf24; font-family: ' + FONT_MONO + '; font-size: 11px; font-weight: bold; padding: 4px 12px; border-left: 5px solid #fbbf24; border-bottom: 1px solid #1e293b; border-right: 1px solid #1e293b; display: block;',
    pianoKey: 'background: #ffffff; color: #0f172a; font-family: ' + FONT_MONO + '; font-size: 11px; font-weight: 900; padding: 3px 8px; border: 1px solid #cbd5e1; border-radius: 3px;',
    mottoBox: 'background: #f8fafc; color: #1e293b; font-family: ' + FONT_MONO + '; font-size: 11.5px; line-height: 1.6; padding: 10px 14px; border-left: 4px solid #2563eb; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; display: block; white-space: pre;',
    cmdBar: 'background: #0f172a; color: #10b981; font-family: ' + FONT_MONO + '; font-size: 11px; font-weight: bold; padding: 6px 12px; border: 1px solid #334155; border-left: 5px solid #10b981; display: block;',
    cmdKey: 'background: #2563eb; color: #ffffff; font-weight: 900; font-family: ' + FONT_MONO + '; padding: 1px 6px; border-radius: 2px;',
    cmdDesc: 'background: transparent; color: #64748b; font-family: ' + FONT_MONO + '; padding: 1px 6px;'
  };

  var quotes = [
    {
      zh: '「在甚麼都不順利的時候，就當作上天賜予的長假。安下心歇一歇，順其自然就好。」',
      en: '"When things don\'t go well, think of it as a long vacation given by God. Don\'t rush, don\'t panic, just let it flow."'
    },
    {
      zh: '「人生不需要每一秒都處於衝刺狀態。休止符並不是終點，而是下一段華彩的起音。」',
      en: '"You don\'t have to be sprinting every single moment. A rest note isn\'t an ending; it tunes the melody for the next crescendo."'
    },
    {
      zh: '「今天沒有面試邀請，不代表你沒有價值；海浪退去，只是在積蓄下一輪滿潮的力量。」',
      en: '"Silence in your inbox does not diminish your worth. When the tide recedes, it is simply gathering momentum for the next wave."'
    },
    {
      zh: '「把日程表上的空白，當作水墨畫裡的留白。給自己換口氣的權利。」',
      en: '"View the empty spaces in your calendar as intentional whitespace in a painting. Allow yourself the grace to breathe."'
    }
  ];

  // 1. 聲學心理學調校：11 秒雙和弦舒緩泛音合成器 (Fmaj9 接納 ➔ Cmaj9 釋懷著陸)
  function playGentleChord() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      var now = ctx.currentTime;

      // 總輸出通道（預留動態餘量防破音）
      var masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.85, now);
      masterGain.connect(ctx.destination);

      // 兩組交織和弦：對齊「吸氣 4 秒、慢呼 7 秒」的副交感神經節奏
      var sequence = [
        // 樂句一：Fmaj9（接納・海風吹拂，0s 至 11s）
        { f: 87.31,  delay: 0.00, dur: 11.0, gain: 0.13 }, // F2 低音基底錨點
        { f: 174.61, delay: 0.12, dur: 10.5, gain: 0.09 }, // F3 琴弦共振
        { f: 220.00, delay: 0.24, dur: 10.0, gain: 0.07 }, // A3 三音溫暖
        { f: 261.63, delay: 0.36, dur: 9.5,  gain: 0.06 }, // C4
        { f: 329.63, delay: 0.48, dur: 9.0,  gain: 0.05 }, // E4 大七度空靈
        { f: 392.00, delay: 0.60, dur: 8.5,  gain: 0.04 }, // G4 清亮九音

        // 樂句二：Cmaj9（著陸・落定釋懷，3.8s 滲入至 11.5s）
        { f: 65.41,  delay: 3.80, dur: 7.7,  gain: 0.14 }, // C2 深沉歸宿
        { f: 130.81, delay: 3.92, dur: 7.4,  gain: 0.08 }, // C3 穩定
        { f: 196.00, delay: 4.04, dur: 7.0,  gain: 0.06 }, // G3 溫厚
        { f: 246.94, delay: 4.16, dur: 6.6,  gain: 0.05 }, // B3 寧靜七音
        { f: 293.66, delay: 4.28, dur: 6.2,  gain: 0.04 }, // D4 溫柔九音
        { f: 392.00, delay: 4.40, dur: 5.8,  gain: 0.03 }  // G4 遠方迴響
      ];

      sequence.forEach(function (n) {
        var osc = ctx.createOscillator();
        var noteGain = ctx.createGain();
        var filter = ctx.createBiquadFilter();

        // 模擬真實木質鋼琴毛氈琴槌之動態濾波（高頻隨時間平滑衰減）
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, now);
        filter.frequency.exponentialRampToValueAtTime(160, now + n.delay + n.dur);

        // 正弦波基礎音色，兼具圓潤與純淨
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now);

        var startTime = now + n.delay;
        noteGain.gain.setValueAtTime(0.0001, startTime);
        // 柔和觸鍵 Attack (40ms，徹底消除數位脈衝雜音)
        noteGain.gain.linearRampToValueAtTime(n.gain, startTime + 0.04);
        // 指數衰減 Release（延續至聽覺閾值邊緣）
        noteGain.gain.exponentialRampToValueAtTime(0.00001, startTime + n.dur);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + n.dur + 0.1);
      });
    } catch (_) {
      // 容錯靜默
    }
  }

  // 2. 終端主面板輸出
  function renderVacationBanner() {
    console.log('%c[ 🏖️ PAUSEWELL · THE GIFTED VACATION // 長假心靈間奏 ]', S.billboard);
    console.log('%cDON\'T WORRY, BE HAPPY • 100% LOCAL PRIVACY • NO ALGORITHMIC RATING', S.sub);
    console.log('');
    console.log('%c 🎹 鋼琴休止符哲學 %c  %c 🌊 海浪退潮蓄能 %c  %c ☀️ 晴空日常錨點 ', S.pianoKey, '', S.pianoKey, '', S.pianoKey);
    console.log('');

    var bannerText = [
      '「當甚麼都不順利時，就當作上天賜予的長假。',
      '安下心歇一歇，決定假期結束後的自己。」',
      '----------------------------------------------------------',
      'Take it as a gifted vacation. Pause well, rest easy,',
      'and let your natural momentum return in its own time.'
    ].join('\n');

    console.log('%c' + bannerText, S.mottoBox);
    console.log('');
    console.log('%c💡 心靈沉澱指令: 輸入 vacation.help() 查看互動支持 / Type vacation.help()', S.cmdBar);
  }

  // 3. 註冊 window.vacation 交互套件
  window.vacation = Object.freeze({
    help: function () {
      console.log('%c[ 🏖️ VACATION INTERACTION SUITE // 沉澱與充能指令集 ]', S.sub);
      console.log('%cvacation.quote()%c   - 隨機提取長假心靈語錄 / Draw an encouraging reflection', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.piano()%c   - 撥響 11 秒雙和弦舒緩琴音 / Play 11s dual-chord harmonic resonance', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.breathe()%c - 啟動「4-7-8」平復焦慮呼吸節奏 / Start 4-7-8 breathing timer', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.reframe()%c - 雙語認知重塑：打破待業自責 / Bilingual cognitive reframing suite', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.cheer()%c   - 投射破曉晨曦微光特效 / Engage dawn ambient glow', S.cmdKey, S.cmdDesc);
      return '輸入上述指令以調適心神 / Type any command above to proceed.';
    },

    quote: function () {
      var item = quotes[Math.floor(Math.random() * quotes.length)];
      console.log('%c' + item.zh + '\n\n' + item.en, S.mottoBox);
      return '順其自然就好。 / Everything will be fine in the end.';
    },

    piano: function () {
      playGentleChord();
      console.log('%c🎹 [ Fmaj9 ➔ Cmaj9 Piano Resonance // 11s 悠長共鳴・安頓心神 ]', 'background:#0f172a; color:#38bdf8; font-weight:bold; padding:4px 10px; font-family:' + FONT_MONO);
      console.log('%c請隨著琴音閉上眼睛，做一次完整的深呼吸（吸氣 4 秒、慢呼 7 秒）...', 'color:#94a3b8; font-style:italic; font-size:11px;');
      return 'Breathe with the 11-second harmonic resolution. (純 Web Audio 即時合成，讓心神著陸)';
    },

    breathe: function () {
      console.log('%c[ 🫁 4-7-8 焦慮急救呼吸法啟動 // 4-7-8 BREATHING EXERCISE ]', S.sub);
      console.log('%c請放下緊繃的肩膀，跟隨終端提示進行節奏換氣：', 'color:#64748b; font-size:11px;');
      
      var steps = [
        { t: 0, msg: '🟢 吸氣 4 秒 (Inhale gently)... [ 1, 2, 3, 4 ]', color: '#10b981' },
        { t: 4000, msg: '🟡 屏息 7 秒 (Hold your breath)... 感受內心的靜止', color: '#f59e0b' },
        { t: 11000, msg: '🔵 呼氣 8 秒 (Exhale fully through mouth)... 吐出所有焦慮', color: '#3b82f6' },
        { t: 19000, msg: '✨ 完成一次循環。安下心來，你做得很好。 / Well done.', color: '#10b981' }
      ];

      steps.forEach(function (step) {
        setTimeout(function () {
          console.log('%c' + step.msg, 'color:' + step.color + '; font-weight:bold; font-size:12px; font-family:' + FONT_MONO);
        }, step.t);
      });

      return 'Follow the breathing cues in the console (19s cycle).';
    },

    reframe: function () {
      console.log('%c[ 🧠 BILINGUAL COGNITIVE REFRAMING // 雙語待業認知重塑 ]', S.billboard);
      console.log('%c客觀解構焦慮陷阱，重拾個人行動掌控權 / Reclaim personal agency from cognitive traps', S.sub);
      console.log('');

      var cards = [
        {
          id: '1',
          trapZh: '「我一直冇 Offer，好無用」',
          trapEn: '“No offers yet, I feel completely useless.”',
          factZh: '求職本質是雙向條件配對，絕非對你個人品格、智慧與終身價值的裁判。',
          factEn: 'Job hunting is a bilateral matching process, never a verdict on your competence or personal worth.'
        },
        {
          id: '2',
          trapZh: '「空白期越長，我越冇價值」',
          trapEn: '“The longer the career gap, the less market value I have.”',
          factZh: '主動停頓是為了校準航向；真正沉澱後的經驗與專業，價值從未消退。',
          factEn: 'An intentional pause recalibrates your life trajectory; hard-earned wisdom does not depreciate during an intermission.'
        },
        {
          id: '3',
          trapZh: '「身邊人都在前進，只有我停步」',
          trapEn: '“Everyone else is advancing while I am stalled in place.”',
          factZh: '每個人都有各自的人生時區；這是一場上天賜予你深呼吸與重整節奏的長假。',
          factEn: 'Everyone moves in their own time zone. Take this as a gifted vacation to rest, rearm, and tune your melody.'
        }
      ];

      cards.forEach(function (c) {
        console.log(
          '%c 陷阱 TRAP ' + c.id + ' %c ' + c.trapZh + '\n          ' + c.trapEn,
          'background:#fee2e2; color:#b91c1c; font-weight:900; font-size:11px; padding:2px 6px; border-radius:3px;',
          'color:#991b1b; font-style:italic; font-family:' + FONT_MONO + ';'
        );
        console.log(
          '%c 重塑 FACT ' + c.id + ' %c ' + c.factZh + '\n          ' + c.factEn,
          'background:#dcfce7; color:#15803d; font-weight:900; font-size:11px; padding:2px 6px; border-radius:3px;',
          'color:#166534; font-weight:bold; font-family:' + FONT_MONO + '; line-height:1.5;'
        );
        console.log('');
      });

      return 'Cognitive reframing complete: Turn self-blame into strategic patience / 認知重塑完成：將自責轉化為戰略耐心。';
    },

    cheer: function () {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('%c[ NOTICE ] 系統開啟減少動態效果，微光動畫已跳過。', 'color:#64748b;');
        return 'Warm wishes to you. Spring is coming.';
      }

      var doc = document.documentElement;
      var originTransition = doc.style.transition;
      var originBoxShadow = doc.style.boxShadow;

      doc.style.transition = 'box-shadow 0.8s ease-in-out';
      doc.style.boxShadow = 'inset 0 0 80px rgba(56, 189, 248, 0.4), inset 0 0 120px rgba(251, 191, 36, 0.25)';

      setTimeout(function () {
        doc.style.boxShadow = originBoxShadow;
        doc.style.transition = originTransition;
        console.log('%c[ 🌅 DAWN HAS ARRIVED // 晨曦已至・假期過後，春天會如約前來 ]', 'background:#0f172a; color:#10b981; font-weight:bold; padding:4px 10px; font-family:' + FONT_MONO);
      }, 2500);

      return 'May warmth and clear skies accompany your transition.';
    }
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(renderVacationBanner, 300);
  } else {
    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(renderVacationBanner, 300);
    });
  }
})();
