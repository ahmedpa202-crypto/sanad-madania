// مكتبة ألعاب سَنَد: ٢٠ لعبة تُضاف إلى ألعاب الدرس الإحدى عشرة (المجموع ٣١).
// كل لعبة: i أيقونة، t اسم، d وصف، ok(l,c) هل تصلح للدرس، run(c) تشغيلها.
// c: {u,l,items,K,frame,finish,result,tts,play,AR,esc,AN,shuf,pick,rnd,STAR,teams,addPt,TC}
(()=>{
const css=`
.xbar{display:flex;justify-content:space-between;gap:10px;margin:0 0 10px;font-weight:900;font-size:18px;color:var(--ink)}
.xl{font-family:TS;font-weight:900;font-size:clamp(24px,4vw,34px);color:var(--navy)}
.claim{display:block;margin-top:6px;font-weight:800;color:var(--hi)}
.bal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;padding:10px 0}
.balo{position:relative;aspect-ratio:3/4;border-radius:50% 50% 46% 46%;background:radial-gradient(circle at 35% 30%,#fff9,transparent 40%),var(--bc,var(--sky));display:grid;place-items:center;color:var(--deep)}
.balo::after{content:"";position:absolute;bottom:-18px;left:50%;width:2px;height:18px;background:#7D90A3}
.balo:nth-child(4n+2){--bc:var(--mint)}.balo:nth-child(4n+3){--bc:var(--gold)}.balo:nth-child(4n+4){--bc:#F2A08A}
.balo .ar{font-size:clamp(24px,4vw,40px);color:var(--deep)}
.balo.ok{background:var(--okS);visibility:hidden}.balo.no{filter:grayscale(1);opacity:.6}
@media (prefers-reduced-motion:no-preference){.balo{animation:bob 3s ease-in-out infinite;animation-delay:calc(var(--d)*-.7s)}@keyframes bob{50%{translate:0 -10px}}}
.holes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;max-width:560px;margin:0 auto}
.hole{aspect-ratio:4/3;border-radius:50% 50% 20px 20px/40% 40% 20px 20px;background:radial-gradient(ellipse at 50% 85%,#0D294555 0 45%,transparent 46%),var(--mintS);overflow:hidden;position:relative;border:2px solid var(--line)}
.hole .mole{position:absolute;left:12%;right:12%;bottom:-100%;height:80%;border-radius:40% 40% 10px 10px;background:var(--gold);display:grid;place-items:center;transition:bottom .18s}
.hole.up .mole{bottom:6%}.hole.bad{background:var(--badS)}
.hole .ar{font-size:clamp(24px,4.5vw,40px);color:var(--deep)}
.rain{position:relative;height:min(60vh,440px);border-radius:22px;background:linear-gradient(180deg,var(--skyS),var(--card));border:2px solid var(--line);overflow:hidden}
.drop{position:absolute;top:-70px;min-width:74px;min-height:64px;padding:0 10px;border-radius:18px;background:var(--tile);border:2px solid var(--sky);display:grid;place-items:center;box-shadow:0 8px 20px -10px var(--shade)}
.drop .ar{font-size:clamp(22px,4vw,34px)}
.wheelw{display:grid;place-items:center;position:relative;margin:6px auto 12px;width:min(78vw,320px);aspect-ratio:1}
.wheel{width:100%;height:100%;border-radius:50%;border:8px solid var(--navy);background:conic-gradient(var(--sky) 0 12.5%,var(--mint) 0 25%,var(--gold) 0 37.5%,#F2A08A 0 50%,var(--sky) 0 62.5%,var(--mint) 0 75%,var(--gold) 0 87.5%,#F2A08A 0);transition:transform 3s cubic-bezier(.17,.67,.2,1);position:relative}
.wheel span{position:absolute;left:50%;top:50%;width:0;height:0}
.wheel span b{position:absolute;transform:translate(-50%,-50%) translateY(calc(min(78vw,320px) * -.36));font-size:22px;font-weight:900;color:var(--deep)}
.wptr{position:absolute;top:-6px;left:50%;translate:-50% 0;width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:28px solid var(--deep);z-index:2}
.whub{position:absolute;width:22%;aspect-ratio:1;border-radius:50%;background:var(--paper);border:6px solid var(--navy)}
.bingo{display:grid;gap:8px;grid-template-columns:repeat(var(--n),minmax(0,1fr))}
.bingo .opt{min-height:74px}.bingo .opt.mk{background:var(--goldS);border-color:var(--gold)}
.chests{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:560px;margin:0 auto}
.chest{aspect-ratio:5/4;border-radius:18px;background:linear-gradient(180deg,#C98A2E 0 38%,#A86B1C 38% 44%,#D99B3C 44%);border:3px solid #7A4B10;display:grid;place-items:center;color:#fff;font-weight:900;font-size:26px}
.chest.open{background:var(--goldS);border-color:var(--gold);color:var(--navy)}
.chest .ar{font-size:clamp(22px,4vw,34px)}
.climb{position:relative;height:16px;border-radius:16px;background:var(--line);margin:0 0 12px;overflow:visible}
.climb i{position:absolute;inset:0 auto 0 0;width:calc(var(--p)*100%);border-radius:16px;background:linear-gradient(90deg,var(--mint),var(--gold));transition:width .4s}
.climb b{position:absolute;top:-14px;left:calc(var(--p)*100% - 14px);font-size:26px;transition:left .4s}
.climb em{position:absolute;right:-6px;top:-18px;font-size:28px;font-style:normal}
.opts.six{grid-template-columns:repeat(3,minmax(0,1fr))}
.doors{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.door{min-height:170px;border-radius:16px 16px 6px 6px;background:linear-gradient(90deg,#8A5A2B,#B07A42 50%,#8A5A2B);border:4px solid #5E3B17;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;position:relative;color:#fff}
.door::after{content:"";position:absolute;left:14px;top:50%;width:10px;height:10px;border-radius:50%;background:var(--gold)}
.door .ar{font-size:clamp(24px,4vw,38px);color:#fff;background:#0004;border-radius:12px;padding:0 10px}
.door.ok{background:var(--okS);border-color:var(--ok)}.door.ok .ar{color:var(--navy);background:none}.door.no{filter:grayscale(1)}
.flip{perspective:1200px;margin:0 auto 12px;max-width:520px}
.flip .fc{position:relative;min-height:240px;transform-style:preserve-3d;transition:transform .5s}
.flip.on .fc{transform:rotateY(180deg)}
.flip .fa,.flip .fb2{position:absolute;inset:0;backface-visibility:hidden;border-radius:22px;border:2px solid var(--line);background:var(--tile);display:grid;place-items:center;padding:12px;text-align:center}
.flip .fb2{transform:rotateY(180deg);background:var(--goldS)}
.flip .ar{font-size:clamp(44px,8vw,84px)}
.wagons{display:grid;grid-template-columns:repeat(var(--n,3),minmax(0,1fr));gap:10px}
.wagon{min-height:96px;border-radius:14px 14px 6px 6px;background:var(--wc,var(--sky));color:var(--deep);font-weight:900;font-size:20px;position:relative;margin-bottom:14px}
.wagon::before,.wagon::after{content:"";position:absolute;bottom:-12px;width:22px;height:22px;border-radius:50%;background:var(--deep);border:4px solid var(--line)}
.wagon::before{right:16%}.wagon::after{left:16%}
.wagon:nth-child(2){--wc:var(--mint)}.wagon:nth-child(3){--wc:var(--gold)}.wagon:nth-child(4){--wc:#F2A08A}
.wagon.ok{outline:4px solid var(--ok)}.wagon.no{opacity:.5}
.loco{display:inline-flex;align-items:center;gap:8px}
.blur .ar{filter:blur(10px);transition:filter 4s linear}.blur.clear .ar{filter:none}
.pairs{display:grid;grid-template-columns:1fr 1fr;gap:10px 40px}
.pairs .col{display:flex;flex-direction:column;gap:10px}
.pairs .opt{min-height:70px}.pairs .opt.done{background:var(--okS);border-color:var(--ok);pointer-events:none}
.seqrow{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;min-height:86px;background:var(--tile);border:2px dashed var(--line);border-radius:18px;padding:10px;margin-bottom:12px;align-items:center}
.gap{display:inline-block;min-width:48px;border-bottom:4px dashed var(--hi)}
@media (max-width:560px){.bal{grid-template-columns:repeat(2,minmax(0,1fr))}.opts.six{grid-template-columns:repeat(2,minmax(0,1fr))}.door{min-height:130px}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const X=window.XGAMES={};
const def=(k,i,t,d,ok,run)=>{X[k]={i,t,d,ok,run}};
const Kv=(c,x)=>{const k=c.K(x);return k?k.v:null};
const lab=(c,x)=>{const k=c.K(x);return !k?"":k.ar?c.AR(k.v):`<span class="xl">${c.esc(k.v)}</span>`};
const labS=(c,x)=>{const k=c.K(x);return !k?"":k.ar?c.AR(k.v):`<span style="font-weight:900">${c.esc(k.v)}</span>`};
const withK=c=>c.items.filter(x=>x.w&&c.K(x));
const uniq=(a,f)=>{const s=new Set;return a.filter(x=>{const v=f(x);if(s.has(v))return false;s.add(v);return true})};
const short=l=>l.kind!=="lines"&&l.kind!=="page";
const okK=n=>(l,c)=>short(l)&&uniq(withK(c),x=>Kv(c,x)).length>=n;
const okW=n=>(l,c)=>l.kind!=="page"&&uniq(c.items.filter(x=>x.w),x=>x.w).length>=n;
const groups=c=>{const g={};withK(c).forEach(x=>{(g[Kv(c,x)]=g[Kv(c,x)]||[]).push(x)});return g};
const mk=(c,right,pool,n,kf,rf)=>{const rv=kf(right);const w=c.shuf(uniq(pool.filter(x=>kf(x)!==rv),kf)).slice(0,n-1);return c.shuf([right,...w]).map(x=>({h:rf(x),ok:kf(x)===rv}))};
const many=(c,arr,n)=>{let o=[];while(o.length<n)o=o.concat(c.shuf(arr));return o.slice(0,n)};
const ask=l=>l.kind==="letters"||l.kind==="forms"?"ما اسم هذا الحرف؟":l.kind==="build"?"بأي مقطع تبدأ؟":"اختر الجواب الصحيح";
// محرّك الجولات: سؤال وخيارات
function R(c,{rounds,cls="opts",ocls="opt",head=()=>"",after=()=>{},limit=0,onEnd,prompt=r=>r.p,onDraw}){
 let i=0,sc=0,res=[],left=limit,tm=null;const N=rounds.length,h0=location.hash;
 const end=()=>{clearInterval(tm);if(location.hash!==h0)return;onEnd?onEnd(sc,i):c.finish(sc,N)};
 const draw=()=>{if(i>=N)return end();const r=rounds[i];
  c.frame(`${head(i,sc,left)}<div class="prompt ${r.pc||""}">${prompt(r)}</div><div class="${cls}" style="${r.style||""}">${r.opts.map((o,k)=>`<button class="${ocls}" data-k="${k}" style="--d:${k}">${o.h}</button>`).join("")}</div><div class="fb" id="fb" role="status"></div>`,limit?"":rounds.map((_,k)=>`<i class="${k<i?(res[k]?"ok":"no"):k===i?"cur":""}"></i>`).join(""));
  if(onDraw)onDraw(r);
  let tried=false;const bs=[...document.querySelectorAll(`#app .${ocls.split(" ")[0]}[data-k]`)];
  bs.forEach(b=>b.onclick=()=>{const o=r.opts[+b.dataset.k],fb=document.getElementById("fb");
   if(o.ok){b.classList.add("ok");window.SFX&&SFX.ok();if(!tried)sc++;res[i]=!tried;fb.className="fb ok";fb.textContent=c.rnd(["أحسنت!","ممتاز!","بارك الله فيك!"]);after(!tried,i);bs.forEach(x=>x.onclick=null);if(r.speak)c.tts(r.speak);setTimeout(()=>{i++;draw()},limit?380:900)}
   else{if(!tried)after(false,i);tried=true;b.classList.add("no");window.SFX&&SFX.no();fb.className="fb no";fb.textContent="حاول مرة أخرى"}})};
 if(limit)tm=setInterval(()=>{if(location.hash!==h0)return clearInterval(tm);left--;const e=document.getElementById("xt");if(e)e.textContent=c.AN(left);if(left<=0)end()},1000);
 draw()}
