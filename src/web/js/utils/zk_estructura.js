function elemento(nombre,comprobacion,transformacion,mensajeError){
	this.path = null;
	this.nombre = nombre || null;
	this.comprobacion = comprobacion || null;
	this.transformacion = transformacion || null;
	this.testSuperado = false;
	this.mensajeError = mensajeError || null;
	this.separadorFecha = "/";
}

function setMax(max){
	this.max = max;
}
elemento.prototype.setMax= setMax;

function setMin(min){
	this.min = min;
}
elemento.prototype.setMin= setMin;

function getMax(){
	return this.max;
}
elemento.prototype.getMax= getMax;

function getMin(){
	return this.min;
}
elemento.prototype.getMin= getMin;

function getNombre(){
	return this.nombre;
}
elemento.prototype.getNombre= getNombre;

function getPath(){
	return this.path;
}
elemento.prototype.getPath= getPath;

function getComprobacion(){
	return this.comprobacion;
}
elemento.prototype.getComprobacion= getComprobacion;

function getTransformacion(){
	return this.transformacion;
}
elemento.prototype.getTransformacion= getTransformacion;

function getMensajeError(){
	return this.mensajeError;
}
elemento.prototype.getMensajeError= getMensajeError;

function getTestSuperado(){
	return this.testSuperado;
}
elemento.prototype.getTestSuperado= getTestSuperado;

function setNombre(nombre){
	 this.nombre = nombre;
}
elemento.prototype.setNombre= setNombre;

function setPath(path){
	 this.path = path;
}
elemento.prototype.setPath= setPath;

function setComprobacion(comprobacion){
	this.comprobacion = comprobacion;
}
elemento.prototype.setComprobacion= setComprobacion;

function setTransformacion(transformacion){
	this.transformacion = transformacion;
}
elemento.prototype.setTransformacion= setTransformacion;

function setMensajeError(mensajeError){
	this.mensajeError = mensajeError;
}
elemento.prototype.setMensajeError= setMensajeError;

function setTestSuperado(testSuperado){
	this.testSuperado = testSuperado;
}
elemento.prototype.setTestSuperado= setTestSuperado;

function setSeparadorFecha(separadorFecha){
	this.separadorFecha = separadorFecha;
}
elemento.prototype.setSeparadorFecha= setSeparadorFecha;

function getSeparadorFecha(){
	return this.separadorFecha ;
}
elemento.prototype.getSeparadorFecha= getSeparadorFecha;

//objeto para acumular los ojetos de comprobación anteriores
function comprueba() {
	this.nombre = "";
	this.posicion = ""; 
	this.elementos= new Array();
	this.primerError = null;
}
function getPrimerError(){
	return this.primerError;
}
comprueba.prototype.getPrimerError= getPrimerError;

function setPrimerError(posicion){
	this.primerError  = posicion;
}
comprueba.prototype.setPrimerError = setPrimerError;

function addElemento(elem) {
	this.elementos[this.elementos.length] = elem;
}
comprueba.prototype.addElemento = addElemento;

function testElemento(objElem){
if(objElem.getPath() == null){
    //alert("nombre del input: "+objElem.getNombre());
	valor = document.forms[0].elements[objElem.getNombre()].value;
}else{
	valor = eval(objElem.getPath() + "." + objElem.getNombre() + ".value;");
}
accion = objElem.getComprobacion();

switch(accion){
	case("no_es_vacia"):
		test = no_es_vacia(valor);
		break;
	case("es_vacia"):
		test = es_vacia(valor);
		break;
	case("es_numero"):
		test = es_numero(valor);
		break;
	case("es_entero"):
		test = es_entero(valor);
		break;
	case("es_cif"):
		test = es_cif(valor);
		break;
	case("es_mail"):
		test = es_mail(valor);
		break;
	case("es_letra"):
		test = es_letra(valor);
		break;	
	case("es_dia"):
		test = es_dia(valor);
		break;
	case("es_mes"):
		test = es_mes(valor);
		break;
	case("es_anyo"):
		test = es_anyo(valor);
		break;
	case("es_fecha"):
		test = es_fecha(valor);
		break;
	case("es_max"):
		 if(objElem.getMax()!=null && objElem.getMax() >= valor.length){
		  test = true;
		 }else{
		  test = false;
		 }
		break;
	case("es_min"):
		 if(objElem.getMin()!=null && objElem.getMin() <= valor.length){
		  test = true;
		 }else{
		  test = false;
		 }
		break;
	case("es_fecha_separador"):
		var separador = objElem.getSeparadorFecha();
		test = es_fecha_separador(valor,separador);
		break;		
	default:
		break;
}
	if(!test){
		return false;
	}else{
		return true;
	}
}
comprueba.prototype.testElemento = testElemento;

