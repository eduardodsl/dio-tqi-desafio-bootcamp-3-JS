/**
 * Main controller for the cataas api app
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 */

// catapi wasn't working, so I replaced it for the cataas api
const BASE_URL = 'https://cataas.com/cat?json=true';

class Main {

    /**
     * Method containing all the intilization logic of the application
     * @returns void
     */
    init(){
        this.catBtnEl = document.getElementById('cat-btn');
        this.catImgEl = document.getElementById('cat-img');
        this.catBtnEl.addEventListener('click', () => this.loadImg() );
    }

    async getCats(){
        try{
            const data = await fetch(BASE_URL);
            const json = await data.json();
            const imgUrl = 'https://cataas.com/cat/'+json.id
            return imgUrl;
        }catch(e){
            console.log(e);
        }
    }

    async loadImg(){
        this.catImgEl.src = await this.getCats();
    }

}

// instantiates the main app
const app = new Main();

// only when all DOM is loaded the app should run
document.addEventListener( 'DOMContentLoaded', () => app.init() );