const labelRounds=(c,n,k=4)=>{const P=withK(c);return many(c,P,n).map(x=>({p:`<span class="q">${ask(c.l)}</span>${c.AR(x.w)}`,opts:mk(c,x,P,k,y=>Kv(c,y),y=>labS(c,y)),speak:x.w,lbl:1}))};

// ١ البالونات
def("balloon","🎈","فرقعة البالونات","فرقع البالون الذي يحمل الجواب الصحيح.",okK(4),c=>{const P=withK(c);
 R(c,{cls:"bal",ocls:"balo",rounds:c.pick(P,6).map(x=>({p:`<span class="q">فرقع البالون الذي فيه</span>${lab(c,x)}`,opts:mk(c,x,P,4,y=>Kv(c,y),y=>c.AR(y.w)),speak:x.w}))})});
// ٢ اضرب الخلد
const timedTap=(c,kind)=>{const P=withK(c),tgt=c.rnd(P),tv=Kv(c,tgt),same=P.filter(x=>Kv(c,x)===tv),diff=P.filter(x=>Kv(c,x)!==tv);
 let left=30,sc=0,miss=0,shown=0;const h0=location.hash;
 const top=`<div class="prompt" style="min-height:100px"><span class="q">${kind==="whack"?"اضرب كل خلد يحمل":"التقط كل قطرة فيها"}</span>${lab(c,tgt)}</div><div class="xbar"><span>⏱ <b id="xt">${c.AN(left)}</b></span><span>✔ <b id="xs">٠</b></span></div>`;
 const pickX=()=>Math.random()<.5||!diff.length?c.rnd(same):c.rnd(diff);
 const hit=(ok,el)=>{window.SFX&&(ok?SFX.pop():SFX.no());if(ok){sc++;document.getElementById("xs").textContent=c.AN(sc)}else{miss++;el.classList.add("bad")}};
 let t1,t2,t3;const stop=()=>{clearInterval(t1);clearInterval(t2);clearInterval(t3)};
 const fin=()=>{stop();if(location.hash===h0)c.finish(Math.max(0,sc-miss),Math.max(1,shown))};
 if(kind==="whack"){c.frame(top+`<div class="holes">${Array.from({length:9},(_,i)=>`<button class="hole" data-i="${i}" aria-label="حفرة"><span class="mole"></span></button>`).join("")}</div>`);
  const H=[...document.querySelectorAll("#app .hole")];
  const pop=()=>{H.forEach(h=>h.classList.remove("up","bad"));const h=c.rnd(H),x=pickX();h.querySelector(".mole").innerHTML=c.AR(x.w);h.dataset.ok=Kv(c,x)===tv?1:0;if(h.dataset.ok==1)shown++;h.classList.add("up")};
  H.forEach(h=>h.onclick=()=>{if(!h.classList.contains("up"))return;h.classList.remove("up");hit(h.dataset.ok==1,h)});
  t1=setInterval(()=>{if(location.hash!==h0)return stop();pop()},1150);pop()}
 else{c.frame(top+`<div class="rain" id="rain"></div>`);const box=document.getElementById("rain");
  const spawn=()=>{const x=pickX(),b=document.createElement("button");b.className="drop";b.innerHTML=c.AR(x.w);b.style.right=(4+Math.random()*72)+"%";b.dataset.y=-70;b.dataset.ok=Kv(c,x)===tv?1:0;if(b.dataset.ok==1)shown++;b.onclick=()=>{hit(b.dataset.ok==1,b);b.remove()};box.appendChild(b)};
  t1=setInterval(()=>{if(location.hash!==h0)return stop();spawn()},1000);
  t3=setInterval(()=>{box.querySelectorAll(".drop").forEach(d=>{const y=+d.dataset.y+3.2;d.dataset.y=y;d.style.top=y+"px";if(y>box.clientHeight)d.remove()})},40);spawn()}
 t2=setInterval(()=>{if(location.hash!==h0)return stop();left--;const e=document.getElementById("xt");if(e)e.textContent=c.AN(left);if(left<=0)fin()},1000)};
