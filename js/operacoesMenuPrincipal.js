
function carregarCrudUsuario(){
	//alert("OK  - USUARIO");
	//window.history.pushState('Object', 'Usuário', "pages");
	var valorCrud = "divContentPrincipalCrud";
	//alert(valorCrud);
	if (document.getElementById(valorCrud) != null) {
		document.getElementById(valorCrud).id = "divContentPrincipal";
	}
	
	if ($('#divMenuLateral').is(':empty')) {
		$("#divMenuLateral").load("menuLateralSidebar.html");
	}
	if (!$('#divContentPrincipal').is(':empty')) {
		//alert("DIV PRINCIPAL NOT VAZIA - USUARIO");
		if (document.getElementById("crudUsuario") == null) {
			//alert("VAI CARREGAR USUARIO");
			$("#divContentPrincipal").load("/pages/usuario.html");
		}
	}else{
		$("#divContentPrincipal").load("/pages/usuario.html");
	}

}
   	
function carregarCrudAgencia(){
	//alert("OK  - AGENCIA");
	var valorCrud = "divContentPrincipalCrud";
	//alert(valorCrud);
	if (document.getElementById(valorCrud) != null) {
		document.getElementById(valorCrud).id = "divContentPrincipal";
	}

	if ($('#divMenuLateral').is(':empty')) {
		$("#divMenuLateral").load("menuLateralSidebar.html");
	}
	if (!$('#divContentPrincipal').is(':empty')) {
		//alert("DIV PRINCIPAL NOT VAZIA - AGENCIA");
		if (document.getElementById("crudAgencia") == null) {
			//alert("VAI CARREGAR AGENCIA");
			$("#divContentPrincipal").load("/pages/agencia.html");
		}
	}else{
		$("#divContentPrincipal").load("/pages/agencia.html");
	}
 }