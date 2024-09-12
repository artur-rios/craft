const elementId = crypto.randomUUID();

class cButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const shadow = this.shadowRoot;

        const iconsLink = document.createElement('link');
        iconsLink.setAttribute('rel', 'stylesheet');
        iconsLink.setAttribute('href', "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', new URL('styles.css', import.meta.url).href);

        shadow.appendChild(iconsLink);
        shadow.appendChild(styleLink);

        this.button = document.createElement(this.type === 'file' ? 'input' : 'button');
        this.button.id = elementId;
        this.button.textContent = this.text;
        this.button.type = this.type || "button";

        if (this.type === "x") {
            this.button.className = "btn-custom btn-large";
        }

        shadow.appendChild(this.button);
        this.updateIcon();

        this.button.addEventListener('click', this.handleClick.bind(this));
    }

    get id() {
        return elementId;
    }

    get icon() {
        return this.getAttribute("icon");
    }

    setIcon(icon) {
        this.setAttribute("icon", icon);
    }

    get text() {
        return this.getAttribute("text");
    }

    set text(text) {
        this.setAttribute("text", text);
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(type) {
        this.setAttribute("type", type);
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('c-click', {
            bubbles: true,
            composed: true,
            detail: {id: elementId, value: this.text}
        }));
    }

    static get observedAttributes() {
        return ['text', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            const button = this.shadowRoot.querySelector('button');

            if (button) {
                button.textContent = newValue;
            }
        } else if (name === 'icon') {
            this.updateIcon();
        }
    }

    updateIcon() {
        if (this.icon) {
            let icon = this.shadowRoot.querySelector('span');

            if (!icon && this.button) {
                icon = document.createElement('span');
                this.button.appendChild(icon);
            }

            if (icon) {
                icon.className = "material-symbols-outlined";
                icon.textContent = this.icon;
            }
        }
    }
}

customElements.define("c-button", cButton);