def("whack","🔨","اضرب الخلد","اضرب كل خلد يحمل المطلوب، قبل أن يختبئ.",okK(2),c=>timedTap(c,"whack"));
// ٣ المطر
def("rain","🌧️","مطر الحروف","التقط القطرات الصحيحة قبل أن تسقط.",okK(2),c=>timedTap(c,"rain"));
// ٤ الدخيل
def("odd","🕵️","من الدخيل؟","ثلاث خانات متشابهة وواحدة مختلفة: جدها.",(l,c)=>short(l)&&Object.values(groups(c)).filter(g=>g.length>=3).length>=1&&Object.keys(groups(c)).length>=2,c=>{const G=groups(c),big=Object.keys(G).filter(k=>G[k].length>=3),all=Object.keys(G);
 const rounds=Array.from({length:6},()=>{const a=c.rnd(big),b=c.rnd(all.filter(k=>k!==a)),three=c.pick(G[a],3),one=c.rnd(G[b]);return{p:`<span class="q">أيّها مختلف عن الباقي؟</span><span class="say" style="font-family:TS;font-size:22px">اقرأ الأربعة أولًا</span>`,opts:c.shuf([...three.map(x=>({h:c.AR(x.w),ok:false})),{h:c.AR(one.w),ok:true}]),speak:one.w}});
 R(c,{rounds})});
