// CURSOR
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px';});
function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();

// NAV SCROLL
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{navbar.classList.toggle('scrolled',window.scrollY>80);});

// TYPEWRITER
const phrases=['Python Developer','NLP Engineer','Backend Developer','AI Enthusiast','Problem Solver'];
let pi=0,ci=0,isDeleting=false;
function typewrite(){
  const phrase=phrases[pi];
  const el=document.getElementById('typewriter');
  if(!isDeleting){el.textContent=phrase.slice(0,ci+1);ci++;}
  else{el.textContent=phrase.slice(0,ci-1);ci--;}
  if(ci===phrase.length){isDeleting=true;setTimeout(typewrite,1800);return;}
  if(ci===0){isDeleting=false;pi=(pi+1)%phrases.length;}
  setTimeout(typewrite,isDeleting?60:100);
}
setTimeout(typewrite,1800);

// PARTICLES
const pc=document.getElementById('particles');
for(let i=0;i<18;i++){
  const p=document.createElement('div');
  p.className='particle';
  p.style.cssText=`left:${Math.random()*100}%;top:${80+Math.random()*20}%;--dur:${4+Math.random()*6}s;--delay:${Math.random()*6}s;opacity:0;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;`;
  pc.appendChild(p);
}

// REVEAL ON SCROLL
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // animate bars
      e.target.querySelectorAll('.lang-bar').forEach(b=>{b.style.width=b.dataset.w+'%';});
      obs.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el=>obs.observe(el));

// COUNTER
function animCounter(el,target,decimals=0){
  let start=0,duration=1800;
  const step=timestamp=>{
    if(!start)start=timestamp;
    const progress=Math.min((timestamp-start)/duration,1);
    const ease=1-Math.pow(1-progress,3);
    el.textContent=(start===0?0:ease*target).toFixed(decimals);
    if(progress<1)requestAnimationFrame(step);
    else el.textContent=target.toFixed(decimals);
  };
  requestAnimationFrame(step);
}
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.counter').forEach(c=>{
        const t=parseFloat(c.dataset.target);
        animCounter(c,t,t%1!==0?1:0);
      });
      cObs.unobserve(e.target);
    }
  });
},{threshold:0.5});
const heroStats=document.querySelector('.hero-stats');
if(heroStats)cObs.observe(heroStats);

// 3D TILT
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`translateY(-8px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});