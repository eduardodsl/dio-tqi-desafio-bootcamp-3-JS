/**
 * Checks if a text is palindrome
 * @author: Eduardo Augusto da Silva Leite <eduardodsl@gmail.com>
 * 
 * This script can be run from the command line, example:
 * ```sh
 * node isPalindrome.js Socorram-me, subi no ônibus em marrocos!
 * ```
 * all text after the script will be considered arguments to build the palindrome
 * webpage with words palindrome words (portuguese): https://www.dicio.com.br/lista-palindromos/
 */

/**
 * Checks if a text is a palindrome
 * @param {string} text text to check if whether is a palindrome or not
 * @return {boolean} returns true if text is a palindrome
 */
function isPalindrome(text){
    
    if(typeof text !== 'string'){
        throw Error('ERROR: text must be string!');
    }

    text = sanitize(text);

    for(let i = 0; i < text.length / 2; i++){
        if(text[i] !== text[ text.length - 1 - i ]){
            return false;
        }
    }

    return true;

}

/**
 * Removes spaces and non alphanumeric characters
 * @param {string} text the string to normalize
 * @return {string} returns the normalized string
 * 
 * usage:
 * ```
 * sanitize("Socorram-me, subi no ônibus em marrocos!");
 * ```
 * it should return "socorrammesubinoonibusemmarrocos"
 */
function sanitize(text){
    // normalize words with diacritics to NFD and then remove all non-alphanumeric characters
    return text.toLowerCase().normalize("NFD").replace(/[^0-9a-z]/g, '');
}

function main(args){
    
    if(args.length > 2){
        const text = args.slice(2).join(" ");
        try {
            console.log(`"${text}" ${isPalindrome(text) ? 'is a' : 'is not a'} palindrome!`);
            process.exit(0);
        }catch(e){
            console.error(e);
            process.exit(1);
        }
    }else{
        console.error('ERROR: no text argument sent!');
        process.exit(1);
    }
    
}

main(process.argv);