// ٥ صح أم خطأ
def("tf","✅","صح أم خطأ؟","اقرأ، ثم احكم: هل الجواب المكتوب صحيح؟",okK(2),c=>{const P=withK(c),pre=c.l.kind==="letters"||c.l.kind==="forms"?"اسمه":c.items[0].h?"حركته":c.items[0].c?"نوعه":c.l.kind==="build"?"مقطعه الأول":"الجزء المقصود";
 R(c,{cls:"opts",ocls:"opt lbl",rounds:c.pick(P,8).map(x=>{const t=Math.random()<.5,o=t?x:c.rnd(P.filter(y=>Kv(c,y)!==Kv(c,x)));return{p:`${c.AR(x.w)}<span class="claim">${pre}: ${labS(c,o)}</span>`,opts:[{h:"صحيح ✓",ok:t},{h:"خطأ ✗",ok:!t}],speak:x.w}})})});
// ٦ تحدي الدقيقة
def("minute","⏱️","تحدّي الدقيقة","أجب عن أكبر عدد في ستين ثانية.",okK(3),c=>R(c,{rounds:labelRounds(c,60,3),cls:"opts",ocls:"opt lbl",limit:60,head:(i,sc,l)=>`<div class="xbar"><span>⏱ <b id="xt">${c.AN(l)}</b></span><span>✔ <b>${c.AN(sc)}</b></span></div>`,onEnd:(sc)=>c.finish(sc,Math.max(12,sc))}));
// ٧ رتّب كما في الكتاب
def("seq","🔢","رتّب كما في الكتاب","المس الخانات بترتيبها في الكتاب.",okW(5),c=>{const it=c.items.filter(x=>x.w);let r=0,sc=0;const R4=4;
 const draw=()=>{if(r>=R4)return c.finish(sc,R4);const n=Math.min(c.l.kind==="lines"?3:5,it.length),s=Math.floor(Math.random()*(it.length-n+1)),part=it.slice(s,s+n),sh=c.shuf(part);let got=0,err=false;
  c.frame(`<div class="prompt" style="min-height:80px"><span class="q">المس الخانات بترتيبها في الكتاب، من الأولى إلى الأخيرة</span></div><div class="seqrow" id="sq"><span style="color:var(--soft)">…</span></div><div class="opts" style="grid-template-columns:repeat(auto-fill,minmax(${c.l.kind==="lines"?260:120}px,1fr))">${sh.map((x,k)=>`<button class="opt" data-k="${k}">${c.AR(x.w)}</button>`).join("")}</div><div class="fb" id="fb"></div>`,Array.from({length:R4},(_,k)=>`<i class="${k<r?"ok":k===r?"cur":""}"></i>`).join(""));
  document.querySelectorAll("#app .opt[data-k]").forEach(b=>b.onclick=()=>{const x=sh[+b.dataset.k];if(x===part[got]){got++;b.classList.add("gone");const q=document.getElementById("sq");if(got===1)q.innerHTML="";q.insertAdjacentHTML("beforeend",`<span class="opt ok">${c.AR(x.w)}</span>`);c.tts(x.w);if(got===n){if(!err)sc++;document.getElementById("fb").className="fb ok";document.getElementById("fb").textContent="أحسنت!";setTimeout(()=>{r++;draw()},1100)}}else{err=true;b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500)}})};draw()});
