/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

buildFireWorks(){
	
	let container='<div class="pyro"><div class="before"></div><div class="after"></div></div>'
	$("body").append(container)
}