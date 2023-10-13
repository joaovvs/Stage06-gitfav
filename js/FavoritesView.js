import { Favorites } from "./Favorites.js"

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector('table tbody')
        this.main = this.root.querySelector('main')

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('#input-wrapper button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('#input-user')
            
            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        /* valida tabela vazia*/ 
        const isEmpty = this.entries.length == 0
        if(isEmpty){
            console.log(this.entries.length)
            this.main.append(this.createEmptyTableView())
        } else {
            this.removeEmptyTableView()
        }


        this.entries.forEach( user => {
            const row = this.createRow()
           row.querySelector('.user img').src = `https://github.com/${user.login}.png`
           row.querySelector('.user img').alt = `Imagem de ${user.name}`
           row.querySelector('.user a').href = `https://github.com/${user.login}`
           row.querySelector('.user p').textContent = user.name
           row.querySelector('.user span').textContent = `/${user.login}`
           row.querySelector('.repositories').textContent = user.public_repos
           row.querySelector('.followers').textContent = user.followers

           row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Tem certeza que deseja deletar essa linha?')    
            if(isOk){
                this.delete(user)
            }
           }
           this.tbody.append(row)
        } )  


    
    }

    createEmptyTableView(){
        const div = document.createElement('div')
        div.classList.add("emptyTable")
        div.innerHTML = `
        <img src="./assets/Estrela.svg" alt="Estrela">
        <p>Nenhum favorito ainda</p>
        `

        return div
    }

    removeEmptyTableView(){
        const emptyTable = this.main.querySelector(".emptyTable")
        if(emptyTable)
            this.main.removeChild(emptyTable)
    }


    createRow() {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/joaovvs.png" alt="Imagem de João Vinícius">
            <a href="https://github.com/joaovvs" target="_blank">
                <p>João Santana</p>
                <span>joaovvs</span>
            </a>
        </td>
        <td class="repositories">
            15
        </td>
        <td class="followers">
            0
        </td>
        <td class="action">
            <button class="remove">Remover</button>
        </td>
        `

        return tr
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr').forEach((tr) => {
           tr.remove()
        })
    }

}