// ٨ صِل
def("pairs","🔗","صِل بين الزوجين","المس الخانة، ثم ما يناسبها في العمود الآخر.",okK(4),c=>{const P=c.pick(uniq(withK(c),x=>Kv(c,x)),5),L=c.shuf(P),Rr=c.shuf(P);let sel=null,done=0,err=0;
 c.frame(`<div class="prompt" style="min-height:70px"><span class="q">صِل كل خانة بما يناسبها</span></div><div class="pairs"><div class="col">${L.map((x,k)=>`<button class="opt" data-a="${k}">${c.AR(x.w)}</button>`).join("")}</div><div class="col">${Rr.map((x,k)=>`<button class="opt lbl" data-b="${k}">${labS(c,x)}</button>`).join("")}</div></div><div class="fb" id="fb"></div>`);
 document.querySelectorAll("#app [data-a]").forEach(b=>b.onclick=()=>{document.querySelectorAll("#app [data-a]").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.a;c.tts(L[sel].w)});
 document.querySelectorAll("#app [data-b]").forEach(b=>b.onclick=()=>{if(sel==null)return;const a=document.querySelector(`#app [data-a="${sel}"]`);if(Kv(c,L[sel])===Kv(c,Rr[+b.dataset.b])){a.classList.add("done");b.classList.add("done");a.classList.remove("sel");sel=null;done++;if(done===P.length)setTimeout(()=>c.finish(Math.max(0,P.length-err),P.length),700)}else{err++;b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500)}})});
