var pagesElem = document.getElementById("pages");
var navSelectorElem = document.getElementById("navbar-selector");
var lastURL = window.location.href;
var currPage = "home";

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
if(searchParams.has("page")){
	changePage(searchParams.get("page"), true);
}
else{
	changePage(currPage, true);
}
navSelectorElem.style.display = "block";

window.onload = function(){
	changePage(currPage, true);
};

setInterval(function(){
	if(lastURL == window.location.href){
		return;
	}
	lastURL = window.location.href;
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if(searchParams.has("page")){
		if(currPage == searchParams.get("page")){
			return;
		}
		changePage(searchParams.get("page"), true);
	}
	else{
		if(currPage == "home"){
			return;
		}
		changePage("home", true);
	}
}, 500);

sendLog();

async function sendLog(){
	try{
		await fetch("https://server.mcleocito.dev/sendlog.txt");
	}
	catch(err){
		console.log(err);
	}
}

function changePage(newPage, noHistory){
	var anyMatched = false;
	var anyChange = false;
	for(var i=0; i<pagesElem.children.length; i++){
		var thisElem = pagesElem.children[i];
		if(thisElem.id == newPage + "-page"){
			thisElem.style.display = "block";
			anyMatched = true;
		}
		else{
			thisElem.style.display = "none";
		}
	}
	if(anyMatched){
		if(newPage != currPage){
			anyChange = true;
		}
		currPage = newPage;
		var navButton = document.getElementById(newPage + "-button");
		if(navButton){
			var buttonRect = navButton.getBoundingClientRect();
			var buttonRect2 = navButton.parentElement.getBoundingClientRect();
			navSelectorElem.style.left = buttonRect.left - buttonRect2.left + navButton.parentElement.scrollLeft - 10;
			navSelectorElem.style.top = buttonRect.top - 7;
			navSelectorElem.style.width = buttonRect.width + 20;
			navSelectorElem.style.display = "block";
		}
		else
			navSelectorElem.style.display = "none";
		var location = window.location;
		if(!anyChange || noHistory){
			window.history.replaceState({}, "Raine.Page", location.protocol + '//' + location.host + location.pathname + "?page=" + newPage);
		}
		else{
			window.history.pushState({}, "Raine.Page", location.protocol + '//' + location.host + location.pathname + "?page=" + newPage);
		}
	}
}

function openLink(url){
	window.open(url, '_blank');
}
