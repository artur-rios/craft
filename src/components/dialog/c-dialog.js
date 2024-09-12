const dialog = `
<dialog id="simple-dialog" c-show="false" style="display: none">
    <form method="dialog" id="dialog-form">
        <article>
            <section class="warning-message">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" >
                    <title>A warning icon</title>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <p>Modal title</p>
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

        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', new URL('styles.css', import.meta.url).href);
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

    connectedCallback() {
        if (!this.cButtons) {
            const button = document.createElement('c-button');
            button.type = "button";
            button.text = "OK";

            button.addEventListener("c-click", (event) => {
                console.log(event);
                const dialog = this.shadowRoot.getElementById(dialogId);
                dialog.style.display = "none";
                dialog.setAttribute("c-show", "false");
            });

            this.shadowRoot.getElementById('dialog-menu').appendChild(button);
        }
    }

    open() {
        const dialog = this.shadowRoot.getElementById(dialogId);
        dialog.style.display = "grid";
        dialog.setAttribute("c-show", "true");
    }
}

customElements.define("c-dialog", cDialog);