// ٩ أكمل الناقص
const hasGap=c=>c.items.filter(x=>x.t&&x.t!==x.w&&x.w.includes(x.t));
def("gap","🧩","أكمل الناقص","في الكلمة جزء ناقص: اختر ما يكملها.",(l,c)=>short(l)&&uniq(hasGap(c),x=>x.t).length>=3,c=>{const P=hasGap(c);
 R(c,{rounds:c.pick(P,8).map(x=>{const i=x.hl?x.hl[0]:x.w.indexOf(x.t),a=x.w.slice(0,i),b=x.w.slice(i+x.t.length);return{p:`<span class="q">ما الجزء الناقص؟</span><span class="ar">${c.esc(a)}<span class="gap">؟</span>${c.esc(b)}</span>`,opts:mk(c,x,uniq(P,y=>y.t),3,y=>y.t,y=>c.AR(y.t)),speak:x.w}})})});
// ١٠ عجلة القراءة
def("wheel","🎡","عجلة القراءة","أدر العجلة، واقرأ الخانة التي تقف عندها.",okW(6),c=>{const P=c.pick(uniq(c.items.filter(x=>x.w),x=>x.w),8);let rot=0,spins=0,good=0;const N=6;
 const draw=()=>{c.frame(`<div class="wheelw"><span class="wptr"></span><div class="wheel" id="wh" style="transform:rotate(${rot}deg)">${P.map((_,k)=>`<span style="transform:rotate(${k*45+22.5}deg)"><b>${c.AN(k+1)}</b></span>`).join("")}</div><span class="whub"></span></div><div id="wr" class="prompt" style="min-height:150px"><span class="q">أدر العجلة</span></div><div class="row" style="justify-content:center"><button class="btn g" id="spin">أدر العجلة</button></div>`,Array.from({length:N},(_,k)=>`<i class="${k<spins?"ok":k===spins?"cur":""}"></i>`).join(""));
  document.getElementById("spin").onclick=()=>{const k=Math.floor(Math.random()*P.length);rot+=1440+(360-(k*45+22.5))-(rot%360);document.getElementById("wh").style.transform=`rotate(${rot}deg)`;document.getElementById("spin").disabled=true;
   setTimeout(()=>{document.getElementById("wr").innerHTML=`<span class="q">الخانة ${c.AN(k+1)}: اقرأ</span>${c.AR(P[k].w)}<div class="row" style="justify-content:center"><button class="btn m" id="y">قرأ صحيحًا</button><button class="btn s" id="n">نعيد</button></div>`;
    const nx=ok=>{spins++;if(ok)good++;else c.tts(P[k].w);if(spins>=N)return c.finish(good,N);draw()};document.getElementById("y").onclick=()=>nx(1);document.getElementById("n").onclick=()=>nx(0)},matchMedia("(prefers-reduced-motion: reduce)").matches?50:3100)}};draw()});
// ١١ سباق الفريقين
def("race","🏁","سباق الفرق","الفرق تتناوب، وكل إجابة صحيحة نقطة لفريقها.",okK(3),c=>{const T=c.teams().list;let pts=T.map(()=>0);
 R(c,{rounds:labelRounds(c,T.length*4,4),ocls:"opt lbl",head:i=>{const t=T[i%T.length];return`<div class="xbar"><span style="background:${c.TC[t.c]};color:var(--deep);border-radius:12px;padding:4px 14px">الدور: ${c.esc(t.name)}</span><span>${T.map((x,k)=>`${c.esc(x.name)}: ${c.AN(pts[k])}`).join(" – ")}</span></div>`},after:(ok,i)=>{if(ok){const k=i%T.length;pts[k]++;c.addPt(k,1)}},onEnd:(sc,i)=>c.finish(sc,i||1)})});
