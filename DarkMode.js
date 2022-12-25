class DarkMode{
    /**
     * @param {string} darkModeTheme A string of css variables for a dark theme
     * @param {string} lightModeTheme A string of css variables for a light theme
     */
    constructor(darkModeTheme="", lightModeTheme=""){
        this.dmt = darkModeTheme;
        this.lmt = lightModeTheme;
        this.mode = this.#getState();
        this.setTheme();
        if(document.readyState==="complete"||document.readyState === "interactive"){this.applyListener();}else{window.addEventListener("DOMContentLoaded",()=>{this.applyListener();});}
        this.updateButtons();
    }
    /**
     * Set the theme to the users prefered color scheme
     */
    defaultColorScheme(){
        this.mode = (window.matchMedia('(prefers-color-scheme: dark)').matches);
        this.#setUpdateSave();
    }
    /**
     * Set the theme to dark
     */
    on(){
        this.mode = true;
        this.#setUpdateSave();
    }
    /**
     * Set the theme to light
     */
    off(){
        this.mode = false;
        this.#setUpdateSave();
    }
    /**
     * Toggle between the themes
     */
    toggle(){
        this.mode = !this.mode;
        this.#setUpdateSave();
    }
    /**
     * Returns Boolean (true if dark || false if light)
     */
    getMode(){
        return this.mode;
    }
    /**
     * Add eventListeners to elements with "darkmode-switch" & "darkmode-selector" attributes
     */
    async applyListener(){
        // on off etc
        const modeButton = document.querySelectorAll("[darkmode-button]");
        for(let i=0;i<modeButton.length;i++){
            modeButton[i].addEventListener("click", (e)=>{
                if(e.target.closest("[darkmode-button]").getAttribute("darkmode-button") === "on"){
                    this.on();
                }else if(e.target.closest("[darkmode-button]").getAttribute("darkmode-button") === "off"){
                    this.off();
                }else if(e.target.closest("[darkmode-button]").getAttribute("darkmode-button") === "switch"){
                    this.toggle();
                }else if(e.target.closest("[darkmode-button]").getAttribute("darkmode-button") === "default"){
                    this.defaultColorScheme();
                }
                // add some attribute for css styling
                e.target.setAttribute("darkmode-data", this.mode);
            });
        }
        // checkboxes
        const buttonCheckbox = document.querySelectorAll("[darkmode-selector]");
        for(let i=0;i<buttonCheckbox.length;i++){
            buttonCheckbox[i].addEventListener('change', (e)=>{
                if(e.target.getAttribute("darkmode-selector") === "false"){
                    e.target.checked ? this.off() : this.on();
                }else{
                    e.target.checked ? this.on() : this.off();
                }
            });
        }
        this.updateButtons();
    }
    /**
     * Update the switch and attributes for elements with "darkmode-switch" & "darkmode-selector" attributes
     */
    async updateButtons(){
        // set switch to right pos
        const modeButton = document.querySelectorAll("[darkmode-button]");
        for(let i=0;i<modeButton.length;i++){
            modeButton[i].setAttribute("darkmode-data", this.mode);
        }
        // set checkbox to right pos
        const buttonCheckbox = document.querySelectorAll("[darkmode-selector]");
        for(let i=0;i<buttonCheckbox.length;i++){
            const button = buttonCheckbox[i];
            if(button.getAttribute("darkmode-selector") === "false"){
                this.mode ? button.checked = false : button.checked = true;
            }else{
                this.mode ? button.checked = true : button.checked = false;
            }
        }
    }
    /**
     * Update the DOM css variables with given themes
     */
    setTheme(){
        this.mode ? document.body.style.cssText = this.dmt : document.body.style.cssText = this.lmt;
    }
    /**
     * shortcut for updating dom, updating buttons, saving to localstorage
     */
    #setUpdateSave(){
        this.setTheme();
        this.updateButtons();
        this.#saveState();
    }
    /**
     * get the theme from localstorage. If it does not exist get the device color scheme
     */
    #getState(){
        // if state doesnt exist default to the defaultStyle
        localStorage.getItem("darkmode") === null && localStorage.setItem('darkmode', (window.matchMedia('(prefers-color-scheme: dark)').matches));
        return (localStorage.getItem('darkmode') === "true");
    }
    /**
     * save the theme mode to localstorage
     */
    #saveState(){
        localStorage.setItem('darkmode', this.mode);
    }
}