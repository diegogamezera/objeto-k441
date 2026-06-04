/* ============================================================
   OBJETO K-441 — motor (Lifeline-style)
   ============================================================ */
(function(){
'use strict';

const $ = s => document.querySelector(s);
const chat   = $('#chat');
const dock   = $('#dock');
const hdr    = $('#hdr');
const title  = $('#titleScreen');
const endScr = $('#endScreen');
const SAVE_KEY = 'k441_save_v1';
const SND_KEY  = 'k441_snd';

let state = { node:null, checkpoint:'start', history:[], threat:'NOMINAL' };
let soundOn = localStorage.getItem(SND_KEY) !== 'off';
let busy = false;           // travando input durante digitação
let skipReq = false;        // pulou a espera
let actx = null;

/* ---------- ÁUDIO (WebAudio, blips sutis) ---------- */
function ac(){ if(!actx){ try{ actx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return actx; }
function beep(freq, dur, type, vol){
  if(!soundOn) return; const c = ac(); if(!c) return;
  try{
    const o = c.createOscillator(), g = c.createGain();
    o.type = type||'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol||0.04, c.currentTime+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime+(dur||0.12));
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime+(dur||0.12));
  }catch(e){}
}
const snd = {
  msg(who){
    if(who==='grim') beep(330,0.09,'square',0.025);
    else if(who==='tessa') beep(520,0.16,'sine',0.03);
    else if(who==='helene') beep(440,0.07,'sine',0.03);
    else if(who==='you') beep(660,0.06,'triangle',0.035);
    else beep(240,0.05,'sine',0.02);
  },
  choice(){ beep(700,0.05,'triangle',0.04); setTimeout(()=>beep(900,0.05,'triangle',0.035),60); },
  tick(){ beep(1100,0.03,'square',0.02); },
  alarm(){ beep(180,0.3,'sawtooth',0.05); setTimeout(()=>beep(160,0.3,'sawtooth',0.05),200); },
  win(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,0.22,'sine',0.045),i*130)); },
  dead(){ [300,260,200,120].forEach((f,i)=>setTimeout(()=>beep(f,0.35,'sawtooth',0.05),i*180)); }
};

/* ---------- UTIL ---------- */
const sleep = ms => new Promise(r=>setTimeout(r,ms));
function scrollDown(){ chat.scrollTop = chat.scrollHeight + 400; }
function esc(t){ return t; } // textos já são controlados

function setThreat(t){
  state.threat = t;
  const el = $('#threatTxt'); if(el) el.innerHTML = 'THREAT: <b>'+t+'</b>';
  const dotc = {NOMINAL:'#6fe39a','ELEVATED':'#e9a23b','CRITICAL':'#e0664f'};
  $('#statusDot').style.background = dotc[t]||'#6fe39a';
  $('#statusDot').style.boxShadow = '0 0 8px '+(dotc[t]||'#6fe39a');
}
function setStatus(txt){ $('#statusTxt').textContent = txt; }

/* ---------- RENDER MENSAGENS ---------- */
function nameFor(who){
  return {helene:'Helene', grim:'GRIM-7', tessa:'Tessavrak ⟶ transl.', you:'You', sys:''}[who] || '';
}
function addMessage(who, text){
  const m = document.createElement('div');
  m.className = 'msg '+who;
  if(who==='sys'){
    m.innerHTML = '<div class="bub"><span class="ln"></span>'+text+'<span class="ln"></span></div>';
  }else{
    m.innerHTML = '<div class="name">'+nameFor(who)+'</div><div class="bub">'+text+'</div>';
  }
  chat.appendChild(m); scrollDown(); snd.msg(who);
  return m;
}
async function typing(who, ms){
  if(who==='sys'){ await waitSkip(ms*0.5); return; }
  const t = document.createElement('div');
  t.className = 'typing'+(who==='grim'?' gr':'');
  t.innerHTML = '<span></span><span></span><span></span>';
  chat.appendChild(t); scrollDown();
  setStatus(who==='grim'?'GRIM-7 transmitting…':(who==='tessa'?'translating…':'typing…'));
  await waitSkip(ms);
  t.remove();
  setStatus('secure channel · online');
}
// espera interrompível por skip
async function waitSkip(ms){
  const step = 60; let waited = 0;
  while(waited < ms){
    if(skipReq) return;
    await sleep(step); waited += step;
  }
}

