String.prototype.toBool=function(){return/^true$/i.test(this)};class Darkmode{constructor(e,t,o=!0){this.darkModeTheme=e,this.lightModeTheme=t,this.getCookie("Rosux-Darkmode")?this.dark=this.getCookie("Rosux-Darkmode").toBool():(o?this.dark=!0:this.dark=!1,this.updateCookie()),this.updateDocument(),this.addButtonListeners()}switch(){this.dark=!this.dark,this.updateCookie(),this.updateDocument()}on(){this.dark=!0,this.updateCookie(),this.updateDocument()}off(){this.dark=!1,this.updateCookie(),this.updateDocument()}updateCookie(){this.getCookie("Rosux-Darkmode")||this.setCookie("Rosux-Darkmode",this.dark,30),this.setCookie("Rosux-Darkmode",this.dark,30)}getMode(){return this.dark}async addButtonListeners(){if("complete"===document.readyState||"interactive"===document.readyState){let e=document.querySelectorAll("*[darkmode-selector]");t(e)}else window.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll("*[darkmode-selector]");t(e)});function t(e){for(let t=0;t<e.length;t++)e[t].addEventListener("change",o=>{"1"==o.target.getAttribute("darkmode-selector")?o.target.checked?darkmode.off():darkmode.on():"2"==e[t].getAttribute("darkmode-selector")&&(o.target.checked?darkmode.on():darkmode.off())})}}updateDocument(){"complete"===document.readyState||"interactive"===document.readyState?(this.dark?document.body.style.cssText=this.darkModeTheme:document.body.style.cssText=this.lightModeTheme,this.updateButtons()):window.addEventListener("DOMContentLoaded",()=>{this.dark?document.body.style.cssText=this.darkModeTheme:document.body.style.cssText=this.lightModeTheme,this.updateButtons()})}async updateButtons(){let e=this.dark,t=document.querySelectorAll("*[darkmode-selector]");for(let o=0;o<t.length;o++)e?"1"==t[o].getAttribute("darkmode-selector")||"s"==t[o].getAttribute("darkmode-selector")?t[o].checked=!1:"2"==t[o].getAttribute("darkmode-selector")&&(t[o].checked=!0):"1"==t[o].getAttribute("darkmode-selector")||"s"==t[o].getAttribute("darkmode-selector")?t[o].checked=!0:"2"==t[o].getAttribute("darkmode-selector")&&(t[o].checked=!1)}setCookie(e,t,o=30){var s=new Date;s.setDate(s.getDate()+o),document.cookie=e+"="+encodeURIComponent(t)+";expires="+s+"; sameSite=strict; secure;"}getCookie(e){let t=`; ${document.cookie}`,o=t.split(`; ${e}=`);if(2===o.length)return o.pop().split(";").shift()}};
