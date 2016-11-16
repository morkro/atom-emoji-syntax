'use babel'

import * as config from './config'
import * as customElements from './custom-elements'
import * as uri from './uri'

export default {
	DEFAULT_SETTINGS_PATH: config.DEFAULT_SETTINGS_PATH,
	PACKAGE_CSS_SELECTOR: config.PACKAGE_CSS_SELECTOR,
	EMOJI_KEYWORD: customElements.EMOJI_KEYWORD,
	EMOJI_SETTINGS: customElements.EMOJI_SETTINGS,
	EMOJI_LIST: customElements.EMOJI_LIST,
	PROTOCOL: uri.PROTOCOL,
	SETTINGS: uri.SETTINGS
}
