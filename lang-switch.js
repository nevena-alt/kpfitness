/* KP FITNESS — CG/EN language switcher (desktop dropdown). Links are real pages; this only handles open/close + keyboard. */
(function(){
  var root=document.querySelector('[data-lang-switch]');if(!root)return;
  var btn=root.querySelector('.lp-lang__btn'),menu=root.querySelector('.lp-lang__menu');
  var items=function(){return Array.prototype.slice.call(menu.querySelectorAll('a'));};
  function open(focusIdx){menu.hidden=false;btn.setAttribute('aria-expanded','true');if(focusIdx!=null){var it=items();(it[focusIdx]||it[0]).focus();}}
  function close(refocus){if(menu.hidden)return;menu.hidden=true;btn.setAttribute('aria-expanded','false');if(refocus)btn.focus();}
  btn.addEventListener('click',function(e){e.stopPropagation();menu.hidden?open():close();});
  btn.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'||e.key==='Enter'||e.key===' '){e.preventDefault();var it=items(),a=it.findIndex(function(x){return x.hasAttribute('aria-current');});open(a<0?0:a);}
    else if(e.key==='ArrowUp'){e.preventDefault();open(items().length-1);}
  });
  menu.addEventListener('keydown',function(e){
    var it=items(),i=it.indexOf(document.activeElement);
    if(e.key==='ArrowDown'){e.preventDefault();it[(i+1)%it.length].focus();}
    else if(e.key==='ArrowUp'){e.preventDefault();it[(i-1+it.length)%it.length].focus();}
    else if(e.key==='Home'){e.preventDefault();it[0].focus();}
    else if(e.key==='End'){e.preventDefault();it[it.length-1].focus();}
    else if(e.key==='Tab'){close(false);}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close(root.contains(document.activeElement));});
  document.addEventListener('click',function(e){if(!root.contains(e.target))close(false);});
  window.addEventListener('resize',function(){close(false);});
})();
