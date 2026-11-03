(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,TOUCH=matchMedia('(hover:none),(pointer:coarse)').matches,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const LITE=new URLSearchParams(location.search).has('lite');root.classList.toggle('touch',TOUCH);if(LITE)root.classList.add('lite');
const D=JSON.parse($('#menu-data').textContent),SETS=D.sets,ITEMS={};D.items.forEach(i=>ITEMS[i.id]=i);
const SQUARE='https://creamcafe.square.site/s/order';
const money=c=>'$'+(c/100).toFixed(2);
const DRINK=new Set(['Espresso Bar','Coffee Bar','Tea Bar','Energy Bar','Health Bar','Drink Specials','Dirty Sodas']);
// ---------- hours (America/New_York) ----------
const HOURS={glassboro:{name:'Glassboro',addr:'211 High Street West',d:[[420,840],[420,840],[420,840],[420,840],[420,840],[420,840],[420,840]],menu:[450,839]},
 hammonton:{name:'Hammonton',addr:'212 Bellevue Ave',d:[[480,900],[360,900],[360,900],[360,900],[360,900],[360,900],[420,900]]}};
const nowNY=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
 return{dow:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),min:(+p.hour%24)*60+ +p.minute}};
const fmt=m=>{let h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM';h=h%12||12;return h+(mm?':'+String(mm).padStart(2,'0'):'')+' '+ap};
const win=(loc,dow)=>{const L=HOURS[loc],[o,c]=L.d[dow];return L.menu?[Math.max(o,L.menu[0]),Math.min(c-15,L.menu[1])]:[o,c-15]};
function slots(loc){const n=nowNY(),[a,b]=win(loc,n.dow),out={today:[],tomorrow:[],open:false};const L=HOURS[loc].d[n.dow];out.open=n.min>=L[0]&&n.min<L[1];
 let s=Math.max(a,Math.ceil((n.min+15)/15)*15);for(let m=s;m<=b;m+=15)out.today.push(m);
 const [ta,tb]=win(loc,(n.dow+1)%7);for(let m=ta;m<=tb;m+=15)out.tomorrow.push(m);return out}
function status(loc){const n=nowNY(),[o,c]=HOURS[loc].d[n.dow];return n.min>=o&&n.min<c?['open','Open now until '+fmt(c)]:['closed',n.min<o?'Closed now. Opens '+fmt(o):'Closed now. Order ahead for tomorrow']}
// ---------- state ----------
const KEY='cream-cart-v1';let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}S=S&&S.lines?S:{loc:'glassboro',lines:[],time:''};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
// ---------- location ----------
function renderLoc(){$$('.loc').forEach(b=>{const k=b.dataset.loc;b.setAttribute('aria-pressed',k===S.loc);const [c,t]=status(k);const st=$('.st',b);st.className='st '+c;st.textContent=t});
 $('#hamnote').classList.toggle('hidden',S.loc!=='hammonton')}
