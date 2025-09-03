document.addEventListener('DOMContentLoaded', function() {
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  // Main DOM elements
  const lightsEl = qs('#lights');
  const confettiEl = qs('#confetti');
  const balloonArea = qs('#balloonArea');
  const stage = qs('#stage');
  const decor = qs('#decor');
  const lettersWrap = qs('#letters');
  const finalMessage = qs('#finalMessage');
  const music = qs('#music');
  const fireworksEl = qs('#fireworks');

  // Step buttons
  const btnLights = qs('#btnLights');
  const btnMusic = qs('#btnMusic');
  const btnDecor = qs('#btnDecor');
  const btnBalloons = qs('#btnBalloons');
  const btnCake = qs('#btnCake');
  const btnCandles = qs('#btnCandles');
  const btnHBD = qs('#btnHBD');
  const btnMessage = qs('#btnMessage');
  const toggleThemeBtn = qs('#toggleTheme');

  // Photo gallery variables
  const photos = [
  "image2.png",
  "image3.png",
  "image1.png",
  "image4.png",
  "image5.png"
];

const captions = [
  "This is the image we took while happily spending time with friends.",
  "This is the image we took during our amazing tour with friends.",
  "This is the image we captured while hanging out and sharing smiles",
  "This is the image we took celebrating a birthday surrounded by friends",
  "This is the image of the moment always bringing cheerful and positive vibes."
];
  let currentPhotoIndex = 0;
  const galleryImage = qs('#galleryImage');
  const prevBtn = qs('#prevBtn');
  const nextBtn = qs('#nextBtn');
  const photoGallery = qs('#photoGallery');
  const memoryCaption = qs('#memoryCaption');

  // Gift reveal
  const giftSection = qs('#giftSection');
  const giftBox = qs('#giftBox');
  const giftMessage = qs('#giftMessage');

  // Unlock puzzle
  const unlockSection = qs('#unlockSection');
  const unlockBtn = qs('#unlockBtn');
  const puzzleAnswerInput = qs('#puzzleAnswer');
  const unlockFeedback = qs('#unlockFeedback');

  // Initial hiding
  photoGallery.classList.add('hidden');
  giftSection.classList.add('hidden');
  unlockSection.classList.add('hidden');
  finalMessage.classList.add('hidden');

  function show(id){ qs('#'+id).classList.remove('hidden'); }
  function hide(id){ qs('#'+id).classList.add('hidden'); }
  function showPhoto(idx) {
    galleryImage.src = photos[idx];
    memoryCaption.textContent = captions[idx];
  }

  // Fireworks functions
  function launchFireworks(n=8) {
    fireworksEl.classList.remove('hidden');
    for (let i = 0; i < n; i++) {
      setTimeout(() => createFirework(), i * 350);
    }
    setTimeout(() => {
      fireworksEl.classList.add('hidden');
      fireworksEl.innerHTML = '';
    }, n * 400 + 1200);
  }
  function createFirework() {
    const fw = document.createElement('div');
    fw.className = 'firework';
    fw.style.left = Math.random() * 80 + 10 + 'vw';
    fw.style.top = Math.random() * 60 + 20 + 'vh';
    const size = Math.random() * 32 + 36;
    fw.style.width = fw.style.height = size + 'px';
    fw.style.background = `radial-gradient(circle, ${randomColor()}, transparent 67%)`;
    fireworksEl.appendChild(fw);
    setTimeout(() => fw.remove(), 1000);
  }
  function randomColor() {
    const colors = [
      '#ff6ec7','#ffd166','#51cf66','#4dabf7','#b197fc','#ff6b6b','#fff','#f9e900'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Event handlers
  btnLights.addEventListener('click', () => {
    lightsEl.classList.remove('hidden');
    lightsEl.setAttribute('aria-hidden', 'false');
    hide('step1'); show('step2');
  });

  btnMusic.addEventListener('click', async () => {
    try {
      const playPromise = music.play();
      if (playPromise !== undefined) {
        await playPromise;
        btnMusic.disabled = true;
        btnMusic.textContent = 'Playing...';
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        alert('Audio playback was blocked. Please click the Play Music button again or check your browser settings.');
      } else if (err.name === 'NotSupportedError') {
        alert('Audio format not supported on this browser. Try a different browser or audio source.');
      } else {
        alert('Unable to play audio. See console for details.');
      }
    }
    hide('step2'); show('step3');
  });

  btnDecor.addEventListener('click', () => {
    decor.classList.remove('hidden');
    burstConfetti(120);
    setTimeout(()=> burstConfetti(80), 300);
    setTimeout(()=> burstConfetti(60), 600);
    hide('step3'); show('step4');
  });

  btnBalloons.addEventListener('click', () => {
    balloonArea.classList.remove('hidden');
    balloonArea.setAttribute('aria-hidden','false');
    spawnBalloons(24);
    hide('step4'); show('step5');
  });

  btnCake.addEventListener('click', () => {
    stage.classList.remove('hidden');
    hide('step5'); show('step6');
  });

  btnCandles.addEventListener('click', () => {
    qsa('.flame').forEach(f => f.classList.add('on'));
    hide('step6'); show('step7');
  });

  btnHBD.addEventListener('click', () => {
    lettersWrap.classList.remove('hidden');
    const letters = ['H','B','D','F','R','D'];
    lettersWrap.innerHTML = '';
    letters.forEach((ch, idx) => {
      const el = document.createElement('div');
      el.className = 'letter-balloon';
      el.style.animationDelay = (idx*0.18)+'s';
      el.innerHTML = `<span>${ch}</span><div class="letter-string"></div>`;
      lettersWrap.appendChild(el);
      requestAnimationFrame(()=> el.classList.add('float-in'));
    });
    hide('step7'); show('step8');
  });

  // Message for You — at the end, show memories and unlock section
  btnMessage.addEventListener('click', () => {
    finalMessage.classList.remove('hidden');
    drizzleConfetti(1800);
    hide('step8');

    photoGallery.classList.remove('hidden');
    showPhoto(currentPhotoIndex);

    unlockSection.classList.remove('hidden');
    giftSection.classList.add('hidden');
  });

  // Unlock puzzle logic
  unlockBtn.addEventListener('click', () => {
    const answer = puzzleAnswerInput.value.trim();
    if(answer === '2') {
      unlockFeedback.style.display = 'none';
      unlockSection.classList.add('hidden');
      giftSection.classList.remove('hidden');
      launchFireworks(); // Fireworks on gift unlock!
    } else {
      unlockFeedback.textContent = 'Oops, that\'s not correct. Try again!';
      unlockFeedback.style.display = 'block';
    }
  });

  // Photo gallery navigation
  prevBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
  });

  // Reveal gift letter (show fireworks!)
  giftBox.addEventListener('click', () => {
    giftMessage.classList.toggle('hidden');
    giftBox.disabled = true;
    launchFireworks();
  });

  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('day-mode');
  });

  document.addEventListener('keydown', e=>{
    if(e.key==='Enter' && document.activeElement?.classList.contains('btn')){
      document.activeElement.click();
    }
  });

  function burstConfetti(n=100){
    confettiEl.classList.remove('hidden');
    confettiEl.setAttribute('aria-hidden','false');
    const colors = ['#fce18a','#ff726d','#b48def','#4dabf7','#51cf66','#ffd166'];
    for(let i=0;i<n;i++){
      const piece = document.createElement('i');
      const size = Math.random()*10+6;
      piece.style.width = (size*.7)+'px';
      piece.style.height = (size)+'px';
      piece.style.left = (Math.random()*100)+'%';
      piece.style.background = colors[(Math.random()*colors.length)|0];
      piece.style.animationDuration = (Math.random()*1+1.8)+'s';
      piece.style.animationDelay = (Math.random()*0.2)+'s';
      confettiEl.appendChild(piece);
      setTimeout(()=> piece.remove(), 2600);
    }
    setTimeout(()=> confettiEl.classList.add('hidden'), 2800);
  }
  function drizzleConfetti(ms=2000){
    const start = performance.now();
    const interval = setInterval(()=>{
      burstConfetti(12);
      if(performance.now()-start > ms){ clearInterval(interval); }
    }, 260);
  }
  function spawnBalloons(count=20){
    const palette = ['#ff6b6b','#4dabf7','#51cf66','#ffd166','#b197fc','#ffa8a8','#74c0fc','#63e6be'];
    for(let i=0;i<count;i++){
      const b = document.createElement('div');
      b.className='balloon';
      b.style.left = (Math.random()*92+2)+'vw';
      b.style.background = palette[(Math.random()*palette.length)|0];
      b.style.animationDuration = (Math.random()*4+7)+'s';
      b.style.animationDelay = (Math.random()*1.5)+'s';
      const s = document.createElement('div'); s.className='string';
      b.appendChild(s);
      balloonArea.appendChild(b);
      setTimeout(()=> b.remove(), 12000);
    }
  }
});
