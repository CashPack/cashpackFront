$(document).ready(function(){
    verificarClassTela();
    configurarFormAtivacaoPIM(1);
    configurarAlertaDeRespostas(1, "");
    aplicarMask();   
});

function aplicarMask(){
    $("#inputNumeroDocumentoCnpj").focus(function () { 
        $(this).mask("99.999.999/9999-99"); 
    }); 

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

    $("#txtEndereco").focus(function () { 
        $(this).mask("99.999-999"); 
    });
}

function enviarCadastroGestor(inputNumeroDocumentoCnpj, inputRazaoSocial, inputNomeFantasia, inputNumeroCelular, inputEmail, txtEndereco){
    //alert("enviarCadastroGestor");
    if (validarAtributosObrigatorios() == false) {
        return false;
    }
    else{
        var numeroDocumentoCnpj = inputNumeroDocumentoCnpj.value;
        var cnpjReplace = numeroDocumentoCnpj.replace("/","").replace("-","").replace(".","").replace(".","").replace(".","");
        var razaoSocial = inputRazaoSocial.value;
        var nomeFantasia = inputNomeFantasia.value;
        var numeroCelular = inputNumeroCelular.value;
        var email = inputEmail.value;
        var endereco = txtEndereco.value;
    
        var bookData = {
            "cnpj":cnpjReplace,
            "razaoSocial":razaoSocial,
            "nomeFantasia":nomeFantasia,
            "email":email, 
            "aceitouOsTermosDeContrato" : true,
            
            "endereco":{
                "logradouro":endereco
            },
            "telefone":{
                "codPais":"55",
                "numero":numeroCelular
            }
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/cashpack/gestor/cadastrarGestor",
            data: JSON.stringify(bookData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,
            success: function (data, xhr) {
                //alert("RETORNO: success " + data.ERROR + "   COD: "+ xhr.status);
                configurarAlertaDeRespostas(data.status, data.ERROR);
            },
            error: function (data, xhr) {
                var erro = xhr.responseText;
                //alert("RETORNO: error COD: "+ xhr.status + " MSG :" + erro+ "[]: "+data.ERROR);
                configurarAlertaDeRespostas(xhr.status, "Pré-cadastro realizado com sucesso!");
                desabilitarCamposDeCadastro();
                configurarFormAtivacaoPIM(2);
            }
        });
        return false;
    }
}

function validarPIM(inputNumeroDocumentoCnpj, inputRazaoSocial, inputNomeFantasia, inputNumeroCelular, inputEmail, txtEndereco, inputPIN){
    
    var nomeFantasia = inputNomeFantasia.value;
    var email = inputEmail.value;
    var numeroCelular = inputNumeroCelular.value;
    //alert("DIGITOS:"+numeroDocumentoReplace+"-");
    var tipoDeDocumento;
    if ($("#inputNumeroDocumentoCpf").is(":visible")) {
        var numeroDocumento = inputNumeroDocumentoCpf.value;
        var numeroDocumentoReplace = numeroDocumento.replace("/","").replace("-","").replace(".","").replace(".","").replace(".","");
        if (numeroDocumentoReplace.length == 11) {
            tipoDeDocumento = "CPF";
            var razaoSocial = inputNome.value;
        }
    }
    if ($("#inputNumeroDocumentoCnpj").is(":visible")) {
        var numeroDocumento = inputNumeroDocumentoCnpj.value;
        var numeroDocumentoReplace = numeroDocumento.replace("/","").replace("-","").replace(".","").replace(".","").replace(".","");
        if (numeroDocumentoReplace.length == 14){
            tipoDeDocumento = "CNPJ";
            var razaoSocial = inputRazaoSocial.value;
        }
    }

    var idRamoDeAtividade = $('#selectRamo option:selected').attr("id");
    var ramoDeAtividade = $('#selectRamo option:selected').text();
    var versionRamoDeAtividade = $('#selectRamo option:selected').attr("version");
    var numeroUsuarioRecebido = inputNumeroCelular.value;
    var numeroPimRecebido = inputPIN.value;

    //alert("codigoDoPais: "+ codigoDoPaisRecebido + "   codigoDeArea: "+ codigoDeAreaRecebido +"   numeroUsuarioRecebido: "+ numeroUsuarioRecebido
    //  + "PIM: "+numeroPimRecebido);

     var bookData = {  
        "nomeFantasia":nomeFantasia,
        "razaoSocial":razaoSocial,
        "email":email,
        "numeroDocumento":numeroDocumentoReplace,
        "tipoDeDocumentoAgenciaEnum":tipoDeDocumento,
            "ramoDeAtividade":{  
                "nome":ramoDeAtividade,
                "id":idRamoDeAtividade,
                "version":versionRamoDeAtividade
            },
            "telefone":{  
                "codPais":"55",
                "numero":numeroCelular,
            },
            "codigoPin":{  
                "codigo":numeroPimRecebido
            }
        };
                     $.ajax({
                         type: "POST",
                         url: "http://localhost:8080/cashpack/agencia/confirmarPinAgencia",
                         data: JSON.stringify(bookData),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         processData: true,
                         success: function (data, status, jqXHR) {
                           // alert("success... " + data.ERROR);
                            configurarAlertaDeRespostas(data.status, data.ERROR);
                         },
                         error: function (xhr) {
                            var erro = xhr.responseText;
                            //alert("COD: "+ xhr.status + "   TIPO ERRO: " + xhr.statusText + "    MSG :" + erro);
                            configurarAlertaDeRespostas(xhr.status,  "Agência cadastrada com suscesso!");
                            resetarTelaAgencia();
                         }
                     });
}