$$('.loc').forEach(b=>b.addEventListener('click',()=>{S.loc=b.dataset.loc;S.time='';save();renderLoc();renderCart()}));
// ---------- tabs + search ----------
const tabs=$$('.tabs a');tabs.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const t=$(a.getAttribute('href'));scrollTo({top:t.getBoundingClientRect().top+scrollY-140,behavior:RM?'auto':'smooth'})}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){tabs.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on)a.scrollIntoView({block:'nearest',inline:'center'})})}}),{rootMargin:'-160px 0px -60% 0px'});
$$('.sec').forEach(s=>io.observe(s));
let st=0;$('#q').addEventListener('input',e=>{clearTimeout(st);st=setTimeout(()=>{const q=e.target.value.trim().toLowerCase();$$('.card').forEach(c=>c.classList.toggle('hidden',!!q&&!c.dataset.s.includes(q)));$$('.sec').forEach(s=>s.classList.toggle('hidden',!$$('.card:not(.hidden)',s).length));$('#noresults').classList.toggle('hidden',!!$$('.card:not(.hidden)').length)},120)});
// ---------- customizer ----------
const cust=$('#cust'),scrim=$('.scrim');let cur=null,lastFocus=null;
const BASE={'Espresso Bar':'#6b3d22','Coffee Bar':'#4a2a17','Tea Bar':'#b8834e','Energy Bar':'#f0a030','Health Bar':'#c0506a','Drink Specials':'#9a5a2c','Dirty Sodas':'#7a3a1c'};
const NAMEC=[[/matcha|green tea|halla|goddess/i,'#8fb25a'],[/chai|london/i,'#c08a55'],[/pink|berry|coral/i,'#e2668c'],[/blue|ocean/i,'#3b8fd9'],[/peach/i,'#f6a46a'],[/purple/i,'#8a5ac4'],[/rowan|sunrise|lemonade/i,'#f4b42f'],[/black tea|iced tea/i,'#8a4a1c'],[/chocolate|cocoa/i,'#5a2e18'],[/health nut/i,'#b48a5a'],[/pumpkin|orchard|dulce/i,'#b56a30']];
const MILK={'Whole Milk':'#f8f2e6','Skim Milk':'#f3f3ee','Half & Half':'#f4e6c6','Almond Milk':'#ecdcc0','Oat Milk':'#e9d5ad','Coconut Milk':'#fbf8f1'};
const FLAV=[[/caramel|toffee|maple|brown sugar|cookie/i,'#c47a2c'],[/dark chocolate|mocha/i,'#4a2414'],[/white/i,'#f1e4c8'],[/vanilla|marshmallow|banana|cane/i,'#f0dca0'],[/rasp|straw|cherry|watermelon|hibiscus|guava/i,'#d0304a'],[/blue/i,'#2f7fd6'],[/apple|kiwi|pistachio/i,'#8bc34a'],[/lavender/i,'#a68ad4'],[/pumpkin|mango|pineapple|peach|pear|tiramisu/i,'#e08a3a']];
const pick=(arr,s,d)=>{for(const [r,c] of arr)if(r.test(s))return c;return d};
function cupSVG(){return `<div class="cupv" aria-hidden="true"><svg viewBox="0 0 200 300"><defs><clipPath id="cc"><path d="M34 62 L166 62 L150 290 Q100 298 50 290 Z"/></clipPath>
<linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--milk)"/><stop offset=".75" stop-color="var(--milk)"/><stop offset="1" stop-color="var(--milk)" stop-opacity="0"/></linearGradient>
<linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient></defs>
<g class="steam" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M80 40 q-10 -15 0 -30"/><path d="M100 36 q10 -15 0 -30"/><path d="M120 40 q-10 -15 0 -30"/></g>
<g class="whip"><path d="M58 64 q-4 -22 20 -24 q6 -22 26 -16 q18 -10 28 10 q20 4 12 30 Z" fill="#fffaf0" stroke="#eadfcb" stroke-width="2"/></g>
<g clip-path="url(#cc)"><rect width="200" height="300" fill="#fff" opacity=".18"/>
<rect class="lyr liq" x="0" y="80" width="200" height="230" fill="var(--liq)"/>
<rect class="lyr milk" x="0" y="80" width="200" height="0" fill="url(#mg)"/>
<path class="drz" d="M40 90 Q60 150 48 200 Q44 240 60 285 M160 90 Q140 150 152 200 Q156 240 140 285 M100 86 Q110 140 96 190" fill="none" stroke="var(--syr)" stroke-width="7" stroke-linecap="round" opacity=".9"/>
<g class="ice"></g>
<rect class="foamc" x="0" y="66" width="200" height="34" fill="var(--foam,#f6ecd8)"/>
<rect class="paper lyr" width="200" height="300" fill="#fbf7ef" opacity="0"/>
<circle class="logo lyr" cx="100" cy="175" r="30" fill="#2f4636" opacity="0"/>
</g>
<path d="M34 62 L166 62 L150 290 Q100 298 50 290 Z" fill="url(#gl)" stroke="rgba(255,255,255,.7)" stroke-width="2.5"/>
<g class="lid"><rect x="26" y="54" width="148" height="12" rx="6" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.8)"/></g>
<rect class="straw" x="112" y="0" width="9" height="140" rx="3" fill="#1d1d1d" transform="rotate(8 116 70)"/>
</svg></div>`}
const ICE=[[50,110,-12],[96,104,18],[128,120,-6],[64,150,24],[112,160,-20],[80,196,10],[126,206,30],[58,236,-18]];
function updateCup(){const v=$('.cupv',cust);if(!v||!cur)return;const it=cur.item,sk=it.sk[cur.sk]||['',0],nm=sk[0];
 const oz=+(nm.match(/(\d+)\s*oz/i)||[])[1]||16;const hot=/hot/i.test(nm)||(!/iced/i.test(nm)&&/hot|house blend|americano|espresso$|cappuccino|flat white|assorted hot/i.test(it.n)&&!/iced|cold/i.test(it.n));
 const sel=[];for(const [sid,set] of Object.entries(cur.ch))set.forEach(i=>sel.push([SETS[sid].n,SETS[sid].ch[i].n]));
 const milk=sel.find(([g,c])=>/milk/i.test(g)&&MILK[c]);const flav=sel.filter(([g,c])=>/flavor|drizzle/i.test(g+c)&&!/sugar|splenda/i.test(c));
 const foam=sel.find(([g,c])=>/cold foam/i.test(c)),whip=sel.find(([g,c])=>/^whip cream$/i.test(c)),noWhip=sel.find(([g,c])=>/no whipped/i.test(c));
 const ice=sel.find(([g,c])=>/ice options/i.test(g));
 v.classList.toggle('hot',hot);v.classList.toggle('syr',!!flav.length);v.classList.toggle('foam',!!foam);v.classList.toggle('whipd',!!whip||(/hot chocolate/i.test(it.n)&&!noWhip&&hot));
 const sc=Math.max(.78,Math.min(1.12,.8+(oz-12)*.035));$('svg',v).style.transform=`scale(${sc})`;
 v.style.setProperty('--liq',pick(NAMEC,it.n,BASE[it.c]||'#6b3d22'));v.style.setProperty('--milk',milk?MILK[milk[1]]:'transparent');
 v.style.setProperty('--syr',flav.length?pick(FLAV,flav[flav.length-1][1],'#c9762f'):'transparent');
 if(foam)v.style.setProperty('--foam',pick(FLAV,foam[1],'#f6ecd8')==='#c47a2c'?'#ecd2ae':(/straw/i.test(foam[1])?'#f7c9cf':/lavender/i.test(foam[1])?'#e4d6f2':/pumpkin/i.test(foam[1])?'#f1cfa4':'#f8efdc'));
 const fillTop=hot?72:90;const liq=$('.liq',v),mk=$('.milk',v);liq.setAttribute('y',fillTop);mk.setAttribute('y',fillTop);mk.setAttribute('height',milk?110:0);
 $('.paper',v).setAttribute('opacity',hot?1:0);$('.logo',v).setAttribute('opacity',hot?1:0);
 const n=hot?0:ice?(/extra/i.test(ice[1])?8:3):5;$('.ice',v).innerHTML=ICE.slice(0,n).map(([x,y,r])=>`<rect x="${x}" y="${y}" width="26" height="26" rx="5" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.9)" transform="rotate(${r} ${x+13} ${y+13})"/>`).join('');
}
function unit(){const it=cur.item;let p=(it.sk[cur.sk]||[0,0])[1];for(const [sid,set] of Object.entries(cur.ch))set.forEach(i=>p+=SETS[sid].ch[i].p);return p}
function valid(){return cur.item.m.every(sid=>(cur.ch[sid]?.size||0)>=SETS[sid].min)}
function refresh(){$('#cprice').textContent=money(unit()*cur.qty);$('#cqty').textContent=cur.qty;const ok=valid();$('#cadd').disabled=!ok;$('#cadd').textContent=ok?'Add to order':'Pick required options';
 cur.item.m.forEach(sid=>{const r=$(`[data-req="${sid}"]`,cust);if(r)r.classList.toggle('hidden',(cur.ch[sid]?.size||0)>=SETS[sid].min)});updateCup()}
