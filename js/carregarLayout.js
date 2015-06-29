$(document).ready(function(){
	if ($('#navBar').is(':empty')) {
		$("#navBar").load("navBar.html");
	}
	if ($('#divMenuLateral').is(':empty')) {
		$("#divMenuLateral").load("menuLateralSidebar.html");
	}
});