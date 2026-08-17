
// ===== CURSOR =====
const dot = document.getElementById('curDot');
const ring = document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function animCur(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animCur);
})();
document.querySelectorAll('a,button,.photo-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ ring.style.transform='translate(-50%,-50%) scale(2)'; ring.style.opacity='0.5'; });
  el.addEventListener('mouseleave',()=>{ ring.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='1'; });
});

// ===== NAV SCROLL =====
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled', scrollY>60);
});

// ===== SCROLL REVEAL =====
const obs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'),i*100); obs.unobserve(e.target); }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ===== PHOTO UPLOAD =====
const photoInput = document.getElementById('photoInput');
const photoImg   = document.getElementById('photoImg');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const photoLabel = document.getElementById('photoLabel');

// Load saved photo from localStorage
const savedPhoto = localStorage.getItem('portfolioPhoto');
if(savedPhoto){
  photoImg.src = savedPhoto;
  photoImg.style.display = 'block';
  photoPlaceholder.style.display = 'none';
  photoLabel.textContent = 'Hover to change photo';
}

// Handle file selection
photoInput.addEventListener('change', function(){
  const file = this.files[0];
  if(!file) return;
  if(!file.type.startsWith('image/')){ alert('Please select an image file!'); return; }
  if(file.size > 5 * 1024 * 1024){ alert('File too large! Please use an image under 5MB.'); return; }

  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    // Show image
    photoImg.src = dataUrl;
    photoImg.style.display = 'block';
    photoPlaceholder.style.display = 'none';
    photoLabel.textContent = '✅ Photo uploaded! Hover to change';
    // Save to localStorage
    try {
      localStorage.setItem('portfolioPhoto', dataUrl);
    } catch(err){
      console.log('Image too large for localStorage');
    }
  };
  reader.readAsDataURL(file);
});