function open(id,el){const it=ITEMS[id];if(!it)return;lastFocus=document.activeElement;cur={item:it,sk:0,ch:{},qty:1,el};
 const isDrink=DRINK.has(it.c);const img=it.im?`<img src="${it.im}" alt="${it.n}" width="400" height="400">`:'';
 $('.vis',cust).style.setProperty('--vb',isDrink?'#2f4636':'#c9762f');
 $('.vis',cust).innerHTML=`<div class="bigt">${isDrink?'BUILD':'FRESH'}</div>`+(isDrink?cupSVG():img||`<div class="bigt" style="color:rgba(255,255,255,.5)">${it.n.split(' ')[0]}</div>`);
 let h=`<h2 id="ctitle">${it.n}</h2>${it.d?`<p class="desc">${it.d}</p>`:''}`;
 if(it.sk.length>1)h+=`<fieldset class="grp"><legend>${isDrink?'Size':'Choose'}<span class="req hidden"></span></legend><div class="chips">${it.sk.map((s,i)=>`<label class="chip"><input type="radio" name="sku" value="${i}" ${i?'':'checked'}><span>${s[0]} <em>${money(s[1])}</em></span></label>`).join('')}</div></fieldset>`;
 it.m.forEach(sid=>{const m=SETS[sid],radio=m.max===1,lim=m.max>1?`Up to ${m.max}`:m.max===0?'Choose any':'Choose 1';
  h+=`<fieldset class="grp" data-set="${sid}"><legend>${m.n}<small>${m.min?'Required. ':''}${lim}</small><span class="req" data-req="${sid}">${m.min?'Required':''}</span></legend><div class="chips">${m.ch.map((c,i)=>`<label class="chip ${i>=12?'hidden x12':''}"><input type="${radio?'radio':'checkbox'}" name="s${sid}" value="${i}"><span>${c.n}${c.p?` <em>+${money(c.p)}</em>`:''}</span></label>`).join('')}${m.ch.length>12?`<button type="button" class="more">Show all ${m.ch.length}</button>`:''}</div></fieldset>`});
 $('.scroll',cust).innerHTML=h;
 $$('input[name=sku]',cust).forEach(r=>r.addEventListener('change',()=>{cur.sk=+r.value;refresh()}));
 $$('fieldset[data-set]',cust).forEach(f=>{const sid=f.dataset.set,m=SETS[sid];$$('input',f).forEach(inp=>inp.addEventListener('change',()=>{
  const s=cur.ch[sid]||(cur.ch[sid]=new Set()),i=+inp.value;if(inp.type==='radio'){s.clear();s.add(i)}else if(inp.checked){if(m.max>1&&s.size>=m.max){inp.checked=false;return}s.add(i)}else s.delete(i);refresh()}));
  const mb=$('.more',f);if(mb)mb.addEventListener('click',()=>{$$('.x12',f).forEach(x=>x.classList.remove('hidden'));mb.remove()})});
 cust.classList.add('on');scrim.classList.add('on');cust.setAttribute('aria-hidden','false');cust.inert=false;document.body.style.overflow='hidden';refresh();setTimeout(()=>$('.x',cust).focus(),50)}
