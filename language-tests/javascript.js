/**
 * Keyword: import
 */
import name from 'module-name'
import { member } from 'module-name'
import defaultMember from 'module-name'
import 'module-name'

/**
 * Keyword: export
 */
export { name1, name2, nameN }
export let name1, name2, nameN
export default function () {}
export { name1 as default }
export { import1 as name1, import2 as name2, nameN } from 'module'

/**
 * Keyword: delete
 */
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple']
delete trees[3]

function Foo() {}
Foo.prototype.bar = 42
var foo = new Foo()
delete foo.bar

/**
 * Keyword: function
 */
var awesome = function () {
	return 'not awesome'
}

function calc_sales (units_a, units_b, units_c) {
	return units_a * 79 + units_b * 129 + units_c * 699
}

/**
 * Keyword: arrow function
 */
const arrow = () => {
	return true
}

/**
 * Keyword: typeof
 */
typeof 37 === 'number'
typeof Symbol.iterator === 'symbol'
typeof (typeof 1) === 'string'
typeof Boolean(true) === 'boolean'
typeof undefined === 'undefined'

/**
 * Keyword: instanceof
 */
var myString = new String()
myString  instanceof String
myString  instanceof Object

/**
 * Keyword: yield
 */
function* foo () {
	let index = 0
	while (index <= 2) {
		yield index++
	}
}

/**
 * Special API: console
 */
console.log('foo logging')
console.warn(`don't do that!`)
console.error('NO')

/**
 * Keyword: method
 */
class Wizard {
	enableMagic() {
	  return true
  }
}

/**
 * Keyword: const
 */
const okay = false

/**
 * Keyword: variable
 */
let it = 'be'
var x = true