function lenFactor(text){
  // tempo de digitação proporcional ao tamanho, com teto
  const base = 480, per = 26;
  return Math.min(base + text.replace(/<[^>]+>/g,'').length*per*0.9, 2600);
}

/* ---------- BANNERS ---------- */
function chapterBanner(c){
  const b = document.createElement('div');
  b.className = 'chapbanner fade-in';
  b.innerHTML = '<div class="n">'+c.n+'</div><div class="t">— '+c.t+' —</div>';
  chat.appendChild(b); scrollDown(); beep(520,0.5,'sine',0.03);
}

/* ---------- ESPERA TIPO LIFELINE (offline) ---------- */
async function offlineWait(secs, titleTxt, descTxt){
  return new Promise(resolve=>{
    setStatus('offline'); setThreat(state.threat);
    $('#statusDot').style.animation='none'; $('#statusDot').style.opacity='.3';
    const card = document.createElement('div');
    card.className = 'waitcard fade-in';
    card.innerHTML = '<div class="t">'+(titleTxt||'HELENE IS BUSY')+'</div>'+
      '<div class="clock">--:--</div><div class="d">'+(descTxt||'back shortly')+'</div>'+
      '<div class="skip">▸ skip wait</div>';
    chat.appendChild(card); scrollDown();
    const clock = card.querySelector('.clock');
    let remain = secs;
    const fmt = s => String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
    clock.textContent = fmt(remain);
    const done = ()=>{
      clearInterval(iv);
      card.remove();
      $('#statusDot').style.animation=''; $('#statusDot').style.opacity='';
      setStatus('secure channel · online');
      resolve();
    };
    const iv = setInterval(()=>{
      remain--; snd.tick();
      if(remain<=0){ done(); return; }
      clock.textContent = fmt(remain);
    },1000);
    card.querySelector('.skip').onclick = ()=>{ snd.choice(); done(); };
  });
}

/* ---------- DOCK / ESCOLHAS ---------- */
function clearDock(){ dock.innerHTML=''; }
function showContinue(next){
  clearDock();
  const wrap = document.createElement('div'); wrap.className='choices';
  const b = document.createElement('button');
  b.className='tapnext'; b.textContent='▸ continue';
  b.onclick = ()=>{ if(busy) return; snd.tick(); goto(next); };
  wrap.appendChild(b); dock.appendChild(b);
}
function showChoices(choices){
  clearDock();
  const wrap = document.createElement('div'); wrap.className='choices';
  choices.forEach((c,i)=>{
    const b = document.createElement('button');
    b.className = 'choice'+(c.act?' act':'')+(c.danger?' danger':'');
    b.innerHTML = c.t;
    b.style.animationDelay = (i*0.06)+'s'; b.classList.add('fade-in');
    b.onclick = ()=>{
      if(busy) return;
      snd.choice();
      clearDock();
      if(c.say){ addMessage('you', c.say); }
      setTimeout(()=>goto(c.next), c.say?420:120);
    };
    wrap.appendChild(b);
  });
  dock.appendChild(wrap);
}

/* ---------- LOOP PRINCIPAL ---------- */
async function goto(id){
  const node = STORY[id];
  if(!node){ console.error('nó ausente:', id); return; }
  state.node = id;
  state.history.push(id);
  if(node.checkpoint) state.checkpoint = id;
  save();

  busy = true; skipReq = false; clearDock();

  // tap-para-pular global enquanto digita
  chat.onclick = ()=>{ skipReq = true; };

  if(node.chapter) chapterBanner(node.chapter);

  // ajuste de ambiente por capítulo
  if(id==='ch4_breach_intro'){ setThreat('CRITICAL'); snd.alarm(); }
  if(id==='ch4_arrival'){ setThreat('CRITICAL'); }
  if(id==='ch5_intro'){ setThreat('ELEVATED'); }
  if(id==='finale'){ setThreat('NOMINAL'); }

  if(node.wait){
    await offlineWait(node.wait.secs, node.wait.title, node.wait.desc);
  }

  if(node.messages){
    for(const msg of node.messages){
      if(skipReq){ /* ainda renderiza, mas sem typing */ }
      const pre = msg.delay ? Math.min(msg.delay,2600) : lenFactor(msg.text);
      await typing(msg.who, skipReq ? 120 : pre);
      addMessage(msg.who, msg.text);
      if(msg.pause && !skipReq) await waitSkip(650);
      else await sleep(120);
    }
  }

  chat.onclick = null;
  busy = false;

  if(node.ending){ return showEnding(node.ending); }
  if(node.choices){ return showChoices(node.choices); }
  if(node.auto){ return showContinue(node.auto); }
}

