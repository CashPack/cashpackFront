$(document).ready(function(){
    verificarClassTela();
    configurarFormAtivacaoPIM(1);
    configurarAlertaDeRespostas(1, "");
    aplicarMask();
    carregarRamoDeAtividade();
    carregarGestores();

    $("#labelCpf").hide();
    $("#inputNumeroDocumentoCpf").hide();
    $("#labelNome").hide();
    $("#inputNome").hide();
});

function carregarGestores(){
    $select = $('#selectGestor');
    $.ajax({
        url: urlWebService+'/gestor',
        dataType:'JSON',
        success:function(data){
            $select.html('');
            $.each(data, function(key, val){
            $select.append('<option id="' + val.id + '">' + val.razaoSocial + '</option>');
        })},
        error:function(){
            $select.html('<option id="-1">Nenhum registro encontrado!</option>');
        }
    });
}

function carregarRamoDeAtividade(){
    $select2 = $('#selectRamo');
    $.ajax({
        url: urlWebService+'/ramoDeAtividade',
        dataType:'JSON',
        success:function(data){
            //clear the current content of the select
            $select2.html('');
            //iterate over the data and append a select option
            $.each(data, function(key, val){
            $select2.append('<option id="' + val.id + '">' + val.nome + '</option>');
        })},
        error:function(){
            //if there is an error append a 'none available' option
            $select2.html('<option id="-1">Nenhum registro encontrado!</option>');
        }
    });
}

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

function verificarTipo(){
    //alert("ok");
    if ($('#tipoDeAgencia option:selected').text() == "Pessoa Física") {
        $("#labelCnpj").hide();
        $("#inputNumeroDocumentoCnpj").hide();
        $("#labelRazaoSocial").hide();
        $("#inputRazaoSocial").hide();
        $("#labelCpf").show();
        $("#inputNumeroDocumentoCpf").show();
        $("#inputCpf").show();
        $("#labelNome").show();
        $("#inputNome").show();
        $("#inputNumeroDocumentoCpf").focus(function () { 
            
            $(this).mask("999.999.999-99"); 
        }); 
    }if ($('#tipoDeAgencia option:selected').text() == "Pessoa Jurídica") {
        
        $("#labelNome").hide();
        $("#inputNome").hide();
        $("#labelCpf").hide();
        $("#inputNumeroDocumentoCpf").hide();
        $("#labelCnpj").show();
        $("#inputNumeroDocumentoCnpj").show();
        $("#inputRazaoSocial").show();
        $("#labelRazaoSocial").show();
        $("#inputNumeroDocumentoCnpj").focus(function () { 
            $(this).mask("99.999.999/9999-99"); 
        }); 
    }
}

function enviarCadastroAgencia(inputNome, inputRazaoSocial, inputNomeFantasia,inputNumeroDocumentoCpf, inputNumeroDocumentoCnpj, selectRamo,inputEmail, inputNumeroCelular, txtEndereco){
    //alert();
    if (validarAtributosObrigatorios() == false) {
        return false;
    }else{
    
    
    var nomeFantasia = inputNomeFantasia.value;
    var email = inputEmail.value;
    
    var numeroCelular = inputNumeroCelular.value;
   // alert("DIGITOS:"+numeroCelular);
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

    var idGestor = $('#selectGestor option:selected').attr("id");
    var numeroUsuarioRecebido = inputNumeroCelular.value;
    var endereco = txtEndereco.value;
    

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
            "gestor":{
                "id":idGestor
            },
            "telefone":{  
                "codPais":"55",
                "numero":numeroCelular
            },
            "endereco":{
                "logradouro":endereco
            }
    };
                     $.ajax({
                         type: "POST",
                         url: urlWebService+"/agencia/cadastrarAgencia",
                         data: JSON.stringify(bookData),
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         processData: true,
                         success: function (data, xhr) {
                            //alert("RETORNO: success " + data.ERROR + "   COD: "+ xhr.status);
                            configurarAlertaDeRespostas(data.status, data.ERROR);
                            
                         },
                         error: function (xhr) {
                            var erro = xhr.responseText;
                            //alert("RETORNO: COD: "+ xhr.status + " MSG :" + erro);
                            configurarFormAtivacaoPIM(2);
                            configurarAlertaDeRespostas(xhr.status, "Pré-cadastro realizado com sucesso!");
                            

                         }
                     });
    return false;
    }
}

function validarPIN(inputNome, inputRazaoSocial, inputNomeFantasia, inputNumeroDocumentoCpf,inputNumeroDocumentoCnpj, selectRamo,inputEmail, inputNumeroCelular,txtEndereco, inputPIN){
    
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
    var endereco = txtEndereco.value;

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
            "gestor":{
                "id":1
            },
            "telefone":{  
                "codPais":"55",
                "numero":numeroCelular,
            },
            "codigoPin":{  
                "codigo":numeroPimRecebido
            },
            "endereco":{
                "logradouro":endereco
            }
        };
                     $.ajax({
                         type: "POST",
                         url: urlWebService+"/agencia/confirmarPinAgencia",
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
        redirecionarParaTopo();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000); 
        configurarFormAtivacaoPIM(2);
    }
    else if (data == 1) {
        $("#alertaDeRespostas").hide();
    }
    else{
       // alert("FOI PRO ELSE");
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        $("#alertaDeRespostas").removeClass("alert alert-success");
        $("#alertaDeRespostas").addClass("alert alert-warning");
        redirecionarParaTopo();
        $("#alertaDeRespostas").text(text);
    }   
}

function desabilitarCamposDeCadastro(){
    $("#inputNumeroDocumentoCnpj").attr("disabled", true);
    $("#inputNumeroDocumentoCpf").attr("disabled", true);
    $("#tipoDeAgencia").attr("disabled", true);
    $("#inputRazaoSocial").attr("disabled", true);
    $("#inputNomeFantasia").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
    $("#selectRamo").attr("disabled", true);
    $("#selectGestor").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
    $("#inputEmail").attr("disabled", true);
    $("#txtEndereco").attr("disabled", true);
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
    if ($("#inputRazaoSocial").is(":visible")) {
        retorno += validarElemento("inputRazaoSocial", "A Razão Social");
    }
    if ($("#inputNome").is(":visible")) {
        retorno += validarElemento("inputNome", "O Nome");
    }
    if ($("#inputNumeroDocumentoCnpj").is(":visible")) {
        retorno += validarElemento("inputNumeroDocumentoCnpj", "O Cnpj");
    }
    if ($("#inputNumeroDocumentoCpf").is(":visible")) {
        retorno += validarElemento("inputNumeroDocumentoCpf", "O Cpf");
    }
    retorno += validarElemento("inputNomeFantasia", "O Nome Fantasia");
    retorno += validarElemento("inputEmail", "O Email");
    retorno += validarElemento("inputNumeroCelular", "O número do celular");
    retorno += validarElemento("txtEndereco", "O endereço");
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

function validarElemento(id, texto){
    var retorno = "";
    var elemento = document.getElementById(id).value;
    retorno = validarCampo(elemento, texto, id);
    return retorno;
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
    window.location.hash = '#crudAgencia';
    window.history.replaceState('Object', 'Agência', "/pages/agencia/agencia.html");
}