function test(){
	var objElem;
	var prueba;
	var mensaje = "";
	for (i=0;i< this.elementos.length; i++) {
		objElem = this.elementos[i];
		prueba = this.testElemento(objElem);
		if(objElem.comprobacion != null){
		  if(prueba){
			objElem.setTestSuperado(true);
		  }else{
		    objElem.setTestSuperado(false);
		    mensaje += objElem.getMensajeError()+"\n";
		    if(this.getPrimerError() == null){
		       this.setPrimerError(i);
		   	}
		  }
	   }	
	}
   	if(this.getPrimerError() == null){
		return true;
	}else{
		alert(mensaje);
		try{
		  if(objElem.getPath() == null){
		  	  valor = document.forms[0].elements[this.elementos[this.getPrimerError()].getNombre()].focus();
		  }else{
			  valor = eval(objElem.getPath() + "." + this.elementos[this.getPrimerError()].getNombre() + ".focus();");
		  }
		}catch(exception){
		//si no se puede poner el foco porque el campo es hidden no hacemos nada
		}	
		return false;	
	}	
}
comprueba.prototype.test = test;

function getTestArray(){
var objElem;
	var prueba;
	var mensaje = "";
	for (i=0;i< this.elementos.length; i++){
		objElem = this.elementos[i];
		prueba = this.testElemento(objElem);
		if(prueba){
			objElem.setTestSuperado(true);
		}else{
			objElem.setTestSuperado(false);
		}	
	}
	return this.elementos;	
}
comprueba.prototype.getTestArray = getTestArray;

function transformar(){
	var objElem;
	for (i=0;i< this.elementos.length; i++){
	  objElem = this.elementos[i];
	  if (objElem.transformacion != null){	
		if(objElem.getPath() == null){
			valor = document.forms[0].elements[objElem.getNombre()].value;
		}else{
			valor = eval(objElem.getPath() + "." + objElem.getNombre() + ".value;");
		}
		accion = objElem.getTransformacion();
		switch(accion){
		case("dtrim"):
			valor = dtrim(valor);
			break;
		case("ltrim"):
			valor = ltrim(valor);
			break;
		case("trim"):
			valor = trim(valor);
			break;
		case("normalizar"):
			valor = normalizar(valor);
			break;
		case("elimina_guion"):
			valor = elimina_guion(valor);
			break;
		case("arregla_comillas_simples"):
			valor = arregla_comillas_simples(valor);
			break;
		case("arregla_comillas_dobles"):
			valor = arregla_comillas_dobles(valor);
			break;
		case("arregla_comillas"):
			valor = arregla_comillas(valor);
			break;
		case("completa_numero_a_dos_digitos"):
			valor = completa_numero_a_dos_digitos(valor);
			break;
		case("arregla_caracteres_especiales"):
			valor = arregla_caracteres_especiales(valor);
			break;	
		default:
			break;
		}
		if(objElem.getPath() == null){
			document.forms[0].elements[objElem.getNombre()].value = valor;
		}else{
			//si entro por aqui tengo que escapar las comillas y los caracteres epeciales
			valor=arregla_caracteres_especiales(valor);
			valor=arregla_comillas(valor);
			eval(objElem.getPath() + "." + objElem.getNombre() + ".value = \"" + valor+"\";");
		}
	  }
	} 
}
comprueba.prototype.transformar = transformar;