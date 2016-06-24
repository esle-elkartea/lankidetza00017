function editor(tipo,url,column,method, autoUrl,classValidacion,options)
{
	this.tipo = tipo;
	this.url = url;
	this.column = parseInt(column);
	this.method = method;
	this.autoUrl = autoUrl;
	this.classValidacion = classValidacion;
	this.options = options;
}

function getTipo()
{
	return this.tipo;
}
editor.prototype.getTipo= getTipo;

function getAutoUrl()
{
	return this.autoUrl;
}
editor.prototype.getAutoUrl= getAutoUrl;

function getUrl()
{
	return this.url;
}
editor.prototype.getUrl= getUrl;


function getColumn()
{
	return parseInt(this.column);
}
editor.prototype.getColumn= getColumn;

function getMethod()
{
	return this.method;
}
editor.prototype.getMethod= getMethod;

function getClassValidacion()
{
	return this.classValidacion;
}
editor.prototype.getClassValidacion = getClassValidacion;

function getOptions()
{
	return this.options;
}
editor.prototype.getOptions = getOptions;


//objeto para acumular los ojetos de edicion anteriores

function regist()
{
	this.elementos= new Array();
	this.validaciones = new Array();
	this.urlRegExp = /get|[0-9]*/g;
   	this.primaryKeyRegExp = /[A-Za-z]*/g;
}

function setRegExp(reg1,reg2)
{
	this.urlRegExp = reg1;
   	this.primaryKeyRegExp = reg2;
}
regist.prototype.setRegExp= setRegExp;

function addElemento(elem)
{
	this.elementos[elem.getMethod()] = elem;
	this.validaciones[elem.getMethod()] = elem.getClassValidacion()
}

regist.prototype.addElemento = addElemento;

function getElemento(method)
{
	return this.elementos[method];
}

regist.prototype.getElemento = getElemento;

function getValidacion(method)
{
	return this.validaciones[method];
}

regist.prototype.getValidacion = getValidacion;


function process(id,grid)
{
   //alert(id);
   var primaryKey;
   var method;
   method = id.replace(this.urlRegExp,"");
   //alert(method);
   primaryKey = id.replace(this.primaryKeyRegExp,"");
   e = this.getElemento(method);
   v= this.getValidacion(method);
   //alert(e);
   if(e){ //si no esta registrado el method no hacer nada
    switch (e.getTipo()){
     case 'DATE':
	  //new Ajax.ZkInPlaceDateEditor($(id), e.getUrl(),primaryKey,{onComplete:readValue2});
	  new Ajax.ZkInPlaceDateEditor($(id), e.getUrl(),primaryKey,grid,e.getOptions());
	  break;
     case 'AUTO':
      //new Ajax.ZkInPlaceAutoCompleteEditor($(id), e.getUrl() ,primaryKey, e.getAutoUrl(),{onComplete:readValue});
	  new Ajax.ZkInPlaceAutoCompleteEditor($(id), e.getUrl() ,primaryKey,v, e.getAutoUrl(),grid,e.getOptions());
	  break;
     case 'NORMAL':
	  //new Ajax.ZkInPlaceEditor($(id), e.getUrl() ,primaryKey,v,{onComplete:readValue}); 
	 new Ajax.ZkInPlaceEditor($(id), e.getUrl() ,primaryKey,v,grid,e.getOptions()); 
	  break;
     case 'AREA':
	  //new Ajax.ZkInPlaceEditor($(id), e.getUrl() ,primaryKey,v,{onComplete:readValue,rows:4}); 
	  new Ajax.ZkInPlaceEditor($(id), e.getUrl() ,primaryKey,v,grid,e.getOptions()); 
	  break;	  
     case 'FREE':
	  new Ajax.ZkInPlaceFreeLauncher($(id), e.getUrl() ,primaryKey, e.getOptions());
	  break;  				   	  
     default:
      //do nothing;
      break;
    }
   }
}

regist.prototype.process = process;

function readValue()
{
id=this.element.id;
var span = "<span id='" + id + "'>" + this.element.innerHTML + "</span>";
myLiveRicoGrid.viewPort.buffer.rows[myLiveRicoGrid.viewPort.filaClick][myLiveRicoGrid.viewPort.columnaClick]= span;

}

function readValue2()
{
id=this.calendar.params.displayArea.id;
var span = "<span id='" + id + "'>" + this.calendar.params.displayArea.innerHTML + "</span>";
myLiveRicoGrid.viewPort.buffer.rows[myLiveRicoGrid.viewPort.filaClick][myLiveRicoGrid.viewPort.columnaClick]= span;

}

