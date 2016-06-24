function soloNumeros(evt)
{
 evt = (evt) ? evt : event;
 var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
     ((evt.which) ? evt.which : 0));

 if ((charCode >= 48 && charCode <= 57) || (charCode >= 33 && charCode <= 40) || (charCode >= 45 && charCode <= 46) || (charCode == 8) || (charCode == 9))
 {
  return true;
 }
 return false;
}
function soloLetras(evt)
{
 evt = (evt) ? evt : event;
 var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
     ((evt.which) ? evt.which : 0));

 if ((charCode >= 65 && charCode <= 90) || (charCode == 209 || charCode == 241) || (charCode >= 97 && charCode <= 122) || (charCode >= 33 && charCode <= 40) || (charCode >= 45 && charCode <= 46) || (charCode == 8) || (charCode == 9))
 {
  return true;
 }
 return false;
}

function charCode(evt){
 evt = (evt) ? evt : event;
 var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
     ((evt.which) ? evt.which : 0));
 alert("en el body"+charCode);
}
