export default class ViewProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.modulePath = './modules/admin/'
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                this.modulePath + 'views/profile.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))  
    }
}