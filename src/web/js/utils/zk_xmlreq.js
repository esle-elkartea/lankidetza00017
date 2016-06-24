function getResponseXml(xmlUrl){
  // branch for native XMLHttpRequest object
  if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();
      req.onreadystatechange = processReqChange;
      req.open("GET", xmlUrl, false);
      req.send(null);
  // branch for IE/Windows ActiveX version
  } else if (window.ActiveXObject) {
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
          req.onreadystatechange = processReqChange;
          req.open("GET", xmlUrl, false);
          req.send();
      }
  }
  return req;
}
// handle onreadystatechange event of req object
function processReqChange(){
    // only if req shows "loaded"
    if (req.readyState == 4) {
        // only if "OK"
        if (req.status == 200) {
        	//procesaReq();
         } else {
            alert("There was a problem retrieving the XML data:\n" +
                req.statusText);
         }
    }
}
function clearSelect(id) {
    var select = document.getElementById(id);
    while (select.length > 0) {
        select.remove(0);
    }
}
function isOk(req){
	var ok = req.responseXML.getElementsByTagName("estado");
	var isOkString = ok[0].childNodes[0].nodeValue;
	if(isOkString=="OK"){
		return true;	
	}else{
		return false;
	}
	
}

function clearDiv(id) {
    var select = document.getElementById(id);
    select.removeChild(select.firstChild);
}
function clearSpan(id) {
    var select = document.getElementById(id);
    select.removeChild(select.firstChild);   
}

function setInDiv(idDiv, node) {
    var select = document.getElementById(idDiv);
    select.appendChild(node);
}

function createTextArea() {
    textAreaNode = document.createElement("textArea");
    return textAreaNode;
}
function createDiv() {
    node = document.createElement("div");
    return node;
}
function setInDiv(div, node) {
    div.appendChild(node);
}

function buildDivText(comentario,id) {
    var div = document.getElementById(id);
    var textNode = document.createTextNode(comentario);
	div.appendChild(textNode);
}
function buildTopicList(lista,id,nameTag,valueTag,selectedIndex) {
    var select = document.getElementById(id);
    for (var i = 0; i < lista.length; i++) {
        isSelected=false;
        dato = lista[i].getElementsByTagName(nameTag)[0].childNodes[0].nodeValue;
       	value = lista[i].getElementsByTagName(valueTag)[0].childNodes[0].nodeValue;
       	if(value==selectedIndex){
       		isSelected=true;
       	}
        appendToSelectBoolean(select, value, document.createTextNode(dato),isSelected);
    }
}
// add item to select element the less
// elegant, but compatible way.
function appendToSelect(select, value, content) {
    var opt;
    opt = document.createElement("option");
    opt.value = value;
    opt.appendChild(content);
    select.appendChild(opt);
}
function appendToSelectBoolean(select, value, content, isSelected) {
    var opt;
    opt = document.createElement("option");
    opt.value = value;
    opt.appendChild(content);
    if(isSelected){
    	opt.selected=true;
    }else{
    	opt.selected=false;
    }
    select.appendChild(opt);
}


//esta función sirve para mover elementos de un select a otro
//el fbox es el objeto select de la izquierda y el tbox el de la derecha
// fbox=document.formulario.origen
// tbox=document.formulario.destino
sortitems = 1;

function move(fbox,tbox) {
	for(var i=0; i<fbox.options.length; i++) {
		if(fbox.options[i].selected && fbox.options[i].value != "") {
			var no = new Option();
			no.value = fbox.options[i].value;
			no.text = fbox.options[i].text;
			tbox.options[tbox.options.length] = no;
			fbox.options[i].value = "";
			fbox.options[i].text = "";
   		}
	}
	BumpUp(fbox);
	if (sortitems) SortD(tbox);
}

function BumpUp(box)  {
	for(var i=0; i<box.options.length; i++) {
		if(box.options[i].value == "")  {
			for(var j=i; j<box.options.length-1; j++)  {
				box.options[j].value = box.options[j+1].value;
				box.options[j].text = box.options[j+1].text;
			}
			var ln = i;
			break;
   		}
	}
	if(ln < box.options.length)  {
		box.options.length -= 1;
		BumpUp(box);
   	}
}

function SortD(box)  {
	var temp_opts = new Array();
	var temp = new Object();
	for(var i=0; i<box.options.length; i++)  {
		temp_opts[i] = box.options[i];
	}
	for(var x=0; x<temp_opts.length-1; x++)  {
		for(var y=(x+1); y<temp_opts.length; y++)  {
			if(temp_opts[x].text > temp_opts[y].text)  {
				temp = temp_opts[x].text;
				temp_opts[x].text = temp_opts[y].text;
				temp_opts[y].text = temp;
				temp = temp_opts[x].value;
				temp_opts[x].value = temp_opts[y].value;
				temp_opts[y].value = temp;
      		}
   		}
	}
	for(var i=0; i<box.options.length; i++)  {
		box.options[i].value = temp_opts[i].value;
		box.options[i].text = temp_opts[i].text;
   	}
}