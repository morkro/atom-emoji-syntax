'use babel'

import { DirectoryElement } from '../../lib/custom-elements'

describe('<emojisyntax-directory>', () => {
	const $directory = new DirectoryElement()

	it('it is an HTMLElement', () => {
		expect($directory).toBeInstanceOf(HTMLElement)
	})
})