// ١٢ بنغو
def("bingo","🎯","بنغو","المس الخانة التي يُنادى بها، وأكمل صفًّا.",(l,c)=>short(l)&&uniq(withK(c),x=>x.w).length>=9&&uniq(withK(c),x=>Kv(c,x)).length>=3,c=>{const P=uniq(withK(c),x=>x.w),n=P.length>=16?4:3,cells=c.pick(P,n*n);let marked=new Set,calls=0,cur=null;
 const call=()=>{const rest=cells.filter((_,k)=>!marked.has(k));cur=c.rnd(rest);calls++;document.getElementById("call").innerHTML=`<span class="q">ابحث عن خانة فيها</span>${lab(c,cur)}`;document.getElementById("cn").textContent=c.AN(calls)};
 const win=()=>{const m=k=>marked.has(k),L=[];for(let r=0;r<n;r++){L.push([...Array(n)].map((_,j)=>r*n+j));L.push([...Array(n)].map((_,j)=>j*n+r))}L.push([...Array(n)].map((_,j)=>j*n+j));L.push([...Array(n)].map((_,j)=>j*n+n-1-j));return L.some(l=>l.every(m))};
 c.frame(`<div class="prompt" id="call" style="min-height:120px"></div><div class="xbar"><span>النداء: <b id="cn">٠</b></span><span>أكمل صفًّا أو عمودًا أو قطرًا</span></div><div class="bingo" style="--n:${n}">${cells.map((x,k)=>`<button class="opt" data-k="${k}">${c.AR(x.w)}</button>`).join("")}</div><div class="fb" id="fb"></div>`);
 document.querySelectorAll("#app .bingo .opt").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,x=cells[k];if(marked.has(k))return;if(Kv(c,x)===Kv(c,cur)){marked.add(k);b.classList.add("mk");c.tts(x.w);window.SFX&&SFX.ok();if(win()){document.getElementById("fb").className="fb ok";document.getElementById("fb").textContent="بنغو! أحسنت";return setTimeout(()=>c.finish(Math.max(n,n*3-calls),n*2),900)}call()}else{b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500)}});call()});
// ١٣ صندوق الكنز
def("treasure","💰","صندوق الكنز","افتح صندوقًا، واقرأ ما فيه لتربح الكنز.",okW(6),c=>{const P=c.pick(uniq(c.items.filter(x=>x.w),x=>x.w),9);let opened=0,coins=0;const N=Math.min(6,P.length);
 c.frame(`<div class="xbar"><span>افتح ${c.AN(N)} صناديق</span><span>🪙 <b id="co">٠</b></span></div><div class="chests">${P.map((_,k)=>`<button class="chest" data-k="${k}" aria-label="صندوق">؟</button>`).join("")}</div><div id="tr" class="prompt" style="min-height:120px;margin-top:12px"><span class="q">اختر صندوقًا</span></div>`);
 document.querySelectorAll("#app .chest").forEach(b=>b.onclick=()=>{if(b.classList.contains("open")||document.getElementById("y"))return;const x=P[+b.dataset.k];b.classList.add("open");b.innerHTML=c.AR(x.w);
  document.getElementById("tr").innerHTML=`<span class="q">اقرأ ما في الصندوق</span>${c.AR(x.w)}<div class="row" style="justify-content:center"><button class="btn m" id="y">قرأ صحيحًا</button><button class="btn s" id="n">نعيد</button></div>`;
  const nx=ok=>{opened++;if(ok){coins++;document.getElementById("co").textContent=c.AN(coins)}else c.tts(x.w);document.getElementById("tr").innerHTML=`<span class="q">اختر صندوقًا آخر</span>`;if(opened>=N)c.finish(coins,N)};document.getElementById("y").onclick=()=>nx(1);document.getElementById("n").onclick=()=>nx(0)})});
// ١٤ صعود الجبل
def("climb","⛰️","صعود الجبل","كل إجابة صحيحة خطوة نحو القمة.",okK(3),c=>{const N=8;R(c,{rounds:labelRounds(c,N,4),ocls:"opt lbl",head:(i,sc)=>`<div class="climb" style="--p:${sc/N}"><i></i><b>🧗</b><em>🏁</em></div>`})});
// ١٥ أسرع إصبع
def("fast","⚡","أسرع إصبع","ست خانات: المس الصحيحة بأسرع ما يمكن.",okK(4),c=>{const P=withK(c);let t0=0,best=null;
 R(c,{cls:"opts six",rounds:c.pick(P,8).map(x=>({p:`<span class="q">المس الخانة التي فيها</span>${lab(c,x)}`,opts:mk(c,x,P,6,y=>Kv(c,y),y=>c.AR(y.w)),speak:x.w})),head:()=>`<div class="xbar"><span>أفضل زمن: <b>${best?c.AN((best/1000).toFixed(1))+" ث":"—"}</b></span></div>`,onDraw:()=>{t0=Date.now()},after:ok=>{if(ok){const d=Date.now()-t0;best=best?Math.min(best,d):d}}})});
