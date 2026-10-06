// ============ PRELOADER ============
window.addEventListener('load',()=>{
  const preloader=document.querySelector('.preloader');
  if(preloader){setTimeout(()=>preloader.classList.add('hide'),600);}
});

// ============ AOS INIT ============
if(typeof AOS!=='undefined'){
  AOS.init({duration:1000,once:true,offset:100,easing:'ease-out-cubic'});
}

// ============ NAVBAR SCROLL ============
const navbar=document.querySelector('.navbar');
window.addEventListener('scroll',()=>{
  if(navbar){navbar.classList.toggle('scrolled',window.scrollY>50);}
});

// ============ HAMBURGER ============
const hamburger=document.querySelector('.hamburger');
const navLinks=document.querySelector('.nav-links');
if(hamburger){
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }));
}

// ============ HERO SLIDER ============
const slides=document.querySelectorAll('.hero-slider .slide');
if(slides.length){
  let current=0;
  setInterval(()=>{
    slides[current].classList.remove('active');
    current=(current+1)%slides.length;
    slides[current].classList.add('active');
  },5000);
}

// ============ COUNTER ANIMATION ============
const counters=document.querySelectorAll('.counter');
const animateCounter=el=>{
  const target=+el.dataset.target;
  let count=0;
  const step=target/60;
  const update=()=>{
    count+=step;
    if(count<target){el.textContent=Math.floor(count);requestAnimationFrame(update);}
    else{el.textContent=target+(target>=100?'+':'');}
  };
  update();
};
if(counters.length){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){animateCounter(e.target);obs.unobserve(e.target);}
    });
  },{threshold:.5});
  counters.forEach(c=>obs.observe(c));
}

// ============ SERVICE TABS ============
const tabBtns=document.querySelectorAll('.tab-btn');
const serviceSections=document.querySelectorAll('.service-section');
tabBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    tabBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target=btn.dataset.tab;
    serviceSections.forEach(sec=>{
      sec.classList.toggle('active-tab',sec.id===target);
    });
    // scroll to services
    const el=document.getElementById(target);
    if(el){window.scrollTo({top:el.offsetTop-100,behavior:'smooth'});}
  });
});

// Handle hash on load (services.html#wedding)
if(window.location.hash){
  const hash=window.location.hash.substring(1);
  const btn=document.querySelector(`.tab-btn[data-tab="${hash}"]`);
  if(btn)setTimeout(()=>btn.click(),300);
}

// ============ BOOKING MODAL ============
const modal=document.getElementById('bookingModal');
const closeModal=document.getElementById('closeModal');
const modalEventName=document.getElementById('modalEventName');
const eventTypeInput=document.getElementById('eventType');

document.querySelectorAll('.open-booking').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const eventName=btn.dataset.event;
    if(modalEventName)modalEventName.textContent=eventName;
    if(eventTypeInput)eventTypeInput.value=eventName;
    modal.classList.add('active');
    document.body.style.overflow='hidden';
  });
});
if(closeModal){
  closeModal.addEventListener('click',()=>{
    modal.classList.remove('active');
    document.body.style.overflow='';
  });
}
if(modal){
  modal.addEventListener('click',e=>{
    if(e.target===modal){
      modal.classList.remove('active');
      document.body.style.overflow='';
    }
  });
}

// ============ WHATSAPP BOOKING ============
const WA_NUMBER='923458297688';
const EMAIL='fahadhabib246810@gmail.com';

