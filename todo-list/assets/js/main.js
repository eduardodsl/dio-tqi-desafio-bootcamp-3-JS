/**
 * Main controller for the to-do list
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 */

class Main {

    /**
     * Method containing all the initialization logic of the application
     * @returns void
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
     * @param {TodoListItem} item   item to be added to the todo list
     * @returns {void}
     */
    addItem(item){

        if(!(item instanceof TodoListItem)) {
            throw Error('todo list: item not an instance of TodoListItem');
        }

        const id = this.items.length + 1;

        item.id = id;
        this.items.push(item);

    }

    /**
     * Fectches the TodoItemList in the items list and sets its checked property to either true or false
     * @param {number} id       item id to find and change
     * @param {boolean} value   sets if item is checked or not
     * @returns void
     */
    checkItem(id, value){
        this.items.forEach((e) => {
            if(e.id === parseInt(id)){
                e.checked = value;
            }
        });
    }

    /**
     * Builds the HTML code required to show the todo list
     * @return {void}
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
                this.checkItem(e.target.id.replace('check-', ''), e.target.checked);
            });
        });

    }

}

/**
 * Represents an individual item in the Todo List
 */
class TodoListItem {

    /**
     * @param {string} value
     * @return {TodoListItem}
     */
    constructor(value){

        if(!value){
            throw Error('todo list: failed to instantiate TodoListItem: field value is not valid');
        }

        this.value = value;
        this.checked = false;
    }

    /**
     * Builds a string representation of the Todo List Item
     * @return {string}    the list item string as a string template
     */
    textBody(){

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