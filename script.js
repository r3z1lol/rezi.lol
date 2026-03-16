document.addEventListener("DOMContentLoaded", () => {

const enter=document.getElementById("enter");
const profile=document.getElementById("profile");
const music=document.getElementById("music");
const banner=document.getElementById("bannerWindow");
const card=document.getElementById("card");

// All features toggleable
const cfg = {
  username:"rezi",
  bio:"Developer • OSINT researcher ",
  avatar:"avatar.png",
  background:"background.gif",
  banner:"banner.gif",
  typing:true,
  profile_glow:true,
  banner_blur:true,
  banner_parallax:true,
  profile_tilt:true,
  cursor_sparkle:false,
  particles:true,
  music:true,
  music_visualizer:false,
  view_counter:false,
  discord:"https://discord.com/users/4264304763146916444",
  twitter:"https://twitter.com/null",
  github:"https://github.com/null"
};

// Initialize page elements
document.getElementById("bio").innerText = cfg.bio;
document.getElementById("avatar").src = cfg.avatar;
document.getElementById("discord").href = cfg.discord;
document.getElementById("twitter").href = cfg.twitter;
document.getElementById("github").href = cfg.github;
document.getElementById("bg").style.backgroundImage = `url(${cfg.background})`;

// Correct banner window background
banner.style.backgroundImage = `url(${cfg.banner})`;
banner.style.backgroundSize = "cover";
banner.style.backgroundPosition = "center";
banner.style.opacity = 0.25;

if(cfg.banner_blur) banner.classList.add("banner-blur");
if(cfg.profile_glow) card.classList.add("glow");
if(cfg.typing) typeUsername(cfg.username);
else document.getElementById("username").innerText = cfg.username;

if(cfg.view_counter){
  let views=localStorage.getItem("views")||0;
  views++;
  localStorage.setItem("views",views);
  document.getElementById("views").innerText="views: "+views;
}

// Click to enter
enter.onclick = ()=>{
  enter.style.opacity="0";
  setTimeout(()=>{enter.style.display="none"; profile.classList.remove("hidden");},1000);
  if(cfg.music) music.play().catch(()=>{});
  if(cfg.particles) startParticles();
  if(cfg.cursor_sparkle) startSparkles();
  if(cfg.banner_parallax) startParallax();
  if(cfg.profile_tilt) startTilt();
  if(cfg.music_visualizer) startVisualizer();
}

// Typing username
function typeUsername(name){
  let i=0; let el=document.getElementById("username");
  function type(){if(i<name.length){el.innerHTML+=name.charAt(i);i++;setTimeout(type,80);}}
  type();
}

// Banner parallax
function startParallax(){
  document.addEventListener("mousemove",(e)=>{
    const x=(e.clientX/window.innerWidth-0.5)*40*2.5;  // 2.5x more movement
    const y=(e.clientY/window.innerHeight-0.5)*40*2.5; // 2.5x more movement
    banner.style.transform=`translate(${x}px,${y}px)`;
  });
}

// Profile tilt
function startTilt(){
  document.addEventListener("mousemove",(e)=>{
    let x=(e.clientX/window.innerWidth-0.5)*15*2.5;  // 2.5x stronger tilt
    let y=(e.clientY/window.innerHeight-0.5)*15*2.5;  // 2.5x stronger tilt
    card.style.transform=`translate(-50%, -50%) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
}

// Cursor sparkles
function startSparkles(){
  document.addEventListener("mousemove",(e)=>{
    let s=document.createElement("div"); s.className="spark";
    s.style.left=e.clientX+"px"; s.style.top=e.clientY+"px";
    document.body.appendChild(s); setTimeout(()=>s.remove(),800);
  });
}

// Snow / particles
function startParticles(){
  const canvas=document.getElementById("particles"); const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  let particles=[];
  for(let i=0;i<100;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:Math.random()*2,speed:Math.random()*0.7});}
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle="white";ctx.fill();p.y+=p.speed;if(p.y>canvas.height)p.y=0;});
    requestAnimationFrame(draw);
  }
  draw();
}

// Music visualizer
function startVisualizer(){
  const canvas=document.getElementById("visualizer"); const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=120;
  const audioCtx=new AudioContext(); const src=audioCtx.createMediaElementSource(music); const analyser=audioCtx.createAnalyser();
  src.connect(analyser); analyser.connect(audioCtx.destination);
  analyser.fftSize=64; const bufferLength=analyser.frequencyBinCount; const data=new Uint8Array(bufferLength);
  function draw(){requestAnimationFrame(draw); analyser.getByteFrequencyData(data); ctx.clearRect(0,0,canvas.width,canvas.height);
    let barWidth=canvas.width/bufferLength; for(let i=0;i<bufferLength;i++){let barHeight=data[i]; ctx.fillStyle="white"; ctx.fillRect(i*barWidth,canvas.height-barHeight,barWidth-2,barHeight);}}
  draw();
}

});