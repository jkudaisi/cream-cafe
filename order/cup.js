(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,TOUCH=matchMedia('(hover:none),(pointer:coarse)').matches;
const NS='http://www.w3.org/2000/svg';
// ---- data-driven drink profiles (by item name, then category) ----
const PROF=[
[/rowan/i,{a:'#f7b23b',b:'#d8302f',fizz:1}],[/green goddess/i,{a:'#a6dc5c',b:'#3c9a3a',fizz:1}],[/pink starburst/i,{a:'#f9a0c2',b:'#e0457a',fizz:1}],
[/blue spritz/i,{a:'#62bdf4',b:'#1f5fd0',fizz:1}],[/peach ring/i,{a:'#ffc29a',b:'#ff7f6a',fizz:1}],[/purple haze/i,{a:'#c08ce8',b:'#6a3aa8',fizz:1}],
[/health nut/i,{a:'#c99d6b',blend:1}],[/berry bliss/i,{a:'#b8336a',blend:1}],[/halla green/i,{a:'#8cc152',blend:1}],[/coral crush/i,{a:'#ff8a72',blend:1}],[/ocean eyes/i,{a:'#55b2e0',blend:1}],
[/toffee fizz/i,{a:'#9a5a28',b:'#5a2a10',fizz:1}],[/dr\.? dream/i,{a:'#7a2a1c',b:'#4a120c',fizz:1}],[/mellow/i,{a:'#e2cb62',b:'#c49a2a',fizz:1}],
[/matcha/i,{a:'#93b55a',milky:'#c9d99a'}],[/chai/i,{a:'#b9875a',milky:'#d9b48c'}],[/london fog/i,{a:'#9a7a5e',milky:'#cdb9a2'}],
[/assorted hot tea/i,{a:'#b06a2a'}],[/iced black tea/i,{a:'#8a3f12'}],[/iced green tea/i,{a:'#c9bd5c'}],[/tea lemonade/i,{a:'#d0902c',b:'#f2d76a'}],[/^lemonade/i,{a:'#f6e27a'}],
[/hot chocolate|chocolate milk/i,{a:'#5a2e18',milky:'#8a5a3a'}],[/cold brew/i,{a:'#2e180c',milky:'#7a4a2a'}],[/house blend|iced coffee/i,{a:'#3e2213',milky:'#8a5a38'}],
[/^espresso$|red eye/i,{a:'#2a140a',crema:1}],[/americano/i,{a:'#3f2112',crema:1}],
[/pumpkin|dulce|no tricks|orchard/i,{a:'#7a3f1e',milky:'#d7a06a'}],
[/cappuccino|latte|macchiato|flat white|shaken/i,{a:'#5a301a',milky:'#d8b088'}]];
const CAT={'Energy Bar':{a:'#f4b42f',fizz:1},'Health Bar':{a:'#c0506a',blend:1},'Dirty Sodas':{a:'#7a3a1c',fizz:1},'Tea Bar':{a:'#b8834e'},'Coffee Bar':{a:'#3e2213'},'Espresso Bar':{a:'#5a301a'},'Drink Specials':{a:'#7a3f1e',milky:'#d7a06a'}};
const prof=it=>{for(const [r,p] of PROF)if(r.test(it.n))return p;return CAT[it.c]||{a:'#6b3d22'}};
const MILK={'Whole Milk':'#f8f1e3','Skim Milk':'#f1f2ee','Half & Half':'#f3e3c0','Almond Milk':'#ead6b6','Oat Milk':'#e6cfa2','Coconut Milk':'#fdfbf6'};
const FLAV=[[/caramel|toffee|butterscotch/i,'#c8741f'],[/dark chocolate|mocha/i,'#4a2414'],[/white/i,'#f4ead2'],[/coconut/i,'#fffdf7'],[/vanilla|marshmallow|cane|banana/i,'#f2dc9a'],
[/maple|brown sugar|cookie|hazel|tiramisu/i,'#a8642a'],[/guava/i,'#ff7f6e'],[/watermelon/i,'#ef4a5e'],[/raspberry|cherry|hibiscus/i,'#d6336c'],[/strawberr/i,'#ef5d7a'],
[/blue/i,'#2f7fd6'],[/green apple|kiwi|pistachio|matcha/i,'#8bc34a'],[/lavender/i,'#a68ad4'],[/pumpkin|mango|pineapple|peach|pear|orange/i,'#f08a2a'],[/lemon/i,'#f4d63a'],[/peanut/i,'#c08a4a'],[/chai|spiced/i,'#b9875a']];
const fc=(s,d='#c9762f')=>{for(const [r,c] of FLAV)if(r.test(s))return c;return d};
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const ICE=[[62,112,-12],[104,104,18],[136,122,-6],[74,150,24],[120,160,-20],[88,196,10],[134,206,30],[68,236,-18]];
let V=null,prev={};
function mount(vis,it){prev={};const isDrink=true;
 vis.insertAdjacentHTML('beforeend',`<div class="cupv" aria-hidden="true"><div class="tilt"><div class="bob"><div class="pulse"><svg viewBox="0 0 220 300">
<defs><clipPath id="ccI"><path d="M44 62 L176 62 L160 290 Q110 298 60 290 Z"/></clipPath><clipPath id="ccH"><path d="M42 92 L178 92 L170 272 Q110 288 50 272 Z"/></clipPath>
<linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop class="s1" offset="0"/><stop class="s2" offset="1"/></linearGradient>
<linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".22" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient>
<radialGradient id="cr"><stop offset="0" stop-color="#e8b878"/><stop offset="1" stop-color="#a8642a"/></radialGradient></defs>
<g class="steam" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M86 66 q-10 -15 0 -30"/><path d="M110 60 q10 -15 0 -30"/><path d="M134 66 q-10 -15 0 -30"/></g>
<path class="handle" d="M176 130 q44 0 42 44 q-2 44 -46 44" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="12"/>
<g class="inside" clip-path="url(#ccI)"><rect width="220" height="300" fill="#fff" opacity=".14"/>
<g class="liqg"><rect class="liq" x="0" y="92" width="220" height="230" fill="url(#lg)"/>
<rect class="milk" x="0" y="92" width="220" height="0" opacity=".95"/>
<rect class="dark" x="0" y="92" width="220" height="230" fill="#1a0b04" opacity="0"/>
<g class="swirls"></g><g class="bub"></g><g class="ice"></g><g class="drop"></g>
<path class="surf" d="M0 92 Q55 86 110 92 T220 92 L220 100 L0 100 Z"/>
<g class="foamc"><rect x="0" y="80" width="220" height="30"/></g>
<g class="art"><ellipse cx="110" cy="100" rx="56" ry="9" fill="#f6ead4"/><path d="M110 104 c-10 -8 -20 -2 -14 -9 c5 -5 12 0 14 4 c2 -4 9 -9 14 -4 c6 7 -4 1 -14 9z" fill="#b9875a" opacity=".7"/></g>
<ellipse class="crema" cx="110" cy="96" rx="70" ry="8" fill="url(#cr)"/></g></g>
<path class="vessel" d="M44 62 L176 62 L160 290 Q110 298 60 290 Z" fill="url(#gl)" stroke="rgba(255,255,255,.8)" stroke-width="2.5"/>
<g class="lid"><rect x="36" y="54" width="148" height="12" rx="6" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.85)"/></g>
<g class="whip"><path d="M64 70 q-6 -24 20 -26 q6 -24 28 -17 q20 -11 30 11 q22 4 13 32 Z" fill="#fffaf0" stroke="#eadfcb" stroke-width="2"/></g>
<path class="drz" d="M66 62 l14 -10 l12 12 l14 -12 l12 12 l14 -12 l12 12 l14 -10" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<g class="dust"></g><g class="rim"></g>
<rect class="straw" x="122" y="0" width="9" height="140" rx="3" fill="#1d1d1d" transform="rotate(8 126 70)"/>
<rect class="pour" x="104" y="0" width="12" height="0" rx="6" fill="#2a1208"/>
</svg></div></div></div></div><div class="tags" aria-live="polite"></div>`);
 V=vis.querySelector('.cupv');
 const d=V.querySelector('.dust');for(let i=0;i<26;i++)el('circle',{cx:70+Math.random()*80,cy:52+Math.random()*16,r:1.6,fill:'#8a4a1c'},d);
 if(!TOUCH&&!RM){const t=V.querySelector('.tilt');let raf=0,tx=0,ty=0;vis.addEventListener('pointermove',e=>{const r=vis.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*24;ty=((e.clientY-r.top)/r.height-.5)*-14;if(!raf)raf=requestAnimationFrame(()=>{raf=0;t.style.transform=`rotateY(${tx}deg) rotateX(${ty}deg)`})},{passive:true});vis.addEventListener('pointerleave',()=>t.style.transform='')}
}
function anim(e,k,o){if(RM||!e.animate)return;e.animate(k,o)}
function dropBits(kind,n,color){const g=V.querySelector('.drop'),top=V._top;for(let i=0;i<n;i++){const x=80+Math.random()*60,e=kind==='sugar'?el('rect',{x,y:40,width:9,height:9,rx:2,fill:'#fffdf5',stroke:'#e9dcc4'},g):el('circle',{cx:x,cy:40,r:kind==='scoop'?14:5,fill:color},g);
 anim(e,[{transform:'translateY(-40px)',opacity:1},{transform:`translateY(${top-40+8}px)`,opacity:1,offset:.6},{transform:`translateY(${top-30}px)`,opacity:0}],{duration:900+i*120,easing:'cubic-bezier(.5,0,.8,.6)',fill:'forwards'});setTimeout(()=>e.remove(),1300+i*120)}
 const sp=el('ellipse',{cx:110,cy:top,rx:10,ry:3,fill:'none',stroke:'#fff','stroke-width':2},g);anim(sp,[{transform:'scale(.2)',opacity:0,transformOrigin:'110px '+top+'px'},{transform:'scale(.2)',opacity:0,offset:.55},{transform:'scale(3)',opacity:.9,offset:.7},{transform:'scale(4)',opacity:0}],{duration:1200});setTimeout(()=>sp.remove(),1300)}
function update(it,sk,sel){if(!V||!V.isConnected)return;const P=prof(it),nm=sk||'';
 const iced=/iced/i.test(nm)||P.fizz||P.blend||(!/hot/i.test(nm)&&/iced|cold|lemonade|shaken/i.test(it.n));const hot=!iced;
 const oz=+(nm.match(/(\d+)\s*oz/i)||[])[1]||(/triple/i.test(nm)?14:/double/i.test(nm)?12:/single/i.test(nm)?10:20);
 const by=g=>sel.filter(([s])=>g.test(s)).map(x=>x[1]);
 const milk=by(/milk options/i).find(c=>MILK[c]),noMilk=by(/milk options/i).includes('No Milk');
 const flav=[...by(/flavor/i),...by(/chai flavors|tea flavors/i)],tops=by(/topping/i),sug=by(/sugar/i),shot=by(/extra shot/i),ice=by(/ice options/i)[0];
 const rb=by(/redbull/i)[0],add=[...by(/smoothie|spritzer additions/i)],moc=by(/matcha or chai/i)[0],roast=by(/roast/i)[0],lemon=by(/^lemon$/i).length,noWhip=by(/whipped cream/i).length,half=by(/half-sweet/i).length;
 let base=P.a,low=P.b||P.a;if(moc)base=low=/matcha/i.test(moc)?'#93b55a':'#b9875a';if(roast)base=low=/dark/i.test(roast)?'#24120a':/decaf/i.test(roast)?'#5a3a22':'#3e2213';
 const top=hot?104:(oz>=24?92:100);V._top=top;
 V.classList.toggle('hot',hot);const bt=V.parentNode.querySelector('.bigt');if(bt&&!P.fizz&&!P.blend)bt.textContent=hot?'HOT':'ICED';V.querySelector('.inside').setAttribute('clip-path',hot?'url(#ccH)':'url(#ccI)');
 const ves=V.querySelector('.vessel');ves.setAttribute('d',hot?'M42 92 L178 92 L170 272 Q110 288 50 272 Z':'M44 62 L176 62 L160 290 Q110 298 60 290 Z');
 V.querySelector('.handle').style.opacity=hot?1:0;V.querySelector('.lid').style.opacity=hot?0:1;V.querySelector('.straw').style.opacity=hot||P.crema?0:1;
 const s1=V.querySelector('.s1'),s2=V.querySelector('.s2');s1.setAttribute('stop-color',base);s2.setAttribute('stop-color',low);
 ['liq','milk','dark'].forEach(c=>V.querySelector('.'+c).setAttribute('y',top));V.querySelector('.surf').setAttribute('transform',`translate(0 ${top-92})`);
 const mix=(x,y,t)=>{const h=c=>[1,3,5].map(i=>parseInt(c.substr(i,2),16));const A=h(x),B=h(y);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
 const mcol=P.milky?(milk?mix(P.milky,MILK[milk],.45):noMilk?null:P.milky):(milk?MILK[milk]:null);const mk=V.querySelector('.milk');
 mk.setAttribute('fill',mcol||'transparent');mk.setAttribute('height',mcol?(P.blend?60:hot?120:110):0);
 V.querySelector('.surf').setAttribute('fill',mcol&&!P.fizz?(hot?'#f3e6cf':mcol):base);
 V.querySelector('.art').style.opacity=hot&&mcol&&!P.crema?1:0;V.querySelector('.art').setAttribute('transform',`translate(0 ${top-100})`);
 V.querySelector('.crema').style.opacity=P.crema&&!mcol?1:0;V.querySelector('.crema').setAttribute('transform',`translate(0 ${top-96})`);
 V.querySelector('.dark').setAttribute('opacity',Math.min(.45,shot.length?(/double/i.test(shot[0])?.35:.2):0));
 // flavor swirls
 const sw=V.querySelector('.swirls');const fl=flav.slice(-3);if(sw.dataset.k!==fl.join()){sw.dataset.k=fl.join();sw.innerHTML='';fl.forEach((f,i)=>{const p=el('path',{d:`M${70+i*30} ${top+10} q${i%2?-30:30} 40 0 80 q${i%2?30:-30} 40 0 90`,fill:'none',stroke:fc(f),'stroke-width':9,'stroke-linecap':'round',opacity:.85},sw);p.style.strokeDasharray=300;p.style.strokeDashoffset=RM?0:300;requestAnimationFrame(()=>{p.style.transition='stroke-dashoffset 1.1s ease';p.style.strokeDashoffset=0})})}
 // ice
 const n=hot?0:ice?(/extra/i.test(ice)?8:3):(P.blend?0:5);const ig=V.querySelector('.ice');if(+ig.dataset.n!==n){ig.dataset.n=n;ig.innerHTML=ICE.slice(0,n).map(([x,y,r])=>`<rect x="${x}" y="${y+(top-92)}" width="26" height="26" rx="5" fill="rgba(255,255,255,.5)" stroke="rgba(255,255,255,.95)" transform="rotate(${r} ${x+13} ${y+13})"/>`).join('');[...ig.children].forEach((c,i)=>anim(c,[{transform:c.getAttribute('transform')+' translate(0 -60)',opacity:0},{transform:c.getAttribute('transform'),opacity:1}],{duration:500,delay:i*60,easing:'cubic-bezier(.3,1.5,.5,1)',fill:'backwards'}))}
 // bubbles
 const fizz=P.fizz||rb||/seltzer|lemonade/i.test(add.join());const bg=V.querySelector('.bub');if(!!bg.childElementCount!==!!fizz){bg.innerHTML='';if(fizz)for(let i=0;i<(rb?16:10);i++){const c=el('circle',{cx:60+Math.random()*100,cy:280,r:1.5+Math.random()*2.5,fill:'rgba(255,255,255,.75)'},bg);c.style.animation=RM?'':`rise ${1.8+Math.random()*1.6}s ${Math.random()*2}s linear infinite`}}
 // toppings
 const whip=tops.some(t=>/whip/i.test(t))||(/hot chocolate|green goddess|pink starburst/i.test(it.n)&&!noWhip);V.classList.toggle('whipd',whip);
 const drz=tops.find(t=>/drizzle/i.test(t));const dz=V.querySelector('.drz');dz.setAttribute('stroke',drz?fc(drz):'transparent');dz.setAttribute('transform',`translate(0 ${whip?-14:top-58})`);V.classList.toggle('drzd',!!drz);
 V.classList.toggle('dusted',tops.some(t=>/cinnamon/i.test(t)&&!/foam/i.test(t)));V.querySelector('.dust').setAttribute('transform',`translate(0 ${whip?-8:top-50})`);
 const foam=tops.find(t=>/cold foam/i.test(t));V.classList.toggle('foam',!!foam);const fr=V.querySelector('.foamc rect');fr.setAttribute('y',top-14);fr.setAttribute('fill',foam?(/straw/i.test(foam)?'#f9cdd3':/lavender/i.test(foam)?'#e6d8f4':/pumpkin|brown sugar|cookie|maple|caramel/i.test(foam)?'#f0d2ac':/banana/i.test(foam)?'#fbeeb0':'#fbf3e2'):'transparent');
 const rim=V.querySelector('.rim');rim.innerHTML=lemon?`<g transform="translate(${hot?150:148} ${hot?80:50})"><circle r="20" fill="#f7dc4a" stroke="#e9b820" stroke-width="3"/><path d="M0 0 L0 -17 M0 0 L15 -8 M0 0 L15 8 M0 0 L0 17 M0 0 L-15 8 M0 0 L-15 -8" stroke="#fff3a8" stroke-width="2"/></g>`:'';
 // size spring
 const sc=Math.max(.74,Math.min(1.1,.78+(oz-10)*.022));V.querySelector('svg').style.transform=`scale(${sc})`;
 // event micro animations
 const sig=k=>JSON.stringify(k);const now={sug,shot,add,rb,flav,milk,oz};
 if(sig(sug)!==sig(prev.sug)&&sug.length)dropBits('sugar',Math.min(3,+(sug[sug.length-1].match(/\d/)||[1])[0]));
 if(sig(add)!==sig(prev.add)&&add.length)dropBits('scoop',1,fc(add[add.length-1],/protein/i.test(add[add.length-1])?'#efe2c8':'#c08a4a'));
 if(sig(shot)!==sig(prev.shot)&&shot.length){const p=V.querySelector('.pour');p.setAttribute('height',0);anim(p,[{height:'0px'},{height:top+'px',offset:.4},{height:top+'px',offset:.8},{height:'0px',transform:`translateY(${top}px)`}],{duration:1200})}
 if(sig(now)!==sig(prev)&&prev.oz!==undefined){anim(V.querySelector('.pulse'),[{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:420,easing:'ease-out'});anim(V.querySelector('.surf'),[{transform:`translate(0 ${top-92}px) skewY(0)`},{transform:`translate(0 ${top-92}px) skewY(4deg)`},{transform:`translate(0 ${top-92}px) skewY(-3deg)`},{transform:`translate(0 ${top-92}px) skewY(0)`}],{duration:700})}
 prev=now;
}
window.CUP={mount,update};
})();
