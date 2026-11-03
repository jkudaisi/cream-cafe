import * as THREE from 'three';
const S=window.SITE;const cv=document.getElementById('drops');
if(cv&&!S.lite&&!S.RM){
 const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!S.TOUCH});
 r.setPixelRatio(S.TOUCH?1:Math.min(devicePixelRatio,1.5));r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;
 const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,100);cam.position.z=20;
 scene.add(new THREE.HemisphereLight(0xfff8ec,0x2f4636,1.5));const d=new THREE.DirectionalLight(0xffffff,2.4);d.position.set(4,8,6);scene.add(d);
 // cream droplet: teardrop lathe
 const pts=[];for(let i=0;i<=20;i++){const t=i/20;pts.push(new THREE.Vector2(Math.max(.001,.45*Math.pow(Math.sin(Math.PI*t),.9)*Math.pow(t,.55)),.7-t*1.4))}
 const dropG=new THREE.LatheGeometry(pts,24);
 const dropM=new THREE.MeshPhysicalMaterial({color:0xfffaf0,emissive:0x6b5a44,emissiveIntensity:.35,roughness:.25,clearcoat:1,clearcoatRoughness:.1});
 // ice cube: beveled box
 const iceG=new THREE.BoxGeometry(.9,.9,.9,3,3,3);{const p=iceG.attributes.position,v=new THREE.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const l=v.length();v.multiplyScalar(1-.12*(l-.45));p.setXYZ(i,v.x,v.y,v.z)}iceG.computeVertexNormals()}
 const iceM=new THREE.MeshPhysicalMaterial({color:0xe8f4f6,roughness:.08,transparent:true,opacity:.32,emissive:0x9fc4cc,emissiveIntensity:.3,clearcoat:1});
 const ND=S.TOUCH?11:18,NI=S.TOUCH?5:8;
 const drops=new THREE.InstancedMesh(dropG,dropM,ND),ice=new THREE.InstancedMesh(iceG,iceM,NI);scene.add(drops,ice);
 const B=[];let W=10,H=10,K=1;
 const reset=(b,top)=>{b.x=(W<H?(Math.random()-.5)*W*.9:(.12+Math.random()*.36)*W);b.y=top?H/2+Math.random()*H*1.2:(Math.random()-.5)*H;b.z=(Math.random()-.5)*8;b.v=1.2+Math.random()*1.6;b.rx=Math.random()*6;b.ry=Math.random()*6;b.sx=(Math.random()-.5)*2;b.sy=(Math.random()-.5)*2;b.s=.45+Math.random()*.4};
 const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w)return;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();H=2*Math.tan(cam.fov*Math.PI/360)*20;W=H*cam.aspect;K=cam.aspect<1?.5:1};
 new ResizeObserver(size).observe(cv);size();for(let i=0;i<ND+NI;i++){B.push({});reset(B[i],false)}
 let vis=true;new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(cv);
 const o=new THREE.Object3D();let lp=0,t0=performance.now();
 r.setAnimationLoop(()=>{const now=performance.now(),dt=Math.min(.05,(now-t0)/1000);t0=now;if(!vis||document.hidden)return;if(S.TOUCH){if(now-(S.scrollT||0)<120){t0=now;return}if(now-(S.lastR||0)<32)return;S.lastR=now}
  const pr=S.progress,vel=Math.abs(pr-lp)/Math.max(dt,.001);lp=pr;
  const want=pr<.25?.6:pr<.45?.35:.2;S.burst*=.985;const dens=Math.min(1,want+S.burst);
  for(let i=0;i<ND+NI;i++){const b=B[i],isD=i<ND,k=isD?i:i-ND,n=isD?ND:NI;b.y-=(b.v+vel*5)*dt*(1+S.burst);b.rx+=b.sx*dt*(isD?.3:1);b.ry+=b.sy*dt;if(b.y<-H/2-1)reset(b,true);
   o.position.set(b.x,b.y,b.z);o.rotation.set(isD?b.rx*.15:b.rx,b.ry,0);o.scale.setScalar(k<Math.round(n*dens)?b.s*K:0);o.updateMatrix();(isD?drops:ice).setMatrixAt(k,o.matrix)}
  drops.instanceMatrix.needsUpdate=true;ice.instanceMatrix.needsUpdate=true;r.render(scene,cam)});
}
