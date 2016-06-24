//librerias de funciones java script para filtrar datos
//esta libreria contiene funciones que toman una cadena y la transforman en otra. 
//se usa en conjunción con zk_filtro.js que contiene funciones a las que se les pasa
//una cadena y devuele true o false atendiendo a si pasan o no un filtro	

//dtrim hace un trim de derechas sobre variable  " variable   " --> " variable"
function dtrim(variable)
{
        var reg = / +$/;
	dvariable = variable.replace(reg,"");
	return dvariable;
}

//ltrim hace un trim de izquierdas sobre variable "  variable " --> "variable " 
function ltrim(variable)
{
	var reg = /^ +/;
	lvariable = variable.replace(reg,"");
	return lvariable;
}

//trim hace un trim de izq y drcha sobre variable "  variable " --> "variable"
function trim(variable)
{
	lvariable = ltrim(variable);
	dlvariable = dtrim(lvariable);
	return dlvariable;
}

//intrim realiza un trim de izq, drcha e interno  sobre variable " var ia  ble "--> "variable"  
function intrim(variable)
{
	var reg = / +/g;
	dlvariable = trim(variable);
	indlvariable = dlvariable.replace(reg,"");
	return indlvariable;
}

//normalizar normaliza la variable realiza un trim y sustituye multiples espacios en blanco por uno solo   " hola   mundo     cruel  " --> "hola mundo cruel"
function normalizar(variable)
{
	var reg = / +/g;
	dlvariable = trim(variable);
	variable_normalizada = dlvariable.replace(reg," ");
	return variable_normalizada;
}

//elimina los caracteres "-" de una cadena,  por ejemplo en el numero de cuenta o en el cif 30662125-c --> 30662125c
function elimina_guion(variable)
{
	var reg = /-+/g;
	variable_sin_guion = variable.replace(reg,"");
	return variable_sin_guion;
}
//esta funcion sustituye las comillas simples por \' para que no den probelmas a la hora de insertarse en la base de datos
function arregla_comillas_simples(variable)
{
	/*alert("entrando en arregla comillas");
	myRegExp = new RegExp("'", "i")  
	alert("valorr: "+myRegExp.test(variable));*/
	var reg = /'/g;
	variable_sin_comillas = variable.replace(reg,"\\'");
	return variable_sin_comillas;
}
//esta funcion sustituye las comillas dobles por \' para que no den probelmas a la hora de insertarse en la base de datos
function arregla_comillas_dobles(variable)
{
	var reg = /\"/g;
	variable_sin_comillas = variable.replace(reg,"\\'");
	return variable_sin_comillas;
}
//esta funcion sustituye las comillas simples o dobles por \' para que no den probelmas a la hora de insertarse en la base de datos
function arregla_comillas(variable)
{
	var reg = /(\")|(')/g;
	variable_sin_comillas = variable.replace(reg,"\\'");
	return variable_sin_comillas;
}

function arregla_caracteres_especiales(variable)
{	
	var reg = /\r/g; 
	variable = variable.replace(reg,"\\r");
	var reg2 = /\n/g; 
	variable = variable.replace(reg2,"\\n");
	return variable;
}
function completa_numero_a_dos_digitos(variable)
{
	var reg = /(^([0-9]{1})$)/;
	if (reg.test(variable)){
	  var variable_con_ceros = "0" + variable;
	  return variable_con_ceros;
	}
	return variable;
}
