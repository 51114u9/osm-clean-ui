// ==UserScript==
// @name		OpenStreetMap Clean UI
// @namespace	http://userscripts.org/users/510421
// @description	Remove unnecessary elements and modernize UI on OpenStreetMap

// @include		http://www.openstreetmap.org/*
// @include		https://www.openstreetmap.org/login*
// @include		https://www.openstreetmap.org/user*

// @include		http://openstreetmap.org/*
// @include		https://openstreetmap.org/login*
// @include		https://openstreetmap.org/user*

// @license		BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version		0.2.6

// ==/UserScript==

// Declare globals
var elmLeft;
var elmLeftMenu;
var elmTabNav;
var elmSearchBox;

// Load prerequisites
loadGlobalCSS();
loadPrintCSS();

// Execute
findMenus();
findAndFixSearch();
findAndFixData();
findAndFixCommunity();
findAndFixHelp();
removeLeftMenu();

// Functions

function addGlobalStyle(device, css) {
	var elmHead, elmStyle;
	elmHead = document.getElementsByTagName('head')[0];
	elmStyle = document.createElement('style');
	elmStyle.type = 'text/css';
	elmStyle.media = device;
	elmHead.appendChild(elmStyle);
	elmStyle.innerHTML = css;
}

function loadGlobalCSS() {
	addGlobalStyle('screen',
		'#small-title { background-color: #EEEEEE !important; border-bottom: 1px solid #CCCCCC !important; display: inline-block !important; font-size: 14px !important; height: 30px !important; margin: 0px !important; padding-top: 7px !important; position: fixed !important; text-align: center !important; top: 0 !important; width: 185px !important; z-index: 1 !important; } ' +
		'#searchbox { background: rgba(255,255,255,.8); position: absolute; bottom: 45px !important; left: 10px !important; width: auto; height: auto; margin: 0px !important; padding: 3px 4px !important; position: fixed; border-radius: 2px !important; -webkit-border-radius: 2px !important; box-shadow: 0 0 3px 0 rgba(0,0,0,0.8) !important; -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,0.8) !important; z-index:9999; } ' +
		'#search_form { width: 200px !important; } ' +
		'#search_field input[type="submit"] { margin-top: 2px !important; height: 20px !important; width: 15px !important; } ' +
		'#search_field input[type="text"] { background: rgba(238,238,236,.8); border: 0 !important; border-radius: 2px !important; -webkit-border-radius: 2px !important; } ' +
		'#search_field input[type="text"]:focus { outline: 0; box-shadow: 0 0 2px rgba(0,0,0,.8) inset; } ' +
		'#query { width: 200px !important; height: 30px !important; } ' +
		'#top-bar { background: rgba(255,255,255,.8); } ' +
		'.changeset #top-bar, .browse #top-bar, .site-copyright #top-bar, .trace #top-bar, .diary_entry #top-bar, .user #top-bar, .notes #top-bar, .oauth_clients #top-bar, .message #top-bar { left: 0; position: fixed; right: 0; top: 0; } ' +
		'#greeting { margin-right: 0px !important; padding-top: 0px !important; } ' +
		'ul.secondary-actions li { margin: 0px !important; padding: 0px 2px !important; } ' +
		'#greeting a, #greeting a:link, #greeting a:visited { color: #333 !important; float: left !important; font-weight: bold !important; margin-right: 0px !important; padding: 3px 5px !important; } ' +
		'#greeting a:link:hover, #greeting a:visited:hover { color: #000 !important; } ' +
		'span.count-number { background: none repeat scroll 0 0 #CB4437 !important; color: #FFFFFF !important; } ' +
		'#tabnav a, #tabnav a:link, #tabnav a:visited { color: #333 !important; margin-right: 0px !important; padding: 3px 5px !important; } ' +
		'#tabnav a:link:hover, #tabnav a:visited:hover { color: #000 !important; } ' +
		'.menu li { border-top: none !important; padding: 0px !important; } ' +
		'#editmenu { left: 87px !important; } ' +
		'#editmenu a, #editmenu a:link, #editmenu a:visited,' +
		'#datamenu a, #datamenu a:link, #datamenu a:visited,' +
		'#communitymenu a, #communitymenu a:link, #communitymenu a:visited,' +
		'#helpmenu a, #helpmenu a:link, #helpmenu a:visited { color: #333 !important; float: left !important; font-weight: bold !important; margin-right: 0px !important; padding: 3px 5px !important; } ' +
		'#editmenu a:link:hover, #editmenu a:visited:hover,' +
		'#datamenu a:link:hover, #datamenu a:visited:hover,' +
		'#communitymenu a:link:hover, #communitymenu a:visited:hover,' +
		'#helpmenu a:link:hover, #helpmenu a:visited:hover { color: #000 !important; } ' +
		'.wrapper { margin: 30px 0 0 !important; } ' +
		'#content { left: 0px !important; } ' +
		'#changeset_list_map_wrapper.scrolled { top: 20px !important; } ' +
		'#changeset_list_map_wrapper.scrolled #changeset_list_map { margin-left: 0px !important; } ' +
		'.sidebar_heading { z-index: inherit !important; } ' +
		'.diary_post { max-width: 100% !important; } ' +
		'#diary_entry_title { width: 50% !important; } ' +
		'#message_title { width: 50% !important; }'
	 );
}

