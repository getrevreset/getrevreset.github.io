// main.js — Minimal JS for navigation and interactions
document.addEventListener('DOMContentLoaded',function(){
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click',function(){
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // Close nav when a link is clicked (mobile)
    nav.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener('click',function(){
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded','false');
        }
      });
    });
    // Close mobile nav on escape
    document.addEventListener('keydown',function(e){
      if(e.key === 'Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
        navToggle.focus();
      }
    });
  }

  // Smoothly focus linked sections for accessibility
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click',function(e){
      // Allow default if external
      var hash = anchor.getAttribute('href');
      if(hash.length > 1 && document.querySelector(hash)){
        e.preventDefault();
        var target = document.querySelector(hash);
        var offset = 72; // account for sticky header
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top: top, behavior: 'smooth'});
        // move focus for keyboard users
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
        // remove tabindex after focus
        window.setTimeout(function(){ target.removeAttribute('tabindex'); },1000);
      }
    });
  });

  // Simple reveal on scroll respecting prefers-reduced-motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches === false){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.1});
    document.querySelectorAll('section, .card, .step').forEach(function(el){
      el.classList.add('reveal-init');
      observer.observe(el);
    });
  }
});
