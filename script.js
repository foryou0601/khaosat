const questions={q1:['Nghe nhạc','Xem phim hoặc chương trình giải trí','Chơi game','Đọc sách hoặc truyện','Chơi thể thao','Đi cà phê hoặc dạo phố','Ngủ và nghỉ ngơi'],q2:['Biển','Núi hoặc nơi cắm trại','Một thành phố mới','Quê nhà','Một khu nghỉ dưỡng','Đi nước ngoài','Ở nhà tận hưởng kỳ nghỉ'],q3:['Nghe nhạc để bình tĩnh','Tâm sự với người thân hoặc bạn bè','Đi dạo một mình','Ngủ một giấc','Chơi thể thao','Xem phim hoặc chơi game','Lập kế hoạch giải quyết vấn đề'],q4:['Gia đình','Bạn thân','Người yêu','Nhóm bạn cùng lớp','Đồng nghiệp','Một mình','Ai cũng được, miễn vui']};
Object.entries(questions).forEach(([name,options])=>{document.getElementById(name).innerHTML=options.map((option,i)=>`<label class="choice"><input type="radio" name="${name}" value="${i}" ${i===0?'required':''}><span>${option}</span></label>`).join('')});
// Dán URL Web app Google Apps Script (kết thúc bằng /exec) vào đây.
const MAIL_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby5lwdbQcGNXYvEbW7S_770HHmufAlMDlyKSaxcDUlYFiYWzea9hCISAaeHmNnILagW/exec';
const form=document.getElementById('form'),audio=document.getElementById('bgm'),toggle=document.getElementById('musicToggle');
form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const endpoint=MAIL_WEB_APP_URL.trim();
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint)){
    document.getElementById('error').textContent='Chưa cấu hình nơi nhận câu trả lời. Xem README.md để kết nối email.';return;
  }
  document.getElementById('error').textContent='';
  const values=new FormData(form),payload={fullname:values.get('fullname')};
  for(const key of Object.keys(questions)) payload[key]=questions[key][Number(values.get(key))];
  // Form POST tới Apps Script qua iframe ẩn để không chuyển trang và tránh yêu cầu CORS.
  const transport=document.createElement('form');transport.method='POST';transport.action=endpoint;transport.target='mailReceiver';transport.hidden=true;
  for(const [key,value] of Object.entries(payload)){const input=document.createElement('input');input.name=key;input.value=value;transport.append(input)}
  document.body.append(transport);transport.submit();transport.remove();
  document.getElementById('recipient').textContent=String(payload.fullname).trim()||'bạn';
  document.getElementById('survey').hidden=true;document.getElementById('festival').hidden=false;
  document.title='Trung thu vui vẻ!';window.scrollTo(0,0);startFireworks();
  setTimeout(()=>document.getElementById('letter').classList.add('show'),2200);
  try{await audio.play();toggle.textContent='♫ Tắt nhạc'}catch{toggle.textContent='♫ Bật nhạc'}
});
toggle.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();toggle.textContent='♫ Tắt nhạc'}catch{toggle.textContent='♫ Thêm nhạc vào thư mục assets/music'}}else{audio.pause();toggle.textContent='♫ Bật nhạc'}});
function startFireworks(){const canvas=document.getElementById('fireworks'),ctx=canvas.getContext('2d');let particles=[],last=0;function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}resize();window.addEventListener('resize',resize);function burst(){const x=innerWidth*(.15+Math.random()*.7),y=innerHeight*(.08+Math.random()*.43),color=['#ffd464','#f58caa','#86ddfa','#fff1a9','#ddafff'][Math.floor(Math.random()*5)];for(let i=0;i<52;i++){let a=Math.PI*2*i/52,s=1.4+Math.random()*3.2;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:75,color})}}function frame(t){ctx.clearRect(0,0,innerWidth,innerHeight);if(t-last>900){burst();last=t}particles=particles.filter(p=>p.life-->0);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.026;ctx.globalAlpha=Math.min(1,p.life/35);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;requestAnimationFrame(frame)}requestAnimationFrame(frame)}
