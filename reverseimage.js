const id = 'reverse-image-search';
const searchUrl = 'https://www.google.com/searchbyimage?image_url=';

browser.contextMenus.create({
    id: id,
    title: 'Search Google with this image',
    contexts: ['image'],
    icons: {
        '16': 'icon.svg'
    }
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch(info.menuItemId) {
        case id:
            if(info.srcUrl.indexOf('data:') == 0) {
                var offset = info.srcUrl.indexOf(',');

                browser.tabs.create({
                    url: 'about:blank'
                }).then(tab => {
                    browser.tabs.executeScript(tab.id, {
                        file: '/form.js',
                        matchAboutBlank: true
                    }).then(() => {
                        browser.tabs.sendMessage(tab.id, {
                            dataUri: info.srcUrl.substring(offset + 1).replace(/\+/g, '-').replace(/\//g, '_').replace(/\./g, '=')
                        });
                    });
                });
            } else {
                browser.tabs.create({
                    url: searchUrl + encodeURIComponent(info.srcUrl)
                });
            }

            break;
    }
});
