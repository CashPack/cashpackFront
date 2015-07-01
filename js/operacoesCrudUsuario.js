$(document).ready(function(){
    verificarClassTela();
	configurarFormAtivacaoPIM(1);
    configurarAlertaDeRespostas(1, "");

    //$("#inputNumeroCelular").mask("(99)9999-9999");
    $("#inputNumeroCelular").focus(function () { 
        $(this).mask("(99) 9999-9999?9"); 
    }); 
    $("#inputNumeroCelular").focusout(function () {
        var phone, element; element = $(this); element.unmask(); 
        phone = element.val().replace(/\D/g, ''); if (phone.length > 10) { 
            element.mask("(99) 99999-999?9"); 
        } else { 
            element.mask("(99) 9999-9999?9"); 
        } 
        });

});

function enviarCadastroCelular(inputNumeroCelular){
	var numeroUsuarioRecebido = inputNumeroCelular.value;
    //validarAtributosObrigatorios(codigoDoPaisRecebido, codigoDeAreaRecebido, numeroUsuarioRecebido);
	//alert("codigoDoPais: "+ codigoDoPaisRecebido + "   codigoDeArea: "+ codigoDeAreaRecebido +"   numeroUsuarioRecebido: "+ numeroUsuarioRecebido);

	var bookData = {  
                        "codPais":codigoDoPaisRecebido,
                        "codArea":codigoDeAreaRecebido,        
                        "numeroTelefone":numeroUsuarioRecebido
                    };
                     $.ajax({
                         type: "POST",
                         url: "http://localhost:8080/cashpack/usuariocashpacks/cadastrarUsuarioCashPack",
                         data: JSON.stringify(bookData),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         processData: true,
                         success: function (data, xhr) {
                            //alert("success... " + data.ERROR + "   COD: "+ xhr.status);
                            configurarAlertaDeRespostas(data.status, data.ERROR);
                            
                         },
                         error: function (xhr) {
                            var erro = xhr.responseText;
                            //alert("COD: "+ xhr.status + " MSG :" + erro);
                            configurarAlertaDeRespostas(xhr.status, xhr.status);
                            

                         }
                     });
	//alert("Dados Enviados, você receberá um código PIM em seu aparelho.");
    return false;
}

function validarPIM(inputCodigoDoPais, inputCodigoDeArea, inputNumeroCelular, inputPIN){
	var codigoDoPaisRecebido = inputCodigoDoPais.value;
	var codigoDeAreaRecebido = inputCodigoDeArea.value;
	var numeroUsuarioRecebido = inputNumeroCelular.value;
	var numeroPimRecebido = inputPIN.value;

	//alert("codigoDoPais: "+ codigoDoPaisRecebido + "   codigoDeArea: "+ codigoDeAreaRecebido +"   numeroUsuarioRecebido: "+ numeroUsuarioRecebido
	//	+ "PIM: "+numeroPimRecebido);

	var bookData = {  
                        "codPais":codigoDoPaisRecebido,
                        "codArea":codigoDeAreaRecebido,        
                        "numeroTelefone":numeroUsuarioRecebido,
                        "confirmacaoDoPin":numeroPimRecebido
                    };
                     $.ajax({
                         type: "POST",
                         url: "http://localhost:8080/cashpack/usuariocashpacks/confirmarPinUsuarioCashPack",
                         data: JSON.stringify(bookData),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         processData: true,
                         success: function (data, status, jqXHR) {
                         //   alert("success... " + data.ERROR);
                            configurarAlertaDeRespostas(data.status, data.ERROR);
                         },
                         error: function (xhr) {
                            var erro = xhr.responseText;
                         //   alert("COD: "+ xhr.status + "   TIPO ERRO: " + xhr.statusText + "    MSG :" + erro);
                            configurarAlertaDeRespostas(xhr.status, xhr.status);
                            resetarTelaUsuario();
                         }
                     });
}

function configurarFormAtivacaoPIM(data){
	if (data == 1) {
		// alert("TRUE");
		document.getElementById('formAtivacaoPIM').style.visibility = 'hidden';
	}else{
		document.getElementById('formAtivacaoPIM').style.visibility = 'visible';
		return false;
	}
}

function configurarAlertaDeRespostas(data, text){
    //alert("MSG: "+data);
    if (data == 0) {
        //alert("IF - 0");
        $("#alertaDeRespostas").removeClass("alert alert-success");
        $("#alertaDeRespostas").addClass("alert alert-danger");
        $("#alertaDeRespostas").text("Não foi possível se comunicar com o servidor.");
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return;
    }
    if (data == 1) {

        $("#alertaDeRespostas").hide();
    }else{
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        $("#alertaDeRespostas").removeClass("alert alert-success");
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text(text);
    }
    if (data == 201) {
        desabilitarCamposDeCadastro();
        $("#alertaDeRespostas").removeClass("alert alert-warning");
        $("#alertaDeRespostas").addClass("alert alert-success");
        $("#alertaDeRespostas").text("Operação realizada com sucesso!");
        configurarFormAtivacaoPIM(2);
    }
}

function validarAtributosObrigatorios(codigoDoPaisRecebido, codigoDeAreaRecebido, numeroUsuarioRecebido){
}

function verificarClassTela(){

    if ($('#divMenuLateral').is(':empty')) {
        $("#divContentPrincipalCrud").css("marginLeft", "250px");
        //$("#divContentPrincipalCrud").css("marginTop", "40px");
        $("#divContentPrincipalCrud").addClass("container");
        $("#divMenuLateral").css("marginTop", "50px");
    }  
}

function desabilitarCamposDeCadastro(){
    $("#inputCodigoDoPais").attr("disabled", true);
    $("#inputCodigoDeArea").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
}

function resetarTelaUsuario(){
    $("#inputCodigoDoPais").attr("disabled", false);
    $("#inputCodigoDeArea").attr("disabled", false);
    $("#inputNumeroCelular").attr("disabled", false);
    $("#inputCodigoDoPais").val("");
    $("#inputCodigoDeArea").val("");
    $("#inputNumeroCelular").val("");   
    configurarFormAtivacaoPIM(1);
}