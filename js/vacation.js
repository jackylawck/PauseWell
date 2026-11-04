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

  // 1. 純代碼 Web Audio 鋼琴泛音合成器（零外部音樂檔案，無版權爭議）
  function playGentleChord() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      
      // Fmaj9 溫暖和弦頻率 (F3, A3, C4, E4, G4)
      var freqs = [174.61, 220.00, 261.63, 329.63, 392.00];
      var now = ctx.currentTime;

      freqs.forEach(function (f, index) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = 'sine'; // 柔和正弦波
        osc.frequency.setValueAtTime(f, now);

        // 微小的琶音時間差（琶音感 Arpeggio）
        var noteStart = now + (index * 0.08);
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.8); // 緩慢自然消逝

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 3.0);
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
      console.log('%cvacation.piano()%c   - 撥響純代碼合成之溫暖鋼琴和弦 / Play a synthesized calm chord', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.breathe()%c - 啟動「4-7-8」平復焦慮呼吸節奏 / Start 4-7-8 breathing timer', S.cmdKey, S.cmdDesc);
      console.log('%cvacation.reframe()%c - 執行認知重塑：打破「待業自責」迴圈 / Cognitive reframing prompt', S.cmdKey, S.cmdDesc);
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
      console.log('%c🎹 [ Fmaj9 Piano Resonance // 琴鍵清音響起・心神自定 ]', 'background:#0f172a; color:#38bdf8; font-weight:bold; padding:4px 10px; font-family:' + FONT_MONO);
      return 'Breathe with the resonance. (由原生 Web Audio 即時合成，無音檔下載)';
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
      var audit = [
        '┌───────────────────────┬──────────────────────────────────────────┐',
        '│ 焦慮陷阱 (Cognitive Distortion)│ 客觀事實重塑 (Objective Reframe)           │',
        '├───────────────────────┼──────────────────────────────────────────┤',
        '│ 「我一直冇 Offer，好無用」     │ 求職是配對過程，不是你個人品格與才能的終審評分。  │',
        '│ 「空白期越長，我越冇價值」     │ 刻意停頓是為了校準航道；沉澱者的價值從未消退。  │',
        '│ 「身邊人都在前進，只有我停步」  │ 每個人都有自己的時區，這是一場屬於你的蓄力長假。│',
        '└───────────────────────┴──────────────────────────────────────────┘'
      ].join('\n');
      console.log('%c' + audit, 'background:#0f172a; color:#fbbf24; font-family:' + FONT_MONO + '; font-size:11px; line-height:1.5; padding:8px;');
      return 'Cognitive reframing complete: Turn self-blame into strategic patience.';
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
      // 破曉晨曦金綠光暈
      doc.style.boxShadow = 'inset 0 0 80px rgba(56, 189, 248, 0.4), inset 0 0 120px rgba(251, 191, 36, 0.25)';

      setTimeout(function () {
        doc.style.boxShadow = originBoxShadow;
        doc.style.transition = originTransition;
        console.log('%c[ 🌅 DAWN HAS ARRIVED // 晨曦已至・假期過後，春天會如約前來 ]', 'background:#0f172a; color:#10b981; font-weight:bold; padding:4px 10px; font-family:' + FONT_MONO);
      }, 2500);

      return 'May warmth and clear skies accompany your transition.';
    }
  });

  // 延遲載入以防阻礙首屏渲染
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(renderVacationBanner, 300);
  } else {
    window.addEventListener('DOMContentLoaded', function () {
      setTimeout(renderVacationBanner, 300);
    });
  }
})();
