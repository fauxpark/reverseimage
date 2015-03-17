'use strict';
var reverseimage={
	onPopupShowing:function(){
		if(gContextMenu) document.getElementById('reverseimage-search').hidden=(!gContextMenu.onImage);
	},
	onLoad:function(){
		var contextmenu=document.getElementById('contentAreaContextMenu');
		if(contextmenu) contextmenu.addEventListener('popupshowing',reverseimage.onPopupShowing,false);
	},
	addParamsToForm:function(form,key,value){
		var hiddenField=content.document.createElement('input');
		hiddenField.setAttribute('type','hidden');
		hiddenField.setAttribute('name',key);
		hiddenField.setAttribute('value',value);
		form.appendChild(hiddenField);
	},
	search:function(){
		var src=gContextMenu.imageURL||gContextMenu.mediaURL;
		if(src.indexOf('data:')==0){
			var base64Offset=src.indexOf(',');
			if(base64Offset!=-1){
				var form=content.document.createElement('form');
				form.setAttribute('id','reverseimage-inline-form');
				form.setAttribute('method','POST');
				form.setAttribute('action','https://www.google.com/searchbyimage/upload');
				form.setAttribute('enctype','multipart/form-data');
				form.setAttribute('target','_blank');
				reverseimage.addParamsToForm(form,'image_content',src.substring(base64Offset+1).replace(/\+/g,'-').replace(/\//g,'_').replace(/\./g,'='));
				reverseimage.addParamsToForm(form,'filename','');
				reverseimage.addParamsToForm(form,'image_url','');
				content.document.body.appendChild(form);
				form.submit();
				content.document.body.removeChild(form);
			}
		}else{
			var newTab=gBrowser.addTab('https://www.google.com/searchbyimage?&image_url='+encodeURIComponent(src),{relatedToCurrent:1});
			gBrowser.selectedTab=newTab;
		}
	}
};
window.addEventListener('load',reverseimage.onLoad,false);
