/**
 * Main controller for the to-do list
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 */

class Main {

    /**
     * Method containing all the initialization logic of the application
     * @return void
     */
    init(){
        
        this.taskNameEl = document.getElementById('task-name');
        this.addTaskEl = document.getElementById('add-task');
        this.tasksEl = document.getElementById('tasks');
        this.items = [];

        this.addTaskEl.addEventListener('click', () => {
            const value = this.taskNameEl.value;
            if(value !== ''){
                try {
                    const item = new TodoListItem(value);
                    this.addItem(item);
                    this.render();
                } catch(e) {
                    console.error(e);
                }
            }else{
                alert('valor do campo está vazio, por favor preencha um texto');
            }

            this.taskNameEl.value = '';
        });

    }

    /**
     * Adds item to the todo list, argument item must be an instance of TodoListItem
     * or it will throw an error
     * @param {TodoListItem} item item to be added to the todo list
     * @return void
     */
    addItem(item){

        if(!(item instanceof TodoListItem)) {
            throw Error('todo list: item not an instance of TodoListItem');
        }

        const id = this.items.length + 1;

        item.id = id;
        this.items.push(item);

    }

    checkItem(id){
        console.log(id);
        this.items.forEach((e) => {
            if(e.id === parseInt(id)){
                e.checked = true;
            }
        });
    }

    /**
     * Builds the HTML code required to show the todo list
     */
    render(){

        let content = '';
        
        this.items.forEach(item => {
            content += item.textBody();
        });

        this.tasksEl.innerHTML = content;

        let checks = document.querySelectorAll('#tasks li input[type=checkbox]');
        checks.forEach(el => {
            el.addEventListener('click', (e) => {
                this.checkItem(e.target.id.replace('check-'));
            });
        });

    }

}

class TodoListItem {

    constructor(value){

        if(!value){
            throw Error('todo list: failed to instantiate TodoListItem: field value is not valid');
        }

        this.value = value;
        this.checked = false;
    }

    textBody(){

        console.log(this);

        const elementText = `<li>
            <label>
                <input
                    type='checkbox'
                    value='${this.id}'
                    id='check-${this.id}'
                    name='check-${this.id}'
                    ${ (this.checked) ? 'checked' : '' }
                >
                <span class='value'>
                    ${this.value}
                </span>
            </label>
        </li>`;
        
        return elementText;

    }

}

// instantiates the main app
const app = new Main();

// only when all DOM is loaded the app should run
document.addEventListener( 'DOMContentLoaded', () => app.init() );