/* ---------- FINAIS ---------- */
function showEnding(e){
  clearDock();
  const death = (e.kind==='death'||e.kind==='bad');
  endScr.className = 'screen'+(death?' death':'');
  $('#endSigil').innerHTML = death
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="#e0664f" stroke-width="1.5"><path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/><path d="M9 9 l6 6 M15 9 l-6 6" stroke="#e0664f"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="#6fe39a" stroke-width="1.5"><path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z"/><circle cx="12" cy="12" r="3.2" stroke="#e9a23b"/></svg>';
  $('#endKicker').textContent = e.kicker||'';
  $('#endTitle').innerHTML = e.title||'';
  $('#endBody').textContent = e.body||'';
  const q = $('#endQuote');
  if(e.quote){ q.style.display='block'; q.textContent='“'+e.quote+'”'; } else q.style.display='none';

  const btns = $('#endBtns'); btns.innerHTML='';
  if(death){
    snd.dead();
    const cp = e.retry || state.checkpoint;
    const b1 = mkBtn('amber','▸ Try again', ()=>{ hideEnd(); goto(cp); });
    const b2 = mkBtn('ghost','Restart from the beginning', ()=>{ wipe(); hideEnd(); goto('start'); });
    btns.append(b1,b2);
    if(e.stat){ const s=document.createElement('p'); s.className='statline'; s.textContent=e.stat; btns.appendChild(s); }
  }else{
    snd.win();
    const b1 = mkBtn('','▸ Play again', ()=>{ wipe(); hideEnd(); goto('start'); });
    btns.appendChild(b1);
    if(e.stat){ const s=document.createElement('p'); s.className='statline'; s.textContent='✓ '+e.stat; btns.appendChild(s); }
  }
  endScr.classList.remove('hide');
}
function mkBtn(cls, txt, fn){
  const b = document.createElement('button');
  b.className = 'btn '+cls; b.textContent = txt;
  b.onclick = ()=>{ snd.choice(); fn(); };
  return b;
}
function hideEnd(){ endScr.classList.add('hide'); }

/* ---------- SAVE / LOAD ---------- */
function save(){
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify({node:state.node,checkpoint:state.checkpoint,threat:state.threat})); }catch(e){}
}
function load(){
  try{ const s = JSON.parse(localStorage.getItem(SAVE_KEY)); return s&&s.node?s:null; }catch(e){ return null; }
}
function wipe(){ try{ localStorage.removeItem(SAVE_KEY); }catch(e){} state={node:null,checkpoint:'start',history:[],threat:'NOMINAL'}; chat.innerHTML=''; }

/* ---------- INÍCIO DE JOGO ---------- */
function startGame(fromNode){
  title.style.display='none';
  hdr.style.visibility='visible';
  chat.innerHTML='';
  setThreat('NOMINAL');
  goto(fromNode||'start');
}

/* ---------- BIND UI ---------- */
function refreshSoundLabel(){
  $('#sndState').textContent = soundOn?'on':'off';
  $('#btnSound') && ($('#btnSound').style.color = soundOn ? 'var(--green)' : 'var(--dim)');
}
$('#btnNew').onclick = ()=>{ ac(); snd.choice(); wipe(); startGame('start'); };
$('#btnSound').onclick = ()=>{ soundOn=!soundOn; localStorage.setItem(SND_KEY, soundOn?'on':'off'); refreshSoundLabel(); if(soundOn) snd.tick(); toast(soundOn?'sound on':'sound off'); };
$('#btnMenu').onclick = ()=>{
  if(confirm('Back to the title screen? Your progress is saved at the last checkpoint.')){
    title.style.display='flex'; hdr.style.visibility='hidden'; clearDock(); checkContinue();
  }
};

function checkContinue(){
  const s = load();
  const btn = $('#btnContinue');
  if(s){
    btn.style.display='block';
    btn.onclick = ()=>{ ac(); snd.choice(); state.checkpoint=s.checkpoint||'start'; state.threat=s.threat||'NOMINAL';
      // recomeça do checkpoint pra reconstruir contexto sem replay infinito
      startGame(s.checkpoint||s.node); };
  }else{
    btn.style.display='none';
  }
}

/* ---------- TOAST ---------- */
let toastTimer=null;
function toast(t){
  const el=$('#toast'); el.textContent=t; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),1600);
}

/* ---------- BOOT ---------- */
refreshSoundLabel();
checkContinue();

})();
