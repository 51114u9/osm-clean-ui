// ==UserScript==
// @name		OpenStreetMap Clean UI
// @namespace	http://userscripts.org/users/510421
// @description	Remove unnecessary elements and modernize UI on OpenStreetMap

// @include		http://www.openstreetmap.org/*
// @exclude		http://www.openstreetmap.org/edit*
// @exclude		http://www.openstreetmap.org/traces*
// @exclude		http://www.openstreetmap.org/user/*/traces

// @include		http://openstreetmap.org/*
// @exclude		http://openstreetmap.org/edit*
// @exclude		http://openstreetmap.org/traces*
// @exclude		http://openstreetmap.org/user/*/traces

// @license		BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version		0.2

// ==/UserScript==

// Declare globals
var elmLeft;
var elmLeftMenu;
var elmTabNav;
var elmSearchBox;

// Load prerequisites
loadGlobalCSS();

// Execute
findMenus();
findAndFixLogo();
findAndFixSearch();
findAndFixCommunity();
findAndFixHelp();
removeLeftMenu();

// Functions

function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

function loadGlobalCSS() {
	addGlobalStyle(
		'#searchbox { background: rgba(255,255,255,.8); position: absolute; bottom: 50px; left: 50px !important; width: auto; height: auto; margin: 0px !important; padding: 10px !important; border-radius: 4px; -webkit-border-radius: 4px; box-shadow: 0 1px 7px 0px rgba(0,0,0,0.8); -webkit-box-shadow: 0 1px 7px 0px rgba(0,0,0,0.8); z-index:9999; }' +
		'#search_form { width: 200px !important; }' +
		'#search_field input[type="submit"] { width: 20px !important; height: 20px !important; }' +
		'#search_field input[type="text"] { background: rgba(238,238,236,.8); border: 0 !important; border-radius: 4px; -webkit-border-radius: 4px; }' +
		'#search_field input[type="text"]:focus { outline: 0; box-shadow: 0 0 2px rgba(0,0,0,.8) inset; }' +
		'#query { width: 200px !important; height: 30px !important; }' +
		'#top-bar { background: rgba(255,255,255,.8); margin-left: 0px !important; }' +
		'#editmenu { left: 47px !important; }' +
		'.wrapper { margin-left: 0px !important; }' +
		'#content { left: 0px !important; }' +
		'.diary_post { max-width: 100% !important; }'
	 );
}

function findMenus() {
	elmLeft = document.getElementById('left');
	if (!elmLeft) { return; }

	elmLeftMenu = document.getElementById('left_menu');
	if (!elmLeftMenu) { return; }

	elmTabNav = document.getElementById('tabnav');
	if (!elmTabNav) { return; }
}

function findAndFixLogo() {
	var elmSmallTitle = document.getElementById('small-title');
	if (!elmSmallTitle) { return; }

	var elmA = elmSmallTitle.firstElementChild;
	elmA.title = 'OpenStreetMap';

	var elmImg = elmA.firstElementChild;
	elmImg.width = '24';
	elmImg.height = '24';

	var elmLi = document.createElement('li');
	elmLi.appendChild(elmA);

	elmTabNav.firstElementChild.parentNode.insertBefore(elmLi, elmTabNav.firstElementChild);
}

function findAndFixSearch() {
	for(i = 0; i < elmLeft.childNodes.length; i++) {
		if(elmLeft.childNodes[i].className == 'optionalbox') {
			elmSearchBox = elmLeft.childNodes[i];
			break;
		}
	}
	if (elmSearchBox) {
		elmSearchBox.setAttribute('id','searchbox');
		elmSearchBox.removeChild(elmSearchBox.lastElementChild);
	 }
}

function findAndFixCommunity() {
	var elmCommunity = elmLeftMenu.children[1].firstElementChild.innerHTML;
	var elmCommunityMenuContent1 = elmLeftMenu.children[1].lastElementChild;
	var elmCommunityMenuContent2 = elmLeftMenu.lastElementChild.firstElementChild.innerHTML;

	var elmCommunityAnchor = document.createElement('li');
	elmCommunityAnchor.innerHTML = '<a id="communityanchor" title="' + elmCommunity + '" href="#">' +
		elmCommunity + '<span class="menuicon">▼</span>' +
		'</a>';

	elmTabNav.appendChild(elmCommunityAnchor);

	var elmCommunityMenu = document.createElement('div');
	elmCommunityMenu.id = 'communitymenu';
	elmCommunityMenu.className = 'menu';
	elmCommunityMenu.appendChild(elmCommunityMenuContent1);

	var elmUlCommunityMenuContent = document.createElement('ul');
	elmUlCommunityMenuContent.innerHTML = '<li>' + elmCommunityMenuContent2 + '</li>';
	elmCommunityMenu.appendChild(elmUlCommunityMenuContent);

	var elmEditMenu = document.getElementById('editmenu');
	if (!elmEditMenu) { return; }

	elmEditMenu.parentNode.insertBefore(elmCommunityMenu, elmEditMenu.nextSibling);

	var elmJavaScript = document.createElement('script');
	elmJavaScript.type = 'text/javascript';
	elmJavaScript.innerHTML = 'createMenu("communityanchor", "communitymenu", "left");';

	elmCommunityMenu.parentNode.insertBefore(elmJavaScript, elmCommunityMenu.nextSibling);
}

function findAndFixHelp() {
	var elmHelp = elmLeftMenu.firstElementChild.firstElementChild.innerHTML;
	var elmHelpMenuContent = elmLeftMenu.firstElementChild.lastElementChild;

	var elmHelpAnchor = document.createElement('li');
	elmHelpAnchor.innerHTML = '<a id="helpanchor" title="' + elmHelp + '" href="#">' +
		elmHelp + '<span class="menuicon">▼</span>' +
		'</a>';

	elmTabNav.appendChild(elmHelpAnchor);

	var elmHelpMenu = document.createElement('div');
	elmHelpMenu.id = 'helpmenu';
	elmHelpMenu.className = 'menu';
	elmHelpMenu.appendChild(elmHelpMenuContent);

	var elmEditMenu = document.getElementById('editmenu');
	if (!elmEditMenu) { return; }

	elmEditMenu.parentNode.insertBefore(elmHelpMenu, elmEditMenu.nextSibling);

	var elmJavaScript = document.createElement('script');
	elmJavaScript.type = 'text/javascript';
	elmJavaScript.innerHTML = 'createMenu("helpanchor", "helpmenu", "left");';

	elmHelpMenu.parentNode.insertBefore(elmJavaScript, elmHelpMenu.nextSibling);
}

function removeLeftMenu() {
	if (elmSearchBox) { elmLeft.parentNode.replaceChild(elmSearchBox, elmLeft); }
	else { elmLeft.parentNode.removeChild(elmLeft); }
}
