$(function(){
  var nomeGestor = $.cookie('usuario');
  //alert("cookie: " + $.cookie('username'));
  if ($.cookie('usuario') != null){
    
    if ($.cookie('tipoUsuario') == "br.com.cashpack.model.Gestor") {
      //alert("TEM COOKIE");
      $("#menuItemCadastroGestor").hide();
      $("#menuItemPesquisarGestor").hide();
      $("#menuItemPerfilAgencia").hide();
    }
    if ($.cookie('tipoUsuario') == "br.com.cashpack.model.Agencia") {
      $("#menuGestor").hide();
      $("#menuItemCadastroAgencia").hide();
      $("#menuItemPesquisarAgencia").hide();
    }
    if ($.cookie('tipoUsuario') == "br.com.cashpack.model.AdministradorDoSistema") {
    	$("#menuItemPerfilGestor").hide();
    	$("#menuItemPerfilAgencia").hide();
    }
  }else{
    alert("SEM COOKIE");
  }

  $('#logoutbtn').on('click', function(e){
    if($.removeCookie('usuario')) {
    	var cookies = $.cookie();
		for(var cookie in cookies) {
			$.removeCookie('usuario', { path: '/' });
   			$.removeCookie(cookie);
		}
      	var novaURL = "/index.html";
      	$(window.document.location).attr('href',novaURL);
    }
  });
});


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