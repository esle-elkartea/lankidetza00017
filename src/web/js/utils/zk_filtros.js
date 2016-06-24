//librería de funciones java script para filtrar datos.
//todas las funciones que aprecen en esta libreria toman como argumento de 
//entrad una cadena y devuelven un true o false. se utilizan espresiones regulares

//es_cif comprueba la estructura de 8 digitos y una letra.
function es_cif(variable)
{
	var reg = /(^[0-9]{8})([a-z]$)/i;
	true_false = reg.test(variable);
	return true_false;
}

//comprueba que todos los caracteres de una cadena sean numeros, se considera como separador decimal el '.' si se quisiera la ',' reg = /^\d+(\,{0,1}\d+)$/
function es_numero(variable)
{
	// JORGE. He modificado la expresión regular con una sacada de un
	// ejemplo en Internet, ya que la que se usaba inicialmente decía que
	// el número 1 no era un número y sólo lo admitía como 01

	//var reg = /^-{0,1}\d+(\.{0,1}\d+)$/;
	if(!es_vacia(variable)) {
		var reg = /^[-+]?(\d*\.)?\d+([eEdD][-+]?\d+)?$/;
		true_false = reg.test(variable);
		return true_false;
	} else {
		return true;
	}
}

//es_letra compueba que una cadena solo contenga caracteres alfabeticos
function es_letra(variable)
{
	var reg = /^([a-z,ó,á,í,ú,Á,É,Í,Ú,ñ,Ñ]+)$/i;
	true_false = reg.test(variable);
	return true_false;
}

//es_mail  comprueba que la variable responda al patron algo@algo.algo
function es_mail(variable)
{ 
	var reg= /^[A-Z, a-z, 0-9,_]+\.{0,1}[A-Z, a-z, 0-9,_]+\@[A-Z, a-z, 0-9,_]+(\.[A-Z, a-z, 0-9,_]+)$/;
	true_false =reg.test(variable);
	return true_false;
}

//es_fecha comprueba que variable responda a la forma dd/mm/aaaa
//reg_estructura comprueba que la variable tiene la estructura correcta nn/nn/nnnn
//reg_dd comprueba que nn pertenece al conjunto [01-31] reg_mm que pertenece a [01-12] reg_aa al [1900-2299] 
function es_fecha(variable)
{
	if(!es_vacia(variable)) {
		var reg_estructura = /^[0-9]{2}\/{1}[0-9]{2}\/{1}[0-9]{4}$/;
		if(reg_estructura.test(variable))
		{
		var reg_dd = /(^([1-2]{1}[0-9]{1})$)|(^(3{1}[0-1]{1})$)|(^(0{0,1}[1-9]{1})$)/;
		var reg_mm = /(^0{0,1}[1-9]{1})$|(^(1{1}[0-2]{1})$)/;
		var reg_aa = /^((20|21|19|22){1}[0-9]{2})$/;
		splitvar = variable.split('/');
		true_false = (reg_dd.test(splitvar[0]))&&(reg_mm.test(splitvar[1]))&&(reg_aa.test(splitvar[2]))

			if (true_false)
			{
			 true_false=isDate(splitvar[0],splitvar[1],splitvar[2]);
			}

		return true_false;
		}
		else
		{
		true_false = reg_estructura.test(variable);
			if (true_false)
			{
			 true_false=isDate(splitvar[0],splitvar[1],splitvar[2]);
			}
		return true_false;
		}
	} else {
		return true;
	}
}
function y2k(number) { return (number < 1000) ? number + 1900 : number; }
function isDate (day,month,year) {
// checks if date passed is valid
// will accept dates in following format:
// isDate(dd,mm,ccyy), or
// isDate(dd,mm) - which defaults to the current year, or
// isDate(dd) - which defaults to the current month and year.
// Note, if passed the month must be between 1 and 12, and the
// year in ccyy format.

var today = new Date();
year = ((!year) ? y2k(today.getYear()):year);
month = ((!month) ? today.getMonth():month-1);
if (!day) return false
var test = new Date(year,month,day);
if ( (y2k(test.getYear()) == year) &&
(month == test.getMonth()) &&
(day == test.getDate()) )
return true;
else
return false
}

//es_vacia comprueban que una el año esta entre [1900-2299] el mes entre [0-12] y el dia entre [1-31]
function es_anyo(variable)
{
	var reg_aa = /^((20|21|19|22){1}[0-9]{2})$/;
	true_false = reg_aa.test(variable);
	return true_false;
}
function es_mes(variable)
{
	var reg_mm = /(^0{0,1}[1-9]{1})$|(^(1{1}[0-2]{1})$)/;
	true_false = reg_mm.test(variable);
	return true_false;
}

function es_dia(variable)
{
	var reg_dd = /(^([1-2]{1}[0-9]{1})$)|(^(3{1}[0-1]{1})$)|(^(0{0,1}[1-9]{1})$)/;
	true_false = reg_dd.test(variable);
	return true_false;
}


//es_vacia comprueba que una cadena dada este o no vacía.
function es_vacia(variable)
{
	var reg = /(^$)/;
	true_false = reg.test(variable);
	//alert(true_false);
	return true_false;
}
function no_es_vacia(variable)
{
	var reg = /(^$)/;
	true_false = reg.test(variable);
	//alert(true_false);
	return !true_false;
}

function es_fecha_separador(variable,sep){
	var splitvar = variable.split(sep);
	var variableFormat =splitvar.join("/");
	return es_fecha(variableFormat);
}