// =============================String to bool============================= //
String.prototype.toBool = function(){return /^true$/i.test(this);};
// =============================Darkmode Class============================= //
class Darkmode{
    constructor(darkModeTheme, lightModeTheme, darkByDefault=true){
        this.darkModeTheme = darkModeTheme;
        this.lightModeTheme = lightModeTheme;
        if(this.getCookie("Rosux-Darkmode")){
            this.dark = this.getCookie("Rosux-Darkmode").toBool();
        }else{
            darkByDefault ? this.dark = true : this.dark = false;
            this.updateCookie();
        }
        this.updateDocument();
        this.addButtonListeners();
    }
    switch(){
        this.dark = !this.dark;
        this.updateCookie();
        this.updateDocument();
    }
    on(){
        this.dark = true;
        this.updateCookie();
        this.updateDocument();
    }
    off(){
        this.dark = false;
        this.updateCookie();
        this.updateDocument();
    }
    updateCookie(){
        if(!this.getCookie("Rosux-Darkmode")){
            this.setCookie("Rosux-Darkmode", this.dark, 30);
        }
        this.setCookie("Rosux-Darkmode", this.dark, 30);
    }
    getMode(){
        return this.dark;
    }
    async addButtonListeners(){
        if(document.readyState === "complete" || document.readyState === "interactive"){
            const buttons = document.querySelectorAll("*[darkmode-selector]");
            applyListener(buttons);
        }else{
            window.addEventListener("DOMContentLoaded", ()=>{
                const buttons = document.querySelectorAll("*[darkmode-selector]");
                applyListener(buttons);
            });
        }
        function applyListener(buttons){
            for(let i=0;i<buttons.length;i++){
                buttons[i].addEventListener('change', (e)=>{
                    if(e.target.getAttribute("darkmode-selector") == "1"){
                        e.target.checked ? darkmode.off() : darkmode.on();
                    }else if(buttons[i].getAttribute("darkmode-selector") == "2"){
                        e.target.checked ? darkmode.on() : darkmode.off();
                    }
                });
            }
        }
    }
    updateDocument(){
        if(document.readyState === "complete" || document.readyState === "interactive"){
            this.dark ? document.body.style.cssText = this.darkModeTheme : document.body.style.cssText = this.lightModeTheme;
            this.updateButtons();
        }else{
            window.addEventListener("DOMContentLoaded", ()=>{
                this.dark ? document.body.style.cssText = this.darkModeTheme : document.body.style.cssText = this.lightModeTheme;
                this.updateButtons();
            });
        }
    }
    async updateButtons(){
        let x = this.dark;
        const buttons = document.querySelectorAll("*[darkmode-selector]");
        for(let i=0;i<buttons.length;i++){
            if(x){
                // set buttons do dark
                if(buttons[i].getAttribute("darkmode-selector") == "1" || buttons[i].getAttribute("darkmode-selector") == "s"){
                    buttons[i].checked = false;
                }else if(buttons[i].getAttribute("darkmode-selector") == "2"){
                    buttons[i].checked = true;
                }
            }else{
                // set buttons do light
                if(buttons[i].getAttribute("darkmode-selector") == "1" || buttons[i].getAttribute("darkmode-selector") == "s"){
                    buttons[i].checked = true;
                }else if(buttons[i].getAttribute("darkmode-selector") == "2"){
                    buttons[i].checked = false;
                }
            }
        }
    }
    setCookie(name, val, time=30){
        var date=new Date;
        date.setDate(date.getDate()+time);
        document.cookie = name + "=" + encodeURIComponent(val) + ";expires=" + date + "; sameSite=strict; secure;";
    }
    getCookie(name){
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}
/*


// ===========================Setting Up Darkmode=========================== //
Example:
    let darkModeTheme = "--header-color:hsl(0,0%,20%);--text-color:#d3d3d3;--background-color:hsl(0,0%,9%);--accent-color-1:#202020;--accent-color-2:#303030;";
    let lightModeTheme = "--header-color:hsl(0,0%,80%);--text-color:hsl(0,0%,17%);--background-color:hsl(0,0%,91%);--accent-color-1:hsl(0,0%,87%);--accent-color-2:hsl(0,0%,81%);";
    let darkmode = new Darkmode(darkModeTheme, lightModeTheme, true);

Details:
    let darkmode = new DarkMode(
        String : darkModeTheme
        String : lightModeTheme
        Bool   : darkByDefault? (default = true)
    )

Notes:
    the darkmodetheme and lightmode theme are currently implemented to be a string of :root variables
    so to use this you would need to create your site with colors/styles based on :root variables






///////////////////////////////////////////////////////////////////
///////////////simple explanation for custom buttons///////////////
///////////////////////////////////////////////////////////////////

darkmode-selector="1"  =   if set true will make it light
darkmode-selector="2"  =   if set true will make it dark

///////////////////////////////////////////////////////////////////
/////////////////////////explanation setup/////////////////////////
///////////////////////////////////////////////////////////////////
ex1:
    button example [dark, bright]:
    <div class="button-switch">
        <input type="checkbox" id="darkmode" darkmode-selector="1">
        <label for="darkmode"><p>Dark</p><p>Bright</p></label>
    </div>
ex2:
    button example [Bright, dark]:
    <div class="button-switch">
        <input type="checkbox" id="darkmode" darkmode-selector="2">
        <label for="darkmode"><p>Bright</p><p>Dark</p></label>
    </div>



*/