function closeAll(){[cust,$('#cart'),$('#chk')].forEach(s=>{s.classList.remove('on');s.setAttribute('aria-hidden','true');s.inert=true});scrim.classList.remove('on');document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
scrim.addEventListener('click',closeAll);$$('.sheet .x').forEach(b=>b.addEventListener('click',closeAll));addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
$('#cminus').addEventListener('click',()=>{cur.qty=Math.max(1,cur.qty-1);refresh()});$('#cplus').addEventListener('click',()=>{cur.qty=Math.min(20,cur.qty+1);refresh()});
$$('.card').forEach(c=>{const id=c.dataset.id;$$('.hit,.add',c).forEach(b=>b.addEventListener('click',()=>open(id,c)))});
// ---------- cart ----------
const cartBtn=$('.cartbtn');
function fly(fromEl){if(RM||LITE||!fromEl)return;const src=$('img',fromEl);const r=(src||fromEl).getBoundingClientRect(),t=cartBtn.getBoundingClientRect();
 const f=document.createElement(src?'img':'div');if(src)f.src=src.currentSrc||src.src;else f.style.background='#2f4636';f.className='fly';document.body.appendChild(f);
 const x0=r.left+r.width/2-35,y0=r.top+r.height/2-35,x1=t.left+t.width/2-35,y1=t.top+t.height/2-35;
 f.animate([{transform:`translate(${x0}px,${y0}px) scale(1)`,opacity:1},{transform:`translate(${(x0+x1)/2}px,${Math.min(y0,y1)-120}px) scale(.8)`,opacity:1,offset:.5},{transform:`translate(${x1}px,${y1}px) scale(.25)`,opacity:.6}],{duration:800,easing:'cubic-bezier(.5,0,.3,1)'}).onfinish=()=>{f.remove();cartBtn.classList.remove('bump');void cartBtn.offsetWidth;cartBtn.classList.add('bump')}}
$('#cadd').addEventListener('click',()=>{if(!valid())return;const ch={};for(const [k,s] of Object.entries(cur.ch))if(s.size)ch[k]=[...s].sort((a,b)=>a-b);
 const key=cur.item.id+'|'+cur.sk+'|'+JSON.stringify(ch);const ex=S.lines.find(l=>l.key===key);if(ex)ex.qty+=cur.qty;else S.lines.push({key,id:cur.item.id,sk:cur.sk,ch,qty:cur.qty});
 save();const el=cur.el;closeAll();renderCart();fly(el)});
const lineUnit=l=>{const it=ITEMS[l.id];let p=(it.sk[l.sk]||[0,0])[1];for(const [k,a] of Object.entries(l.ch))a.forEach(i=>p+=(SETS[k]?.ch[i]?.p||0));return p};
const lineDesc=l=>{const it=ITEMS[l.id],parts=[];if(it.sk.length>1)parts.push(it.sk[l.sk][0]);for(const [k,a] of Object.entries(l.ch))a.forEach(i=>SETS[k]&&parts.push(SETS[k].ch[i].n));return parts.join(', ')};
function renderCart(){S.lines=S.lines.filter(l=>ITEMS[l.id]&&l.qty>0);const n=S.lines.reduce((a,l)=>a+l.qty,0),sub=S.lines.reduce((a,l)=>a+lineUnit(l)*l.qty,0);
 $('.n',cartBtn).textContent=n;$('.t',cartBtn).textContent=n?money(sub):'Cart';
 const L=$('#lines');L.innerHTML=S.lines.length?S.lines.map((l,i)=>{const it=ITEMS[l.id];return `<div class="line"><${it.im?`img src="${it.im}" alt="" width="56" height="56" loading="lazy"`:'div class="ph"'}>${it.im?'':it.n[0]+'</div>'}<div><b>${it.n}</b><small>${lineDesc(l)||'&nbsp;'}</small><small>${money(lineUnit(l))} each</small></div><div class="r"><div class="qty"><button type="button" data-i="${i}" data-d="-1" aria-label="Remove one ${it.n}">${l.qty>1?'−':'×'}</button><b>${l.qty}</b><button type="button" data-i="${i}" data-d="1" aria-label="Add one ${it.n}">+</button></div><small><strong>${money(lineUnit(l)*l.qty)}</strong></small></div></div>`}).join(''):'<p class="empty">Your order is empty. Tap any item to start.</p>';
 $$('button[data-i]',L).forEach(b=>b.addEventListener('click',()=>{const l=S.lines[+b.dataset.i];l.qty+= +b.dataset.d;save();renderCart()}));
 $('#sub').textContent=money(sub);$('#ploc').textContent='CREAM Cafe '+HOURS[S.loc].name+', '+HOURS[S.loc].addr;
 const sl=slots(S.loc),sel=$('#ptime');let h='';
 if(sl.today.length)h+=`<optgroup label="Today">${sl.today.map((m,i)=>`<option value="t${m}">${i===0&&sl.open?'ASAP, about '+fmt(m):fmt(m)}</option>`).join('')}</optgroup>`;
 else h+=`<option disabled value="">Today: closed. Order ahead for tomorrow</option>`;
 h+=`<optgroup label="Tomorrow">${sl.tomorrow.map(m=>`<option value="n${m}">Tomorrow ${fmt(m)}</option>`).join('')}</optgroup>`;sel.innerHTML=h;
 if(S.time&&$(`option[value="${S.time}"]`,sel))sel.value=S.time;else{const f=$('option:not([disabled])',sel);S.time=f?f.value:''}
 $('#closedmsg').classList.toggle('hidden',!!sl.today.length);$('#gochk').disabled=!S.lines.length;save()}
$('#ptime').addEventListener('change',e=>{S.time=e.target.value;save()});
cartBtn.addEventListener('click',()=>{lastFocus=cartBtn;renderCart();const c=$('#cart');c.classList.add('on');c.setAttribute('aria-hidden','false');c.inert=false;scrim.classList.add('on');document.body.style.overflow='hidden';setTimeout(()=>$('.x',c).focus(),50)});
$('#gochk').addEventListener('click',()=>{$('#cart').classList.remove('on');$('#cart').inert=true;const c=$('#chk');const sub=S.lines.reduce((a,l)=>a+lineUnit(l)*l.qty,0);const o=$(`#ptime option[value="${S.time}"]`);
 $('#sum').innerHTML=S.lines.map(l=>`<div class="tot"><span>${l.qty} × ${ITEMS[l.id].n}${lineDesc(l)?`<small style="display:block;opacity:.7;font-size:12px">${lineDesc(l)}</small>`:''}</span><span>${money(lineUnit(l)*l.qty)}</span></div>`).join('')+`<div class="tot big"><span>Subtotal</span><span>${money(sub)}</span></div><div class="tot"><span>Tax</span><span>Calculated at checkout</span></div><div class="tot"><span>Pickup</span><span>${HOURS[S.loc].name}, ${o?o.textContent:''}</span></div>`;
 c.classList.add('on');c.setAttribute('aria-hidden','false');c.inert=false;setTimeout(()=>$('.x',c).focus(),50)});
renderLoc();renderCart();setInterval(()=>{renderLoc()},60000);
window.CREAM={S,slots,HOURS};
})();
