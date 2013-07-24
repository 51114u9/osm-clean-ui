// ==UserScript==
// @name		OpenStreetMap Clean UI
// @namespace	http://userscripts.org/users/510421
// @description	Remove unnecessary elements and modernize UI on OpenStreetMap

// @include		http://www.openstreetmap.org/*
// @exclude		http://www.openstreetmap.org/diary*
// @exclude		http://www.openstreetmap.org/traces*
// @exclude		http://www.openstreetmap.org/edit*
// @exclude		http://www.openstreetmap.org/history*
// @exclude		http://www.openstreetmap.org/browse*
// @exclude		http://www.openstreetmap.org/user*

// @include		http://openstreetmap.org/*
// @exclude		http://openstreetmap.org/diary*
// @exclude		http://openstreetmap.org/traces*
// @exclude		http://openstreetmap.org/edit*
// @exclude		http://openstreetmap.org/history*
// @exclude		http://openstreetmap.org/browse*
// @exclude		http://openstreetmap.org/user*

// @license		BSD License; http://www.opensource.org/licenses/bsd-license.php
// @version		0.1.1

// ==/UserScript==

// Declare globals
var left;
var search;

// Load prerequisites
loadGlobalCSS();

// Execute
findSearch();
fixSearch();
replaceLeft();

// ********************************************************

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function loadGlobalCSS() {
	addGlobalStyle('#search { background: rgba(255,255,255,.8); position: absolute; bottom: 50px; left: 50px !important; width: auto; height: auto; margin: 0px !important; padding: 10px !important; border-radius: 4px; -webkit-border-radius: 4px; box-shadow: 0 1px 7px 0px rgba(0,0,0,0.8); -webkit-box-shadow: 0 1px 7px 0px rgba(0,0,0,0.8); z-index:9999; }');
	addGlobalStyle('#search_form { width: 200px !important; }');
	addGlobalStyle('#search_field input[type="submit"] { width: 20px !important; height: 20px !important; }');
	addGlobalStyle('#search_field input[type="text"] { background: rgba(238,238,236,.8); border: 0 !important; border-radius: 4px; -webkit-border-radius: 4px; }');
	addGlobalStyle('#search_field input[type="text"]:focus { outline: 0; box-shadow: 0 0 2px rgba(0,0,0,.8) inset; }');
	addGlobalStyle('#query { width: 200px !important; height: 30px !important; }');
	addGlobalStyle('#top-bar { background: rgba(255,255,255,.8); margin-left: 0px !important; }');
	addGlobalStyle('.wrapper { margin-left: 0px !important; }');
	addGlobalStyle('#content { left: 0px !important; }');
}

function findSearch() {
	left = document.getElementById('left');

	for(i = 0; i < left.childNodes.length; i++) {
		if(left.childNodes[i].className == 'optionalbox') {
			search = left.childNodes[i];
			break;
		}
	}
}

function fixSearch() {
	search.setAttribute('id','search');
	search.removeChild(search.lastElementChild);
}

function replaceLeft() {
	left.parentNode.replaceChild(search, left);
}
