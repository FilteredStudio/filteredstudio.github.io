// an error page handler for errorpage
// input a ?code=XXX to correctly get string replacements, undefined replacements will appear as code and nothing else

const DEFAULT_ERROR_CODE = 420 // the error code to defaultly import if no ECODE was set
const errorCodes = {
	404:{
		"title":"404 (Page Not Found)",
		"body":"The resource may have been moved, renamed or deleted."
	},

	420:{
		"title":"420 (?code Param Missing)",
		"body": "(haha funny number) This is an error because the code parameter was not specified. If you're seeing this without manually causing it to appear, report it. It's a bug."
	}
}

const urlParams = new URLSearchParams(window.location.search);
var inputtedECODE = urlParams.get("code") || DEFAULT_ERROR_CODE

var JSONSource = errorCodes[inputtedECODE] || {
	"title":`${inputtedECODE} (Unknown Error)`,
	"body":"We dont handle this error right now, but something probably went wrong."
}

window.onload = function(){
	var TITLE = document.getElementsByClassName("ptitle1")[0]
	var BODY = document.getElementsByClassName("paragraph")[0]

	TITLE.innerHTML = JSONSource.title
	BODY.innerHTML = JSONSource.body
}

console.log(inputtedECODE, urlParams.get("code"))