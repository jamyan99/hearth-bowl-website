(function(){
  "use strict";

  /* ---------- PAGE NAVIGATION (Home / Menu / Gallery / Contact) ---------- */
  var pages = document.querySelectorAll('.page');
  var navLinks = document.querySelectorAll('[data-page]');
  var mobileNav = document.getElementById('mobileNav');
  var menuToggle = document.getElementById('menuToggle');

  function showPage(id, catId){
    pages.forEach(function(p){ p.classList.toggle('active', p.id === id); });
    navLinks.forEach(function(l){
      if(l.tagName === 'A' && l.closest('nav')){
        l.classList.toggle('active', l.getAttribute('data-page') === id);
      }
    });
    window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
    if(mobileNav) mobileNav.classList.remove('open');
    if(id === 'menu' && catId){
      // wait for layout then scroll to category
      setTimeout(function(){ scrollToCategory(catId); }, 60);
    }
    history.replaceState(null, '', '#' + id);
  }

  navLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      var page = link.getAttribute('data-page');
      if(!page) return;
      e.preventDefault();
      var cat = link.getAttribute('data-cat');
      showPage(page, cat);
    });
  });

  // Init from hash
  var initial = (location.hash || '#home').replace('#','');
  if(!document.getElementById(initial)) initial = 'home';
  showPage(initial);

  /* ---------- SMOOTH SCROLL TO A SECTION (Contact -> Visit Us) ---------- */
  var scrollLinks = document.querySelectorAll('[data-scroll]');
  scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      var targetId = link.getAttribute('data-scroll');
      var target = document.getElementById(targetId);
      if(!target) return;
      e.preventDefault();
      if(mobileNav) mobileNav.classList.remove('open');
      var parentPage = target.closest('.page');
      if(parentPage && !parentPage.classList.contains('active')){
        // Target lives on a different page (e.g. Home) — switch to it first,
        // then scroll once that page's layout has settled.
        showPage(parentPage.id);
        setTimeout(function(){
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }, 60);
      } else {
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
      history.replaceState(null, '', '#' + targetId);
    });
  });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  if(menuToggle && mobileNav){
    menuToggle.addEventListener('click', function(){
      mobileNav.classList.toggle('open');
    });
  }

  /* ---------- MENU CATEGORY TABS (scrollspy + click-to-scroll) ---------- */
  var tabs = document.querySelectorAll('.tab');
  var categories = document.querySelectorAll('.menu-category');

  function scrollToCategory(id){
    var el = document.getElementById('cat-' + id);
    if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
    setActiveTab(id);
  }

  function setActiveTab(id){
    tabs.forEach(function(t){
      t.classList.toggle('active', t.getAttribute('data-cat') === id);
      t.setAttribute('aria-selected', t.getAttribute('data-cat') === id ? 'true' : 'false');
    });
  }

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      scrollToCategory(tab.getAttribute('data-cat'));
    });
  });

  if('IntersectionObserver' in window && categories.length){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.id.replace('cat-', '');
          setActiveTab(id);
        }
      });
    }, {rootMargin: '-120px 0px -70% 0px', threshold: 0});
    categories.forEach(function(c){ spy.observe(c); });
  }

  /* ---------- FADE-IN ON SCROLL ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if('IntersectionObserver' in window && fadeEls.length){
    var fadeObs = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    fadeEls.forEach(function(el){ fadeObs.observe(el); });
  } else {
    fadeEls.forEach(function(el){ el.classList.add('in-view'); });
  }

})();
