export default class PageUserList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.themePath = './themes/default/'
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                this.themePath + 'page/user-list.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))  

        const responseUserList = await fetch(
            new Request(
                '/api/userlist.php',
                { method: 'GET' }
            )
        )

        for (const user of await responseUserList.json()) {
            const row = document.createElement('tr')
            const cellUsername = document.createElement('td')
            const cellFirstname = document.createElement('td')
            const cellLastname = document.createElement('td')
            const cellEmail = document.createElement('td')

            const cellTextUsername = document.createTextNode(user.username)
            const cellTextFirstname = document.createTextNode(user.firstname)
            const cellTextLastname = document.createTextNode(user.lastname)
            const cellTextEmail = document.createTextNode(user.email)

            cellUsername.appendChild(cellTextUsername)
            cellFirstname.appendChild(cellTextFirstname)
            cellLastname.appendChild(cellTextLastname)
            cellEmail.appendChild(cellTextEmail)

            row.appendChild(cellUsername)
            row.appendChild(cellFirstname)
            row.appendChild(cellLastname)
            row.appendChild(cellEmail)

            this.shadowRoot.querySelector('tbody').appendChild(row)
         }
    }

    static get observedAttributes() { return ['theme-path']; }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'theme-path') {
            return
        }
        this.themePath = newValue
    }
}