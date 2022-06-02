/**
 * Replaces even numbers for 0
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 * 
 * This script can be run from the command line, in which all numbers must be separated by space example:
 * ```sh
 * node replaceEven.js 1 3 4 5 t 10 -20
 * ```
 */

/**
 * Check and replaces even numbers for 0. All arrays will be edited by reference
 * @param {array} list      - argument list array
 * @param {array} output    - output list only with valid integer values
 * @param {array} invalid   - invalid list only with non numerical values
 * @returns {void}
 */
function checkEvenNumbers(list, output = [], invalid = []){

    if(!Array.isArray(list)){
        let err = new TypeError('first parameter "list" is not an array');
        err.name = "TypeError";
        list = [];
        throw err;
    }

    for(let i = 0; i < list.length; i++){
        let number = parseInt(list[i]);
        if(isNaN(number)){
            invalid.push(list[i]);
        }else{
            if(number === 0){
                output.push(0);
            }else if(number % 2 === 0){
                output.push(0);
            }else{
                output.push(number);
            }
        }
    }

}

function main(args){
    
    if(args.length > 2){

        let list = args.slice(2);
        let invalid = [];
        let output = [];
        try {
            checkEvenNumbers(list, output, invalid);
            console.log('list sent..: ', list);
            console.log('result.....: ', output);
            console.log('invalid....: ', invalid);
            process.exit(0);
        }catch (e) {
            console.log(e);
            process.exit(1);
        }
        
    }else{
        console.error('ERROR: no list argument sent!');
        process.exit(1);
    }
    
}

main(process.argv);