(()=>{
const TOUCH=matchMedia('(hover:none),(pointer:coarse)').matches;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const root=document.documentElement;root.classList.toggle('touch',TOUCH);
const q=new URLSearchParams(location.search);
const lite=q.has('lite')||(()=>{try{const c=document.createElement('canvas');if(!(c.getContext('webgl2')||c.getContext('webgl')))return true}catch(e){return true}
 const m=navigator.deviceMemory,c=navigator.hardwareConcurrency;return TOUCH&&((m&&m<=2)||(c&&c<=2)||(navigator.connection&&navigator.connection.saveData))})();
const S=window.SITE={TOUCH,RM,lite,progress:0,burst:0};
if(lite||RM)root.classList.add('static');
if(lite)root.classList.add('lite');
// pour: splash of cream drops + wobble the cup
const heroImg=document.querySelector('.pan[data-n="01"] .obj img');
document.querySelectorAll('.pour').forEach(b=>b.addEventListener('click',()=>{S.burst=1;[b,heroImg].forEach(el=>{if(!el)return;el.classList.remove('ringing');void el.offsetWidth;el.classList.add('ringing')})}));
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
let lenis=null;
if(!TOUCH&&!RM&&window.Lenis){lenis=new Lenis({lerp:.1,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(!t)return;e.preventDefault();const y=t.getBoundingClientRect().top+scrollY;lenis?lenis.scrollTo(y,{duration:1.4}):scrollTo({top:y,behavior:RM?'auto':'smooth'})}));
const pans=[...document.querySelectorAll('.pan')],N=pans.length;
const hdr=document.querySelector('.hdr'),hud=document.querySelector('.hud'),dots=[...document.querySelectorAll('.dots i')],cnt=document.querySelector('.cnt b');
const setStep=i=>{dots.forEach((d,k)=>d.classList.toggle('on',k===i));if(cnt)cnt.textContent='0'+(i+1);const fg=getComputedStyle(pans[i]).getPropertyValue('--fg');hdr.style.setProperty('--hc',fg);hud.style.setProperty('--hc',fg)};
setStep(0);
if(root.classList.contains('static'))return;
const tl=gsap.timeline({defaults:{ease:'none'}});
pans.forEach((p,i)=>{
 const img=p.querySelector('.obj img'),big=p.querySelector('.big'),copy=p.querySelector('.copy');
 // hold: object drifts, slight spin; headline shrinks behind it
 tl.fromTo(img,{rotation:i%2?4:-4,scale:1},{rotation:i%2?-4:4,scale:1.06,duration:1,immediateRender:!i},i);
 tl.fromTo(big,{scale:1},{scale:.82,duration:1,immediateRender:!i},i);
 if(i<N-1){
  const n=pans[i+1],ni=n.querySelector('.obj img'),nb=n.querySelector('.big'),nc=n.querySelector('.copy');
  const t=i+.55;
  tl.to(img,{yPercent:70,scale:.7,rotation:i%2?-18:18,duration:.45,ease:'power2.in'},t)
    .to(big,{scale:.55,autoAlpha:.2,duration:.45},t)
    .to(copy,{y:-40,autoAlpha:0,duration:.25},t)
    .fromTo(n,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.45,ease:'power2.inOut'},t)
    .fromTo(ni,{yPercent:-90,scale:1.25,rotation:i%2?14:-14},{yPercent:0,scale:1,rotation:i%2?4:-4,duration:.45,ease:'power2.out',immediateRender:false},t)
    .fromTo(nb,{scale:1.35},{scale:1,duration:.45,immediateRender:false},t)
    .fromTo(nc,{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:.25,immediateRender:false},t+.25);
 }
});
gsap.set(pans.slice(1).map(p=>p.querySelector('.copy')),{autoAlpha:0});
let last=-1;
ScrollTrigger.create({trigger:'#story',start:'top top',end:'bottom bottom',scrub:TOUCH?true:.6,animation:tl,
 onUpdate:s=>{S.progress=s.progress;const i=Math.min(N-1,Math.round(s.progress*(N-1)));if(i!==last){last=i;setStep(i)}},
 onLeave:()=>{hdr.style.setProperty('--hc','#2b1a10');hdr.classList.add('solid')},onEnterBack:()=>{last=-1;hdr.classList.remove('solid')}});
// mouse parallax on desktop, rAF-throttled
if(!TOUCH){let mx=0,my=0,tx=0,ty=0,raf=0;addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*30;ty=(e.clientY/innerHeight-.5)*20;if(!raf)raf=requestAnimationFrame(loop)},{passive:true});
 function loop(){mx+=(tx-mx)*.12;my+=(ty-my)*.12;document.querySelectorAll('.obj').forEach(o=>{o.style.setProperty('--mx',mx+'px');o.style.setProperty('--my',my+'px')});raf=Math.abs(tx-mx)+Math.abs(ty-my)>.1?requestAnimationFrame(loop):0}}
})();
