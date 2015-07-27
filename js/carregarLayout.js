//var urlWebService = "http://52.27.68.85:8080/cashpack";
var urlWebService = "http://localhost:8080/cashpack";
var tipoGestor = "Alex";
var cor = "#ac9231";


$(document).ready(function(){
	if ($('#navBar').is(':empty')) {
		$("#navBar").load("../navBar.html");
	}
	if ($('#divMenuLateral').is(':empty')) {
		$("#divMenuLateral").load("/menuLateralSidebar.html");
	}
//	var urlAtual = window.location.href.toString();
/*	if ($.cookie('username') == undefined || $.cookie('username') == null) {
		if(urlAtual != 'http://localhost/index.html'){
			var novaURL = "/index.html";
      		$(window.document.location).attr('href',novaURL);
		}
	} */

	if ($.cookie('tipoUsuario') == "br.com.cashpack.model.Gestor") {
        
		var nivelGestor = $.cookie('nivelGestor');
            if(nivelGestor == 'BRONZE'){
                $("#bodyPage").css("background-color", '#CD7F32');
            }
            if(nivelGestor == 'PRATA'){
                $("#bodyPage").css("background-color", '#c0c0c0');
            }
            if(nivelGestor == 'OURO'){
                $("#bodyPage").css("background-color", '#ffd700');
            }
            if(nivelGestor == 'ESMERALDA'){
                $("#bodyPage").css("background-color", '#50c878');
            }
            if(nivelGestor == 'RUBY'){
                $("#bodyPage").css("background-color", '#9b111e');
            }
            if(nivelGestor == 'DIAMANTE'){
                $("#bodyPage").css("background-color", '#34526f');
            }
    }
});
    
