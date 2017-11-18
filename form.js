function addHiddenField(form, name, value) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', name);
    hiddenField.setAttribute('value', value);
    form.appendChild(hiddenField);
}

browser.runtime.onMessage.addListener(request => {
    if(!document.body) {
        document.body = document.createElement('body');
    }

    var form = document.createElement('form');
    form.setAttribute('id', 'reverseimage-inline-form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://www.google.com/searchbyimage/upload');
    form.setAttribute('enctype', 'multipart/form-data');
    addHiddenField(form, 'image_content', request.dataUri);
    addHiddenField(form, 'filename', '');
    addHiddenField(form, 'image_url', '');
    document.body.appendChild(form);
    form.submit();
});
