// Shared site JS

// Nav scroll effect
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('nav');
  if(nav)nav.classList.toggle('scrolled',window.scrollY>20);
});

// Service accordion (used on services.html and why-us.html)
function toggleService(el){
  const service=el.parentElement;
  const wasOpen=service.classList.contains('open');
  // Close all siblings within the same list
  const list=service.parentElement;
  list.querySelectorAll('.service').forEach(s=>s.classList.remove('open'));
  if(!wasOpen)service.classList.add('open');
}

// Open first service on any page that has a list
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.services-list').forEach(list=>{
    const first=list.querySelector('.service');
    if(first)first.classList.add('open');
  });
  // Mobile menu
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links){
    let menuOpen=false;
    function openMenu(){
      menuOpen=true;
      links.style.display='flex';
      links.style.flexDirection='column';
      links.style.position='absolute';
      links.style.top='78px';
      links.style.left='0';
      links.style.right='0';
      links.style.background='#fff';
      links.style.padding='24px';
      links.style.borderBottom='1px solid #e8e2dc';
      toggle.textContent='\u2715';
    }
    function closeMenu(){
      menuOpen=false;
      links.removeAttribute('style');
      toggle.textContent='\u2630';
    }
    toggle.addEventListener('click',function(e){
      e.stopPropagation();
      menuOpen?closeMenu():openMenu();
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',closeMenu);
    });
    document.addEventListener('click',function(e){
      if(menuOpen&&!links.contains(e.target)&&e.target!==toggle){
        closeMenu();
      }
    });
  }
});
