var tipoGestor = "Alex";
var cor = "#ac9231";


$(document).ready(function(){
	if ($('#navBar').is(':empty')) {
		$("#navBar").load("../navBar.html");
	}
	if ($('#divMenuLateral').is(':empty')) {
		$("#divMenuLateral").load("/menuLateralSidebar.html");
	}
	var urlAtual = window.location.href.toString();
	if ($.cookie('username') == undefined || $.cookie('username') == null) {
		if(urlAtual != 'http://localhost/index.html'){
			var novaURL = "/index.html";
      		$(window.document.location).attr('href',novaURL);
		}
	}
});
    