// ١٦ اسمع واختر
def("listen","👂","اسمع واختر","اسمع الكلمة، ثم اختر ما سمعت.",(l,c)=>short(l)&&okW(4)(l,c),c=>{const P=uniq(c.items.filter(x=>x.w),x=>x.w);
 R(c,{rounds:c.pick(P,8).map(x=>({x,opts:mk(c,x,P,4,y=>y.w,y=>c.AR(y.w))})),prompt:r=>`<button class="btn g" id="say" style="font-size:22px;min-height:64px">🔊 اسمع</button><button class="btn s" id="hint" style="margin-top:8px">لم أسمع؟ أظهر الكلمة</button><div id="hn"></div>`,onDraw:r=>{const s=()=>c.play(c.l.id,c.items.indexOf(r.x)+"-0",r.x.name||r.x.w);document.getElementById("say").onclick=s;document.getElementById("hint").onclick=()=>{document.getElementById("hn").innerHTML=c.AR(r.x.w)};setTimeout(s,250)}})});
// ١٧ البطاقات الدوّارة
def("flipc","🃏","البطاقات الدوّارة","اقرأ البطاقة، ثم اقلبها لتتأكد.",okW(4),c=>{const P=c.pick(uniq(c.items.filter(x=>x.w),x=>x.w),Math.min(10,c.items.length));let i=0,good=0;
 const back=x=>{const k=c.K(x);return k?`<div><span class="q">${c.l.kind==="letters"?"اسمه":"الجواب"}</span><br>${labS(c,x)}</div>`:`<div><span class="q">هل قرأتها صحيحة؟</span></div>`};
 const draw=()=>{if(i>=P.length)return c.finish(good,P.length);const x=P[i];c.frame(`<div class="flip" id="fl"><div class="fc"><div class="fa">${c.AR(x.w)}</div><div class="fb2">${back(x)}</div></div></div><div class="row" style="justify-content:center"><button class="btn s" id="tf">اقلب البطاقة</button><button class="btn m" id="y">قرأتها</button><button class="btn s" id="n">نعيد</button></div>`,P.map((_,k)=>`<i class="${k<i?"ok":k===i?"cur":""}"></i>`).join(""));
  document.getElementById("tf").onclick=()=>document.getElementById("fl").classList.toggle("on");document.getElementById("y").onclick=()=>{good++;i++;draw()};document.getElementById("n").onclick=()=>{c.tts(x.w);document.getElementById("fl").classList.add("on");setTimeout(()=>{i++;draw()},1200)}};draw()});
// ١٨ قطار التصنيف
const fewGroups=c=>{const g=groups(c),k=Object.keys(g);return k.length>=2&&k.length<=4&&k.every(x=>g[x].length>=2)};
def("train","🚂","قطار التصنيف","ضع كل خانة في عربتها الصحيحة.",(l,c)=>short(l)&&fewGroups(c),c=>{const G=groups(c),keys=Object.keys(G);
 R(c,{cls:"wagons",ocls:"wagon",rounds:c.pick(withK(c),10).map(x=>({p:`<span class="loco"><span style="font-size:42px">🚂</span>${c.AR(x.w)}</span><span class="q">في أي عربة نضعها؟</span>`,style:`--n:${keys.length}`,opts:keys.map(k=>({h:G[k][0]&&c.K(G[k][0]).ar?c.AR(k):c.esc(k),ok:k===Kv(c,x)})),speak:x.w}))})});
// ١٩ الكلمة الغامضة
def("blur","🌫️","الكلمة الغامضة","الكلمة تتضح شيئًا فشيئًا: أجب قبل أن تتضح.",okK(3),c=>R(c,{rounds:labelRounds(c,8,4).map(r=>({...r,pc:"blur"})),ocls:"opt lbl",onDraw:()=>{requestAnimationFrame(()=>requestAnimationFrame(()=>{const p=document.querySelector("#app .prompt.blur");p&&p.classList.add("clear")}))}}));
// ٢٠ الأبواب الثلاثة
def("doors","🚪","الأبواب الثلاثة","افتح الباب الذي يخفي الجواب الصحيح.",okK(3),c=>{const P=withK(c);R(c,{cls:"doors",ocls:"door",rounds:c.pick(P,6).map(x=>({p:`<span class="q">أيّ باب فيه</span>${lab(c,x)}`,opts:mk(c,x,P,3,y=>Kv(c,y),y=>c.AR(y.w)),speak:x.w}))})});
})();