function verificarClassTela(){
	if ($('#divMenuLateral').is(':empty')) {
		$("#divContentPrincipalCrud").css("marginLeft", "250px");
		//$("#divContentPrincipalCrud").css("marginTop", "55px");
		$("#divContentPrincipalCrud").addClass("container");
        $("#divMenuLateral").css("marginTop", "50px");
	}	
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
    //alert($("#alertaDeRespostas").hasClass("alert alert-warning"));
    if (data == 0) {
        $("#alertaDeRespostas").addClass("alert alert-danger");
        $("#alertaDeRespostas").text("Ops! Não foi possível se comunicar com o servidor.");
        redirecionarParaTopo();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        
    }
    else if (data == 201) {
        desabilitarCamposDeCadastro();
        redirecionarParaTopo();
        if ($("#alertaDeRespostas").hasClass("alert alert-warning")) {
            //alert("IF - LARANJA");
            $("#alertaDeRespostas").removeClass("alert alert-warning");
            $("#alertaDeRespostas").addClass("alert alert-success"); 
        }
        if ($("#alertaDeRespostas").hasClass("alert-danger alert")) {
            //alert("IF - VERMELHO");
            $("#alertaDeRespostas").removeClass("alert-danger alert");
            $("#alertaDeRespostas").addClass("alert alert-success");

        }
        //alert("NADA");
        $("#alertaDeRespostas").text(text);
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000); 
        configurarFormAtivacaoPIM(2);
    }
    else if (data == 1) {
        $("#alertaDeRespostas").hide();
    }
    else{
       // alert("FOI PRO ELSE");
        redirecionarParaTopo();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        $("#alertaDeRespostas").removeClass("alert alert-success");
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text(text);
    }    
}

function desabilitarCamposDeCadastro(){
    $("#inputNumeroDocumentoCnpj").attr("disabled", true);
    $("#inputRazaoSocial").attr("disabled", true);
    $("#inputNomeFantasia").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
    $("#inputEmail").attr("disabled", true);
    $("#txtEndereco").attr("disabled", true);
    $("#termosCheckBox").attr("disabled", true);
}

function resetarTelaAgencia(){
    $("#inputRazaoSocial").attr("disabled", false);
    $("#tipoDeAgencia").attr("disabled", false);
    $("#inputNomeFantasia").attr("disabled", false);
    $("#inputEmail").attr("disabled", false);
    $("#selectRamo").attr("disabled", false);
    $("#inputCodigoDoPais").attr("disabled", false);
    $("#inputCodigoDeArea").attr("disabled", false);
    $("#inputNumeroCelular").attr("disabled", false);
    $("#inputNumeroDocumentoCnpj").attr("disabled", false);
    $("#inputNumeroDocumentoCpf").attr("disabled", false);
    $("#inputRazaoSocial").val("");
    $("#inputEmail").val("");
    $("#inputNomeFantasia").val("");
    $("#inputNumeroDocumento").val("");
    $("#tipoDeAgencia").prop("selectIndex",0);
    $("#selectRamo").prop("selectIndex",0);
    $("#inputNumeroCelular").val("");   
    configurarFormAtivacaoPIM(1);
}

function validarAtributosObrigatorios(){
    //alert("validarAtributosObrigatorios");
    var retorno = "";
    retorno += validarCnpj("inputNumeroDocumentoCnpj");
    retorno += validarRazaoSocial("inputRazaoSocial");
    retorno += validarNomeFantasia("inputNomeFantasia");
    retorno += validarNumeroCelular("inputNumeroCelular");
    retorno += validarEmail("inputEmail");
    retorno += validarEndereco("txtEndereco");
    retorno += validarTermosDeContrato("#termosCheckBox");
    //alert(retorno);
    if (retorno != "") {
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text(retorno);
        redirecionarParaTopo();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return false;
    }else{
        return true;
    }
}

function validarCnpj(id){
    var retorno = "";
    var cnpjInput = document.getElementById(id).value;
    retorno = validarCampo(cnpjInput, "O Cnpj", id);
    return retorno;
}

function validarRazaoSocial(id){
    var retorno = "";
    var razaoSocialInput = document.getElementById(id).value;
    retorno = validarCampo(razaoSocialInput, "A Razão Social", id);
    return retorno;
}

function validarNomeFantasia(id){
    var retorno = "";
    var nomeFantasiaInput = document.getElementById(id).value;
    retorno = validarCampo(nomeFantasiaInput, "O Nome Fantasia", id);
    return retorno;
}

function validarNumeroCelular(id){
    var retorno = "";
    var numeroCelularInput = document.getElementById(id).value;
    retorno = validarCampo(numeroCelularInput, "O número do celular", id);
    return retorno;
}

function validarEmail(id){
    var retorno = "";
    var emailInput = document.getElementById(id).value;
    retorno = validarCampo(emailInput, "O email", id);
    return retorno;
}

function validarEndereco(id){
    var retorno = "";
    var enderecoInput = document.getElementById(id).value;
    retorno = validarCampo(enderecoInput, "O endereço", id);
    return retorno;
}

function validarTermosDeContrato(id){
    var retorno = "";
        if(!$(id).is(":checked")){
            retorno = "Por favor, leia e aceite os termos de contrato.";
            //$(id).focus();
            return retorno;
        }else{
            return retorno;
        }    
}

function validarCampo(codigo, texto, id){
    var retorno = "";
    if (codigo == "") {
        retorno = texto+" é um campo obrigatório. ";
        return retorno;
    }else{
        return retorno;
    }
}

function redirecionarParaTopo(){
    window.location.hash = '#crudGestor';
    window.history.replaceState('Object', 'Gestor', "/pages/gestor.html");
}