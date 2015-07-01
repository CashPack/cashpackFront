$(document).ready(function(){
    //get a reference to the select element
    $select = $('#selectRamo');
//request the JSON data and parse into the select element
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
        $select.html('<option id="-1">none available</option>');
    }
    });

	verificarClassTela();
	configurarFormAtivacaoPIM(1);
	configurarAlertaDeRespostas(1, "");
});
function enviarCadastroAgencia(inputRazaoSocial, inputNomeFantasia, inputCNPJ, selectRamo, inputCodigoDoPais, inputCodigoDeArea, inputNumeroCelular){
    //alert();
    var razaoSocial = inputRazaoSocial.value;
    var nomeFantasia = inputNomeFantasia.value;
    var numeroCnpj = inputCNPJ.value;
    var idRamoDeAtividade = $('#selectRamo option:selected').attr("id");
    var ramoDeAtividade = $('#selectRamo option:selected').text();
    var versionRamoDeAtividade = $('#selectRamo option:selected').attr("version");
    var codigoDoPaisRecebido = inputCodigoDoPais.value;
    var codigoDeAreaRecebido = inputCodigoDeArea.value;
    var numeroUsuarioRecebido = inputNumeroCelular.value;
    

    var bookData = {  
                        "razaoSocial": razaoSocial,
                        "nomeFantasia": nomeFantasia,
                        "cnpj": numeroCnpj,
                        "ramoDeAtividade":{"nome":ramoDeAtividade,"id":idRamoDeAtividade,"version":versionRamoDeAtividade},
                        "telefone":{"codPais":codigoDoPaisRecebido,"codArea":codigoDeAreaRecebido,"numero":numeroUsuarioRecebido}
                    };
                     $.ajax({
                         type: "POST",
                         url: "http://localhost:8080/cashpack/agencia/cadastrarAgencia",
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
    //  + "PIM: "+numeroPimRecebido);

    var bookData = {            "telefone": {"codPais":codigoDoPaisRecebido,"codArea":codigoDeAreaRecebido,"numero":numeroUsuarioRecebido},

                                "codigoPin":{"codigo":numeroPimRecebido}
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
        
        $("#alertaDeRespostas").removeClass("alert alert-success");
        $("#alertaDeRespostas").addClass("alert alert-danger");
        $("#alertaDeRespostas").text("Não foi possível se comunicar com o servidor.");
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
    $("#inputRazaoSocial").attr("disabled", true);
    $("#inputNomeFantasia").attr("disabled", true);
    $("#inputCNPJ").attr("disabled", true);
    $("#selectRamo").attr("disabled", true);
    $("#inputCodigoDoPais").attr("disabled", true);
    $("#inputCodigoDeArea").attr("disabled", true);
    $("#inputNumeroCelular").attr("disabled", true);
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