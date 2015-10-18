// Creates and submits an inline form to upload the image if the src is not a URL.

function addParams(form, name, value) {
	var hiddenField = document.createElement('input');
	hiddenField.setAttribute('type', 'hidden');
	hiddenField.setAttribute('name', name);
	hiddenField.setAttribute('value', value);
	form.appendChild(hiddenField);
}

var form = document.createElement('form');
form.setAttribute('id', 'reverseimage-inline-form');
form.setAttribute('method', 'post');
form.setAttribute('action', 'https://www.google.com/searchbyimage/upload');
form.setAttribute('enctype', 'multipart/form-data');
addParams(form, 'image_content', self.options.src);
addParams(form, 'filename', '');
addParams(form, 'image_url', '');
document.body.appendChild(form);
form.submit();
