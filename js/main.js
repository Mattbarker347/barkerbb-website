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

// ── Lead attribution ───────────────────────────────────────────────
// Records where a visitor first landed and what sent them, once per session,
// then stamps it into the hidden fields on any quote form they submit.
// Answers "which page earned this lead" instead of guessing.
(function(){
  var KEY='bbb_attr';

  function store(){
    try{ return window.sessionStorage; }catch(e){ return null; }
  }

  function firstTouch(){
    var ss=store();
    var saved=null;
    if(ss){
      try{ saved=JSON.parse(ss.getItem(KEY)||'null'); }catch(e){ saved=null; }
    }
    if(saved&&saved.landing) return saved;

    var params=new URLSearchParams(window.location.search);
    var campaignBits=['utm_source','utm_medium','utm_campaign','utm_term','utm_content']
      .map(function(k){ var v=params.get(k); return v?k.replace('utm_','')+'='+v:null; })
      .filter(Boolean);
    if(!campaignBits.length&&params.get('gclid')) campaignBits.push('source=google-ads');

    var ref=document.referrer||'';
    try{
      if(ref&&new URL(ref).hostname.replace(/^www\./,'')===window.location.hostname.replace(/^www\./,'')) ref='';
    }catch(e){}

    var data={
      landing:window.location.pathname.replace(/^\//,'')||'index.html',
      referrer:ref?ref.slice(0,300):'direct or unknown',
      campaign:campaignBits.join(' ').slice(0,200)
    };
    if(ss){
      try{ ss.setItem(KEY,JSON.stringify(data)); }catch(e){}
    }
    return data;
  }

  function stamp(){
    var data=firstTouch();
    var fields=document.querySelectorAll('input[data-attr]');
    for(var i=0;i<fields.length;i++){
      var which=fields[i].getAttribute('data-attr');
      if(data[which]!==undefined) fields[i].value=data[which];
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',stamp);
  }else{
    stamp();
  }
})();
