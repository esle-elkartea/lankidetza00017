function extrasNuevoFormulario(){
}
function extrasEdicionGrid(){
}
function extrasEdicionFormulario(){
	anadirElemento('trabajos.IMPORTE','recalcularImporteTrabajos()');
	anadirElemento('ordenesTrabajo.IMPORTE','recalcularImporteOrdenestrabajo()');
	//anadirElemento('tareas.HORAS','costeCategoria()');
	asignarFuncionChange('tareas.HORAS','costeCategoria()');
	asignarFuncionChange('tareas.IDCATEGORIA','costeCategoria()');
	asignarFuncionChange('materiales.IMPORTE','recalcularImporteMateriales()');
	asignarFuncionChange('materiales.CANTIDAD','recalcularImporteMateriales()');
}

function anadirElemento(elem,func){
	if (document.getElementById(elem)){
		var recalculo = crearAImg(elem);
		asignarFuncion(recalculo,func);
		var element = document.getElementById(elem);
		Element.addClassName(element,"cajaFecha");
		element.parentNode.appendChild(recalculo);//.insertBefore(recalculo,element);
	}
}

function crearAImg(elem){
	var recalculo = document.createElement("a");
	recalculo.href = "#";
	var imgRecalculo = document.createElement("img");
	var element = document.getElementById(elem);
	if (parseFloat(element.value) == -1)
	{
		imgRecalculo.src = '../img/recalcular2.gif';
		imgRecalculo.alt = '!Cuidado!! El valor actual es de -1';
	}
	else
	{
		imgRecalculo.src = '../img/recalcular.gif';
		imgRecalculo.alt = 'recalcular';		
	}
	Element.addClassName(imgRecalculo,"imagenCentrada");
	recalculo.appendChild(imgRecalculo);
	return recalculo;
}

function asignarFuncion(elem,func){
	if (!elem.setAttribute('onClick',func))
		elem['onclick']=new Function(func);	
}

function asignarFuncionChange(elem,func){
	var el = document.getElementById(elem);
	if (el)
		if (!el.setAttribute('onBlur',func))
			el['onblur']=new Function(func);	
}

function recalcularImporteTrabajos(){
	var valor = parseFloat(document.getElementById('trabajos.IMPORTECALCULADO').innerHTML);
	document.getElementById('trabajos.IMPORTE').value = valor.toFixed(2);
}

function recalcularImporteOrdenestrabajo(){
	var valor = parseFloat(document.getElementById('ordenesTrabajo.MANOOBRACALCULADO').innerHTML);
	document.getElementById('ordenesTrabajo.IMPORTE').value = valor.toFixed(2);
}

function recalcularImporteTareas(originalRequest){
	var resultXML=originalRequest.responseXML;
        var temp=resultXML.getElementsByTagName('tareas.COSTECATEGORIA')[0].firstChild.nodeValue;
	var valor = parseFloat(temp*document.getElementById('tareas.HORAS').value);
	document.getElementById('tareas.MANOOBRACALCULADO').innerHTML = valor.toFixed(2);
}

function costeCategoria()
{
	var strLinkEditServlet = "/instelec/Tareas/CosteCategoriasTareasServlet";
	var param = "tareas.IDCATEGORIA="+document.getElementById('tareas.IDCATEGORIA').value;
	var myAjax = new Ajax.Request(strLinkEditServlet,{method: 'get', parameters:param, onComplete:recalcularImporteTareas});
}

function recalcularImporteMateriales(){
	var importe = parseFloat(document.getElementById('materiales.IMPORTE').value);
	var cantidad = parseFloat(document.getElementById('materiales.CANTIDAD').value);
	var valor = importe*cantidad;
	document.getElementById('materiales.IMPORTECALCULADO').innerHTML = valor.toFixed(2);
}
