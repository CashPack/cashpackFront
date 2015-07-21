<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Examplo: Simples jQuery Stylesheet Switcher</title>
<link rel="stylesheet" type="text/css" href="style1.css" />
<script type="text/javascript" language="javascript" src="jquery.js"></script>
<script type="text/javascript" language="javascript" src="jquery.cookie.js"></script>
<script>
	
	//Checa se o cookie foi setado e atribui a ele uma ação
	
	if($.cookie("css")) {
		$("link").attr("href",$.cookie("css"));
	}
	
	$(document).ready(function() {
		
		//Ao clicar no menu pegue o atributo rel e aplica no body depois salva no cookie por 365 dias o arquivo
		
		$("#nav li a").click(function() { 
			$("link").attr("href",$(this).attr('rel'));
			$.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
			return false;
		});
	});
</script>
</head>
<body>
	
    
    
	<div id="wrap">
    	<h1>Trocar CSS com jQuery e grvar em Cookie</h1>
		<ul id="nav">
			<li><a href="#" rel="style1.css">CSS Original</a></li>
			<li><a href="#" rel="style2.css">Fundo Claro</a></li>
			<li><a href="#" rel="style3.css">Fundo Escuro</a></li>           
		</ul>

		<div id="content">
        	<p align="right"></p>
			<h2>Trocando CSS e gravando em cookies com jQuery </h2>
            <small>(Stylesheet Switcher)</small>
			<p>Este é um exemplo de como construir um switcher de estilo simples em jQuery. Para ler sobre como isso é feito, consulte o  <a href="http://www.cssnewbie.com/simple-jquery-stylesheet-switcher/">artigo original CSS Newbie</a>.</p>
			<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
			<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
			<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
			<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
		</div>
		<div id="footer">
			<p><a href="http://www.adrianomeira.com/blog/?p=254" target="_self">Voltar para meu artigo</a></p>
	</div>

</body>
</html>
