'use babel'

import * as config from './config'
import * as customElements from './custom-elements'
import * as uri from './uri'

export default {
	DEFAULT_SETTINGS_PATH: config.DEFAULT_SETTINGS_PATH,
	PACKAGE_CSS_SELECTOR: config.PACKAGE_CSS_SELECTOR,
	EMOJI_KEYWORD_ELEMENT: customElements.EMOJI_KEYWORD_ELEMENT,
	EMOJI_SETTINGS_ELEMENT: customElements.EMOJI_SETTINGS_ELEMENT,
	EMOJI_CATALOG_ELEMENT: customElements.EMOJI_CATALOG_ELEMENT,
	EMOJI_DIRECTORY_ELEMENT: customElements.EMOJI_DIRECTORY_ELEMENT,
	PROTOCOL: uri.PROTOCOL,
	SETTINGS: uri.SETTINGS
}
