// Determines which method will be used to perform the search, and returns the appropriately formatted src attribute.

self.on('click', function(node, data) {
	if(node.src.indexOf('data:') == 0) {
		var offset = node.src.indexOf(',');

		if(offset != -1) {
			self.postMessage({
				isUrl: false,
				src: node.src.substring(offset + 1).replace(/\+/g, '-').replace(/\//g, '_').replace(/\./g, '=')
			});
		}
	} else {
		self.postMessage({
			isUrl: true,
			src: encodeURIComponent(node.src)
		});
	}
});