document.getElementById('sendWhatsApp')?.addEventListener('click',()=>{
  const name=document.getElementById('name').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const email=document.getElementById('email').value.trim();
  const date=document.getElementById('eventDate').value;
  const guests=document.getElementById('guests').value;
  const budget=document.getElementById('budget').value;
  const city=document.getElementById('city').value;
  const msg=document.getElementById('message').value;
  const event=document.getElementById('eventType').value;

  if(!name||!phone||!email||!date){
    alert('Please fill all required fields (Name, Phone, Email, Date).');
    return;
  }

  const text=`*New Event Booking Request*%0A%0A*Event Type:* ${event}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Event Date:* ${date}%0A*Guests:* ${guests||'N/A'}%0A*Budget:* ${budget}%0A*City/Venue:* ${city||'N/A'}%0A*Special Requests:* ${msg||'N/A'}%0A%0A_Sent via Elite Events Website_`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`,'_blank');
});

// ============ EMAIL BOOKING ============
document.getElementById('sendEmail')?.addEventListener('click',()=>{
  const name=document.getElementById('name').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const email=document.getElementById('email').value.trim();
  const date=document.getElementById('eventDate').value;
  const guests=document.getElementById('guests').value;
  const budget=document.getElementById('budget').value;
  const city=document.getElementById('city').value;
  const msg=document.getElementById('message').value;
  const event=document.getElementById('eventType').value;

  if(!name||!phone||!email||!date){
    alert('Please fill all required fields (Name, Phone, Email, Date).');
    return;
  }

  const subject=encodeURIComponent(`New Event Booking Request - ${event}`);
  const body=encodeURIComponent(
`New Event Booking Request

Event Type: ${event}
Name: ${name}
Phone: ${phone}
Email: ${email}
Event Date: ${date}
Guests: ${guests||'N/A'}
Budget: ${budget}
City/Venue: ${city||'N/A'}

Special Requests:
${msg||'N/A'}

--- Sent via Elite Events Website ---`
  );

  window.location.href=`mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

// ============ CONTACT PAGE FORM ============
document.getElementById('contactWhatsApp')?.addEventListener('click',()=>{
  const name=document.getElementById('cName').value.trim();
  const phone=document.getElementById('cPhone').value.trim();
  const email=document.getElementById('cEmail').value.trim();
  const event=document.getElementById('cEvent').value;
  const msg=document.getElementById('cMsg').value.trim();

  if(!name||!phone||!email||!msg){
    alert('Please fill all required fields.');
    return;
  }

  const text=`*New Contact Message*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Event Interest:* ${event}%0A*Message:* ${msg}%0A%0A_Sent via Elite Events Website_`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`,'_blank');
});

document.getElementById('contactEmail')?.addEventListener('click',()=>{
  const name=document.getElementById('cName').value.trim();
  const phone=document.getElementById('cPhone').value.trim();
  const email=document.getElementById('cEmail').value.trim();
  const event=document.getElementById('cEvent').value;
  const msg=document.getElementById('cMsg').value.trim();

  if(!name||!phone||!email||!msg){
    alert('Please fill all required fields.');
    return;
  }

  const subject=encodeURIComponent(`New Contact Message - ${event}`);
  const body=encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nEvent Interest: ${event}\n\nMessage:\n${msg}\n\n--- Sent via Elite Events Website ---`);
  window.location.href=`mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

// ============ GALLERY FILTER ============
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item=>{
      if(filter==='all'||item.dataset.cat===filter){
        item.classList.remove('hide');
        item.style.animation='fadeSlide .5s ease';
      }else{
        item.classList.add('hide');
      }
    });
  });
});

// ============ LIGHTBOX ============
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img').src;
    if(lightboxImg&&lightbox){
      lightboxImg.src=img;
      lightbox.classList.add('active');
      document.body.style.overflow='hidden';
    }
  });
});
document.querySelector('.lightbox-close')?.addEventListener('click',()=>{
  lightbox.classList.remove('active');
  document.body.style.overflow='';
});
lightbox?.addEventListener('click',e=>{
  if(e.target===lightbox){
    lightbox.classList.remove('active');
    document.body.style.overflow='';
  }
});

// ============ FAQ ============
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const wasActive=item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
    if(!wasActive)item.classList.add('active');
  });
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      window.scrollTo({top:target.offsetTop-90,behavior:'smooth'});
    }
  });
});