function loadPrintCSS() {
	addGlobalStyle('print', '#searchbox { display: none !important; }');
}

function findMenus() {
	elmLeft = document.getElementById('left');
	if (!elmLeft) { return; }

	elmLeftMenu = document.getElementById('left_menu');
	if (!elmLeftMenu) { return; }

	elmTabNav = document.getElementById('tabnav');
	if (!elmTabNav) { return; }
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

function findAndFixData() {
	var elmData = elmLeftMenu.children[2].firstElementChild.innerHTML;
	var elmDataMenuContent1 = elmLeftMenu.children[2].children[1];
	var elmDataMenuContent2 = elmLeftMenu.children[2].children[2];
	var elmDataMenuContent3 = elmLeftMenu.children[2].children[3];

	var elmDataAnchor = document.createElement('li');
	elmDataAnchor.innerHTML = '<a id="dataanchor" title="' + elmData + '" href="#">' + elmData + '<span class="menuicon">▼</span></a>';

	elmTabNav.appendChild(elmDataAnchor);

	var elmDataMenu = document.createElement('div');
	elmDataMenu.id = 'datamenu';
	elmDataMenu.className = 'menu';
	elmDataMenu.appendChild(elmDataMenuContent1);
	elmDataMenu.appendChild(elmDataMenuContent2);
	elmDataMenu.appendChild(elmDataMenuContent3);

	var elmEditMenu = document.getElementById('editmenu');
	if (!elmEditMenu) { return; }

	elmEditMenu.parentNode.insertBefore(elmDataMenu, elmEditMenu.nextSibling);

	var elmJavaScript = document.createElement('script');
	elmJavaScript.type = 'text/javascript';
	elmJavaScript.innerHTML = 'createMenu("dataanchor", "datamenu", "left");';

	elmDataMenu.parentNode.insertBefore(elmJavaScript, elmDataMenu.nextSibling);
}

function findAndFixCommunity() {
	var elmCommunity = elmLeftMenu.children[1].firstElementChild.innerHTML;
	var elmCommunityMenuContent = elmLeftMenu.children[1].lastElementChild;

	var elmCommunityAnchor = document.createElement('li');
	elmCommunityAnchor.innerHTML = '<a id="communityanchor" title="' + elmCommunity + '" href="#">' + elmCommunity + '<span class="menuicon">▼</span></a>';

	elmTabNav.appendChild(elmCommunityAnchor);

	var elmCommunityMenu = document.createElement('div');
	elmCommunityMenu.id = 'communitymenu';
	elmCommunityMenu.className = 'menu';
	elmCommunityMenu.appendChild(elmCommunityMenuContent);

	var elmEditMenu = document.getElementById('editmenu');
	if (!elmEditMenu) { return; }

	elmEditMenu.parentNode.insertBefore(elmCommunityMenu, elmEditMenu.nextSibling);

	var elmJavaScript = document.createElement('script');
	elmJavaScript.type = 'text/javascript';
	elmJavaScript.innerHTML = 'createMenu("communityanchor", "communitymenu", "left");';

	elmCommunityMenu.parentNode.insertBefore(elmJavaScript, elmCommunityMenu.nextSibling);
}

function findAndFixHelp() {
	var elmHelp = elmLeftMenu.children[0].firstElementChild.innerHTML;
	var elmHelpMenuContent = elmLeftMenu.children[0].lastElementChild;

	var elmHelpAnchor = document.createElement('li');
	elmHelpAnchor.innerHTML = '<a id="helpanchor" title="' + elmHelp + '" href="#">' + elmHelp + '<span class="menuicon">▼</span></a>';

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
	if (elmSearchBox && (getComputedStyle(elmLeft, '').display != 'none') && (elmSearchBox.firstElementChild.nodeName != 'H4')) { elmLeft.parentNode.replaceChild(elmSearchBox, elmLeft); }
	else { elmLeft.parentNode.removeChild(elmLeft); }
}
