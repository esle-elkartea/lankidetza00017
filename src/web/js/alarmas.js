 function cargarAlarmas(pstrAlarmaLinks, pstrAlarmaFiltro, pstrAlarmaFunctions)
 {
 	var strAlarmaLinks = pstrAlarmaLinks.split(";");
	var strAlarmaFiltro = pstrAlarmaFiltro.split(";"); 
  	var strAlarmaFunctions = pstrAlarmaFunctions.split(";");	
	var str="";
	var i;

	str="<div id='alarmas' class='alarmas'>";
	str = str + "<div>Inicio</div>";

	if (pstrAlarmaLinks!= "")
	   	for(i=0;i< strAlarmaLinks.length; i++)
	   	{
		str = str + "<span><a href='#' onClick='ponerFiltro(\"" + strAlarmaFiltro[i] + "\");resetParam();resetQuery();limpiar();" + strAlarmaFunctions[i] + ";'>" + strAlarmaLinks[i] + "</a></span>";
	   	}  
	str = str + "</div>";
	$('div_header').style.display='block';
	$('div_header').innerHTML=str;
}