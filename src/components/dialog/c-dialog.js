const dialog = `
<dialog id="simple-dialog" c-show="false" style="display: none">
    <form method="dialog" id="dialog-form">
        <article>
            <section class="message">
                <div class="icon" id="dialog-icon"></div>
                <p id="dialog-message"></p>
            </section>
        </article>
        <footer>
            <menu id="dialog-menu">
            </menu>
        </footer>
    </form>
</dialog>
`;

let dialogId = "simple-dialog";

class cDialog extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = dialog;

        const iconsLink = document.createElement('link');
        iconsLink.setAttribute('rel', 'stylesheet');
        iconsLink.setAttribute('href', "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', new URL('styles.css', import.meta.url).href);

        shadow.appendChild(iconsLink);
        shadow.appendChild(styleLink);

        const script = document.createElement('script');
        script.setAttribute('src', new URL('../button/c-button.js', import.meta.url).href);
        script.setAttribute('type', 'module');
        shadow.appendChild(script);
    }

    set buttons(buttons) {
        this.cButtons = buttons || undefined;
    }

    get buttons() {
        return this.cButtons;
    }

    get icon() {
        return this.getAttribute("icon");
    }

    setIcon(icon) {
        this.setAttribute("icon", icon);
    }

    set(message) {
        this.setAttribute("message", message);
    }

    get message() {
        return this.getAttribute("message");
    }

    connectedCallback() {
        this.shadowRoot.getElementById('dialog-message').textContent = this.message || "Dialog";

        if (!this.buttons) {
            const button = document.createElement('c-button');
            button.type = "button";
            button.text = "OK";

            button.addEventListener("c-click", (event) => {
                const dialog = this.shadowRoot.getElementById(dialogId);
                dialog.style.display = "none";
                dialog.setAttribute("c-show", "false");
            });

            this.shadowRoot.getElementById('dialog-menu').appendChild(button);
        } else {
            this.buttons.forEach((buttonObj) => {
                const button = document.createElement('c-button');
                button.type = buttonObj.type;
                button.text = buttonObj.text;

                button.addEventListener("c-click", (event) => {
                    buttonObj.callback(event);
                    const dialog = this.shadowRoot.getElementById(dialogId);
                    dialog.style.display = "none";
                    dialog.setAttribute("c-show", "false");
                });

                this.shadowRoot.getElementById('dialog-menu').appendChild(button);
            });
        }

        this.updateIcon();
    }

    open() {
        const dialog = this.shadowRoot.getElementById(dialogId);
        dialog.style.display = "grid";
        dialog.setAttribute("c-show", "true");
    }

    updateIcon() {
        let icon = this.shadowRoot.querySelector('span');

        if (!icon) {
            icon = document.createElement('span');

            const iconSection = this.shadowRoot.getElementById('dialog-icon');

            iconSection.appendChild(icon);
        }

        if (icon) {
            icon.className = "material-symbols-outlined";
            icon.textContent = this.icon || "info";
        }

    }
}

customElements.define("c-dialog", cDialog);
