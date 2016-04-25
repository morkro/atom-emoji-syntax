'use babel';

class EmojiPanelView extends HTMLElement {
	createdCallback () {}
}

export default EmojiPanelView = document.registerElement('emoji-panel',
	{ prototype: EmojiPanelView.prototype }
);
