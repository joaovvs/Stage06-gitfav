export class GithubUser {
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then( response => response.json())
        .then(userJson => {
           return{
                login: userJson.login,
                name: userJson.name,
                public_repos: userJson.public_repos,
                followers: userJson.followers,
            }
        })
    }
}
