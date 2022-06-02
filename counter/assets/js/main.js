/**
 * Main controller for the counter app
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 */

class Main {

    /**
     * Method containing all the intilization logic of the application
     * @returns void
     */
    init(){
        
        // current counter state
        this.counter = 0;
        // main counter DOM element
        this.counterMainEl = document.getElementById('counter-main');
        // counter DOM element
        this.counterEl = document.getElementById('counter');
        // subtraction button
        this.subEl = document.getElementById('sub');
        // sum button
        this.addEl = document.getElementById('add');
        // quantity input
        this.qtdEl = document.getElementById('qtd');

        this.subEl.addEventListener('click', () => {
            const subValue = parseInt(this.qtdEl.value);
            this.counterEl.innerText = this.sub(subValue);
            this.checkCounterStatus();
        });

        this.addEl.addEventListener('click', () => {
            const sumValue = parseInt(this.qtdEl.value);
            this.counterEl.innerText = this.add(sumValue);
            this.checkCounterStatus();
        });

    }

    /**
     * Check the current counter status and apply changes to the form 
     */
    checkCounterStatus(){
        if(this.counter < 0){
            this.counterMainEl.classList.add('below-zero');
        }else{
            this.counterMainEl.classList.remove('below-zero');
        }
    }

    /**
     * Adds number to the counter and return its current state
     * @param {number} quantity - quantity to add
     * @return {number} current counter state
     */
    add(quantity = 1){
        quantity = this.validate(quantity);
        this.counter += quantity
        return this.counter;
    }

    /**
     * Removes numbers from the counter and return its current state
     * @param {number} quantity - quantity to remove
     * @return {number} a number different from 0
     */
    sub(quantity = 1){
        quantity = this.validate(quantity);
        this.counter -= quantity;
        return this.counter;
    }

    /**
     * Makes sure quantity is neither zero or a number
     * @param {number} quantity - quantity evaluate
     * @return {number} a number different from 0
     */
    validate(quantity) {

        if(quantity === 0 || Number.isNaN(quantity)){
            this.qtdEl.value = 1;
            console.warn(`counter: ${quantity} not a valid number, returning 1 instead`);
            return 1;
        }

        return quantity;

    }

}

// instantiates the main app
const app = new Main();

// only when all DOM is loaded the app should run
document.addEventListener( 'DOMContentLoaded', () => app.init() );