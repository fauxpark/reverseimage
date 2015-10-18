// Defines the context menu item and handles tab creation.

var self = require('sdk/self');
var cm = require('sdk/context-menu');
var tabs = require('sdk/tabs');

cm.Item({
	label: 'Search Google with this image',
	image: self.data.url('icon-16.png'),
	context: cm.SelectorContext('img'),
	accesskey: 'e',
	contentScriptFile: self.data.url('search.js'),
	onMessage: function(msg) {
		if(msg.isUrl) {
			tabs.open('https://www.google.com/searchbyimage?image_url=' + msg.src);
		} else {
			tabs.open({
				url: 'about:blank',
				onLoad: function(tab) {
					tab.attach({
						contentScriptFile: self.data.url('form.js'),
						contentScriptOptions: {src: msg.src}
					});
					tab.off('load');
				}
			});
		}
	}
});
