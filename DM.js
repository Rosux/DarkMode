class Darkmode{
    constructor(darkModeTheme="", lightModeTheme="", defaultStyle=true){
        this.#dmt = darkModeTheme;
        this.#lmt = lightModeTheme;
        // if state doesnt exist default to the defaultStyle
        if(localStorage.getItem("darkmode") === null){
            defaultStyle ? this.mode = true : this.mode = false;
            this.#saveState();
        }else{
            this.mode = this.#getState();
        }
        // update dom style
        this.setTheme();
        // apply button listeners
        this.applyListener();
        // set buttons to right pos
        this.updateButtons();
    }
    on(){
        this.mode = true;
        this.#setUpdateSave();
    }
    off(){
        this.mode = false;
        this.#setUpdateSave();
    }
    toggle(){
        this.mode = !this.mode;
        this.#setUpdateSave();
    }
    getMode(){
        return this.mode;
    }





    async applyListener(){
        // apply listeners to all buttons with required attributes
        if(document.readyState==="complete"||document.readyState === "interactive"){addListener();}else{window.addEventListener("DOMContentLoaded",()=>{addListener();});}
        function addListener(){
            // switches
            const switchButton = document.querySelectorAll("[darkmode-switch]");
            for(let i=0;i<switchButton.length;i++){
                switchButton[i].addEventListener("click", ()=>{
                    this.toggle();
                    // for css styling
                    this.mode ? switchButton[i].setAttribute("darkmode-switch", "on") : switchButton[i].setAttribute("darkmode-switch", "off");
                });
            }
            // checkboxes
            const buttonCheckbox = document.querySelectorAll("[darkmode-selector]");
            for(let i=0;i<buttonCheckbox.length;i++){
                buttonCheckbox[i].addEventListener('change', (e)=>{
                    if(e.target.getAttribute("darkmode-selector") === "true"){
                        e.target.checked ? this.off() : this.on();
                    }else if(buttonCheckbox[i].getAttribute("darkmode-selector") === "false"){
                        e.target.checked ? this.on() : this.off();
                    }else{
                        e.target.checked ? this.off() : this.on();
                    }
                });
            }
        }
    }
    async updateButtons(){
        // set switch to right pos
        const switchButton = document.querySelectorAll("[darkmode-switch]");
        for(let i=0;i<switchButton.length;i++){
            this.mode ? switchButton[i].setAttribute("darkmode-switch", "on") : switchButton[i].setAttribute("darkmode-switch", "off");
        }
        // set checkbox to right pos
        const buttonCheckbox = document.querySelectorAll("[darkmode-selector]");
        for(let i=0;i<buttonCheckbox.length;i++){
            const button = buttonCheckbox[i];
            if(button.getAttribute("darkmode-selector") === "true"){
                this.mode ? button.checked = true : button.checked = false;
            }else if(button.getAttribute("darkmode-selector") === "false"){
                this.mode ? button.checked = false : button.checked = true;
            }else{
                this.mode ? button.checked = true : button.checked = false;
            }
        }
    }






    
    setTheme(){
        this.mode ? document.body.style.cssText = this.#dmt : document.body.style.cssText = this.#lmt;
    }
    #setUpdateSave(){
        this.setTheme();
        this.updateButtons();
        this.#saveState();
    }
    #getState(){
        localStorage.getItem("darkmode") === null && localStorage.setItem('darkmode', (window.matchMedia('(prefers-color-scheme: dark)').matches));
        return (localStorage.getItem('darkmode') === "true");
    }
    #saveState(){
        localStorage.setItem('darkmode', this.mode);
    }
}