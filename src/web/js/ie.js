//IE
function overIE(tipo){
     if(document.getElementsByTagName) {
          (function() {
          var className = 'hovered',
          pattern = new RegExp('(^|\\s+)' + className + '(\\s+|$)'),
          rows = document.getElementsByTagName(tipo);

          for(var i = 0, n = rows.length; i < n; ++i) {
               rows[i].onmouseover = function() {
               this.className += ' ' + className;
               };
               rows[i].onmouseout = function() {
               this.className = this.className.replace(pattern, ' ');
               };
          }
          rows = null;
          })();
     }

}

function putClass(etiqueta,clase){
     var navItems = document.getElementById("menu").getElementsByTagName(etiqueta);
     for (var i=0; i<navItems.length; i++) {
          navItems[i].className=clase;
     }
}

function preloadMenu() {
     overIE('dl');	
     overIE('dt');
     overIE('li');
     var navItems = document.getElementById("menu").getElementsByTagName("dt");
     for (var i=0; i<navItems.length; i++) {
          	navItems[i].onclick=function() { 
          		putClass("dd","smenuOff");
     			putClass("dl","menuOff");  
     			this.parentNode.getElementsByTagName("dd")[0].className='smenuOn';          		
          		this.parentNode.className='menuOn';
          	}
     }  
}