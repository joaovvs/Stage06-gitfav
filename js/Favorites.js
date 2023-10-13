import { GithubUser } from "./GithubUser.js"

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
        

    }

    async add(username){
        try{

            const userExists = this.entries.find( entry => entry.login == username)

            if(userExists){
                throw new Error('Usuário já cadastrado')
            }
            
            const user = await GithubUser.search(username)

            if(user.login === undefined){
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error) {
            alert(error.message)
        }
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem
        ('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    delete (user) {
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
        this.save()
    }
   

}