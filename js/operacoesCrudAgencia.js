$(document).ready(function(){
    $("#labelCpf").hide();
    $("#inputCpf").hide();
    $("#inputNome").hide();
    $("#labelNome").hide();
    
    //get a reference to the select element
    $select = $('#selectRamo');
    $.ajax({
        url: 'http://localhost:8080/cashpack/ramoDeAtividade',
        dataType:'JSON',
        success:function(data){
        //clear the current content of the select
        $select.html('');
        //iterate over the data and append a select option
        $.each(data, function(key, val){
        $select.append('<option id="' + val.id + '">' + val.nome + '</option>');
        })},
    error:function(){
        //if there is an error append a 'none available' option
        $select.html('<option id="-1">Nenhum registro encontrado!</option>');
    }
    });
    $("#inputCNPJ").focus(function () { 
        $(this).mask("99.999.999/9999-99"); 
    }); 
    $("#inputCpf").focus(function () { 
        $(this).mask("999.999.999-99"); 
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

	verificarClassTela();
	configurarFormAtivacaoPIM(1);
	configurarAlertaDeRespostas(1, "");
});

function verificarTipo(){
    //alert("ok");
    if ($('#tipoDeAgencia option:selected').text() == "Pessoa Física") {
        $("#labelCnpj").hide();
        $("#inputCNPJ").hide();
        $("#inputRazaoSocial").hide();
        $("#labelRazaoSocial").hide();
        $("#labelCpf").show();
        $("#inputCpf").show();
        $("#inputNome").show();
        $("#labelNome").show();
    }if ($('#tipoDeAgencia option:selected').text() == "Pessoa Jurídica") {
        $("#inputNome").hide();
        $("#labelNome").hide();
        $("#labelCpf").hide();
        $("#inputCpf").hide();
        $("#labelCnpj").show();
        $("#inputCNPJ").show();
        $("#inputRazaoSocial").show();
        $("#labelRazaoSocial").show();

    }
}
function enviarCadastroAgencia(inputRazaoSocial, inputNomeFantasia, inputCNPJ, selectRamo,inputEmail, inputNumeroCelular){
    //alert();
    if (validarAtributosObrigatorios() == false) {
        return false;
    }else{
    
    var razaoSocial = inputRazaoSocial.value;
    var nomeFantasia = inputNomeFantasia.value;
    var email = inputEmail.value;
    var numeroCnpj = inputCNPJ.value;
    var idRamoDeAtividade = $('#selectRamo option:selected').attr("id");
    var ramoDeAtividade = $('#selectRamo option:selected').text();
    var versionRamoDeAtividade = $('#selectRamo option:selected').attr("version");
    var numeroUsuarioRecebido = inputNumeroCelular.value;
    

    var bookData = {  
            "nomeFantasia":"nomva dfanasda",
            "razaoSocial":"NOMEasdasd",
            "numeroDocumento":"12312312312312",
            "tipoDeDocumentoAgenciaEnum":"CNPJ",
            "statusAgencia":"ATIVADO",
            "email":"EMAIL@EMAIL",
            "ramoDeAtividade":{  
                "nome":"LANCHE",
                "id":1
            },
            "telefone":{  
                "codPais":"55",
                "numero":"(83) 98833 - 4154"
            }
};


                     $.ajax({
                         type: "POST",
                         url: "http://localhost:8080/cashpack/agencia/cadastrarAgencia",
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
                            //alert("RETORNO: error COD: "+ xhr.status + " MSG :" + erro);
                            configurarAlertaDeRespostas(xhr.status, xhr.status);
                            

                         }
                     });
    return false;
    }
}

function validarPIM(inputNumeroCelular, inputPIN){
    
    var numeroUsuarioRecebido = inputNumeroCelular.value;
    var numeroPimRecebido = inputPIN.value;

    //alert("codigoDoPais: "+ codigoDoPaisRecebido + "   codigoDeArea: "+ codigoDeAreaRecebido +"   numeroUsuarioRecebido: "+ numeroUsuarioRecebido
    //  + "PIM: "+numeroPimRecebido);

    var bookData = {  
            "nomeFantasia":"nomva dfanasda",
            "razaoSocial":"NOMEasdasd",
            "numeroDocumento":"12312312312312",
            "tipoDeDocumentoAgenciaEnum":"CNPJ",
            "statusAgencia":"ATIVADO",
            "email":"EMAIL@EMAIL",
            "ramoDeAtividade":{  
                "nome":"LANCHE",
                "id":1
            },
            "telefone":{  
                "codPais":"55",
                "numero":"(83) 98833 - 4154"
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
                            configurarAlertaDeRespostas(xhr.status, xhr.status);
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
        $("#alertaDeRespostas").text("Operação realizada com sucesso!");
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
        $("#alertaDeRespostas").text(text);
    }
    
}

function desabilitarCamposDeCadastro(){
    $("#tipoDeAgencia").attr("disabled", true);
    $("#inputRazaoSocial").attr("disabled", true);
    $("#inputNomeFantasia").attr("disabled", true);
    $("#inputCNPJ").attr("disabled", true);
    $("#selectRamo").attr("disabled", true);
    $("#inputCodigoDoPais").attr("disabled", true);
    $("#inputCodigoDeArea").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
    $("#inputEmail").attr("disabled", true);
}

function resetarTelaAgencia(){
    $("#inputRazaoSocial").attr("disabled", false);
    $("#inputNomeFantasia").attr("disabled", false);
    $("#inputCNPJ").attr("disabled", false);
    $("#selectRamo").attr("disabled", false);
    $("#inputCodigoDoPais").attr("disabled", false);
    $("#inputCodigoDeArea").attr("disabled", false);
    $("#inputNumeroCelular").attr("disabled", false);
    $("#inputRazaoSocial").val("");
    $("#inputNomeFantasia").val("");
    $("#inputCNPJ").val("");
    $("#selectRamo").prop("selectIndex",0);
    $("#inputCodigoDoPais").val("");
    $("#inputCodigoDeArea").val("");
    $("#inputNumeroCelular").val("");   
    configurarFormAtivacaoPIM(1);
}

function validarAtributosObrigatorios(){
    //alert("METODO: validarAtributosObrigatorios"+ );
    if ($('#tipoDeAgencia option:selected').text() == "Pessoa Física") {
        var nome = document.getElementById('inputNome').value;
        if (nome == "") {
            $("#alertaDeRespostas").addClass("alert alert-warning");
            $("#alertaDeRespostas").text("O nome é um campo obrigatório.");
            $("#inputNome").focus();
            $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
            return false;
        }
    }
    if ($('#tipoDeAgencia option:selected').text() == "Pessoa Jurídica") {
        var razaoSocialInput = document.getElementById('inputRazaoSocial').value;
        if (razaoSocialInput == "") {
            $("#alertaDeRespostas").addClass("alert alert-warning");
            $("#alertaDeRespostas").text("A Razao Social é um campo obrigatório.");
            $("#inputRazaoSocial").focus();
            $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
            return false;
        }
    }
    
    var nomeFantasiaInput = document.getElementById('inputNomeFantasia').value;
    if (nomeFantasiaInput == "") {
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text("O Nome Fantasia é um campo obrigatório.");
        $("#inputRazaoSocial").focus();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return false;
    }
    var cnpjInput = document.getElementById('inputCNPJ').value;
    if (cnpjInput == "") {
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text("O Cnpj é um campo obrigatório.");
        $("#inputCNPJ").focus();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return false;
    }
    var emailInput = document.getElementById('inputEmail').value;
    if (emailInput == "") {
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text("O email é um campo obrigatório.");
        $("#inputEmail").focus();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return false;
    }
    var celularInput = document.getElementById('inputNumeroCelular').value;
    if (celularInput == "") {
        $("#alertaDeRespostas").addClass("alert alert-warning");
        $("#alertaDeRespostas").text("O celular é um campo obrigatório.");
        $("#inputNumeroCelular").focus();
        $("#alertaDeRespostas").show('fast').delay(3000).fadeOut(1000);
        return false;
    }
    return true;
}