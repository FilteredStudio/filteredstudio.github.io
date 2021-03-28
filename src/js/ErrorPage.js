// an error page handler for errorpage
// input a ?code=XXX to correctly get string replacements, undefined replacements will appear as code and nothing else

const DEFAULT_ERROR_CODE = 420 // the error code to defaultly import if no ECODE was set

//button data
const buttonLayouts = {
	goBackHome: [
		{
			"body":"Go Back",
			"href":"javascript:history.back()"
		},

		{
			"body":"Home",
			"href":"/"
		},
	],

	socialMedia: [
		{
			"body":"Twitter",
			"href":"https://twitter.com/FilteredStudio"
		},

		{
			"body":"DevForum",
			"href":"https://devforum.roblox.com/u/FilteredStudio"
		},

		{
			"body":"GitHub",
			"href":"https://github.com/FilteredStudio"
		}
	],

	none: []
}

const errorCodes = {
	404:{
		"page_title":"Page Not Found",
		"title":"404 (Page Not Found)",
		"body":"The resource may have been moved, renamed or deleted.",
		"buttonKey":"goBackHome"
	},

	420:{
		"page_title":"?code Param Missing",
		"title":"420 (?code Param Missing)",
		"body": "(haha funny number) This is an error because the code parameter was not specified. If you're seeing this without manually causing it to appear, report it. It's a bug.",
		"buttonKey":"goBackHome"
	},

	500:{
		"page_title":"Site Under Maintenance",
		"title":"The site is currently being developed",
		"body":"This site is still being worked on, you can return to my other pages below.\n\nTo access docs pages for various repositories, enter <code>/{repository}</code> into the url.",
		"buttonKey":"socialMedia"
	},

	42069:{
		"page_title":"You tried.",
		"title":"Invalid input for ?code",
		"body":"You tried though, have a gold star :)",
		"buttonKey":"none"
	}
}

//code

const urlParams = new URLSearchParams(window.location.search);
var inputtedECODE = Number(urlParams.get("code") || DEFAULT_ERROR_CODE)


window.onload = function(){
	if (isNaN(inputtedECODE)) {
		window.location.replace("/error?code=42069")
	} else {
		var JSONSource = errorCodes[inputtedECODE] || {
			"page_title":"Unknown Error",
			"title":`${inputtedECODE} (Unknown Error)`,
			"body":"We dont handle this error right now, but something probably went wrong.",
			"buttonKey":"goBackHome"
		}

		var PAGETITLE = document.getElementsByTagName("title")[0]
		var TITLE = document.getElementsByClassName("ptitle1")[0]
		var BODY = document.getElementsByClassName("paragraph")[0]
		var BUTTONPANEL = document.getElementsByClassName("linkpanel")[0]

		var buttons = buttonLayouts[JSONSource.buttonKey]

		PAGETITLE.innerHTML = JSONSource.page_title
		TITLE.innerHTML = JSONSource.title
		BODY.innerHTML = JSONSource.body

		function makeButtons(data, index){
			var newButton = document.createElement("a")
			newButton.classList.add("media")
			newButton.href = data.href
			newButton.innerHTML = data.body

			BUTTONPANEL.appendChild(newButton)

			if (index != buttons.length) {
				BUTTONPANEL.appendChild(document.createTextNode("\n"))
			}
		}

		buttons.forEach(makeButtons)
	}
}
