//Utilidades para el procesado de nodos de un xml


/*primera funcion*/
//devuelve el valor del nodo texto o null si no puede recogerlo. 
//xmlDocument (fragmento de un documentoxml) responseXML (ajax)
//tagName (nombre de la tag a recoger)

Element.getNodeValue = function(xmlFragmentDocument, tagName) {
  try
  {
   var nodeTags	= xmlFragmentDocument.getElementsByTagName(tagName);
   var value = ""
   for(i=0;i<nodeTags.length;i++)
   {
  	value += nodeTags[i].firstChild.nodeValue;
  	if(i != nodeTags.lenght-1)
  	 value +=" ";
   }
   return value;
  }
  catch (e)
  {
   return null; 	
  }
}

Element.updateInputValue = function(nodeId, value) {
  $(nodeId).value = value
}

Element.removeChilds = function(parentNodeId){
  var parentNode = $(parentNodeId)
  var oldCollection = parentNode.childNodes;
  while(oldCollection.length > 0)
  {
	parentNode.removeChild(oldCollection[0]);
  }
}

ProcessXML = function(xmlFragment,biyecccion){
  biyecccion.each( function(elemento){	   	
  			Element.updateInputValue(elemento.value,Element.getNodeValue(xmlFragment, elemento.key));
		});
  	
}
