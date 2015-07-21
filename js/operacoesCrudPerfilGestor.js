var tipoGestor = "Alex";
var cor = "#ac9231";

$(document).ready(function(){
    verificarClassTela();
});
function verificarClassTela(){
	if ($('#divMenuLateral').is(':empty')) {
		$("#divContentPrincipalCrud").css("marginLeft", "250px");
		//$("#divContentPrincipalCrud").css("marginTop", "55px");
		$("#divContentPrincipalCrud").addClass("container");
        $("#divMenuLateral").css("marginTop", "50px");
	}	
}


