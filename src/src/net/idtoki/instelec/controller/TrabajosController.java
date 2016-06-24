package net.idtoki.instelec.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.ResourceBundle;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamSource;

import org.apache.torque.TorqueException;
import org.apache.torque.util.Criteria;

import net.idtoki.instelec.manager.TrabajosManager;
import net.idtoki.instelec.group.TrabajosGroupBean;
import net.idtoki.instelec.helper.TrabajosHelper;
import net.idtoki.instelec.model.TrabajosPeer;
import net.idtoki.instelec.model.Trabajos;

import net.idtoki.instelec.manager.ClientesManager;
import net.idtoki.instelec.group.ClientesGroupBean;
import net.idtoki.instelec.model.ClientesPeer;
import net.idtoki.instelec.helper.ClientesHelper;

import net.idtoki.instelec.helper.OrdenestrabajoHelper;


import net.zylk.tools.ajax.AjaxUtils;
import net.zylk.tools.ajax.AjaxUtils.DinamicGridBean;
import net.zylk.tools.format.FormatUtils;
import net.zylk.tools.pdf.PdfUtils;
import net.zylk.tools.xml.XmlUtils;
import net.zylk.torque.TorqueUtils;
import net.zylk.web.WebUtils;

/**
 * The skeleton for this class was autogenerated by Torque on:
 *
 * [Thu Aug 10 13:35:35 CEST 2006]
 *
 *  You should add additional methods to this class to meet the
 *  application requirements.  This class will only be generated as
 *  long as it does not already exist in the output directory.
 */
 
 
public class TrabajosController
    extends net.idtoki.instelec.controller.BaseTrabajosController
{
 private static final Logger logger = Logger.getLogger("net.idtoki.instelec.controller.TrabajosController");
 private TransformerFactory tFactory = TransformerFactory.newInstance();
 private Transformer trabajos_transformer = null;  
 private Transformer trabajoss_transformer = null; 
 private Transformer trabajos_presupuesto_transformer = null;
 private Transformer trabajos_factura_transformer = null;

 public void init(ServletConfig config)
 {
	super.init();
	ResourceBundle resource = ResourceBundle.getBundle("net/idtoki/instelec/app/config/app-config");
	File trabajos = new File(resource.getString("app.xsl.templates.dir")+"/PdfTrabajos.xslt");
	Source xslSource = new StreamSource(trabajos);
	File trabajoss = new File(resource.getString("app.xsl.templates.dir")+"/PdfListaTrabajos.xslt");
	Source xslSourceT = new StreamSource(trabajoss); 	
	File trabajosP = new File(resource.getString("app.xsl.templates.dir")+"/PdfTrabajosPresupuesto.xslt");
	Source xslSourceP = new StreamSource(trabajosP);	
	File trabajosF = new File(resource.getString("app.xsl.templates.dir")+"/PdfTrabajosFactura.xslt");
	Source xslSourceF = new StreamSource(trabajosF);	
	try{
		trabajos_transformer = tFactory.newTransformer(xslSource);
		trabajoss_transformer = tFactory.newTransformer(xslSourceT);
		trabajos_presupuesto_transformer = tFactory.newTransformer(xslSourceP);
		trabajos_factura_transformer = tFactory.newTransformer(xslSourceF);
	}catch (Exception e){
	  e.printStackTrace();
	}
 }


//Funci�n para la inserci�n/actualizaci�n de registros

public void serviceAddTrabajos(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 //Con esto se consigue transformar el request a UTF
	 //para temas de acentos y otros caracteres
	 utf8RequestService(request);

	 //recojo los parametros del formulario y doy de alta un nuevo elmento
	 try
	 {
		 String estado =  WebUtils.getStringParam(request, "trabajos.ESTADO");
		 String [] valor= estado.split("-");		 
		 Trabajos elTrabajos = TrabajosHelper.createObj(request);
		 TrabajosGroupBean gbTrabajos = new TrabajosGroupBean();
		 elTrabajos.setEstado(new Integer(valor[0]).intValue());
		 elTrabajos.setFechaaviso(FormatUtils.ddmmaaaa2aaaammdd(elTrabajos.getFechaaviso(),"-",""));
		 elTrabajos.setFechapresupuesto(FormatUtils.ddmmaaaa2aaaammdd(elTrabajos.getFechapresupuesto(),"-",""));
		 elTrabajos.setFechafintrabajo(FormatUtils.ddmmaaaa2aaaammdd(elTrabajos.getFechafintrabajo(),"-",""));
		 elTrabajos.setFechafactura(FormatUtils.ddmmaaaa2aaaammdd(elTrabajos.getFechafactura(),"-",""));
		 gbTrabajos.setElemento(elTrabajos);
		 gbTrabajos.save();
	 }
	 catch(TorqueException te)
	 {
		 response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	 }
 }


//Funci�n para la eliminaci�n de un registro
//este m�todo invoca al m�todo public void deleteTrabajos(int idBorrar)
//definido en el TrabajosManager
 public void serviceDeleteTrabajos(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 int idBorrar=-1;
	 idBorrar=WebUtils.getintParam(request, "borrarId");
	 if (idBorrar!=-1)
 		 if (TrabajosManager.borraTrabajos(idBorrar))
			 WebUtils.writeXmlResponse(response,XmlUtils.buildXmlOKResponse("ISO-8859-1"));
		 else
			 WebUtils.writeXmlResponse(response,XmlUtils.buildXmlNotOKResponse("ISO-8859-1"));			 
 }


// Funciones para las ordenaciones y filtrados de informaci�n

 private Criteria ordenacion(Criteria c,String CampoOrdenacion,String OrdenOrdenacion) 
 { 
 	if((OrdenOrdenacion != null )&& (OrdenOrdenacion.compareTo("ASC")==0))
 		if ((CampoOrdenacion != null))
 		{
 			c.addAscendingOrderByColumn(CampoOrdenacion.toString());
 		}
 	if  ((OrdenOrdenacion != null) && (OrdenOrdenacion.compareTo("DESC")==0))
 		if ((CampoOrdenacion != null))
		{
 			c.addDescendingOrderByColumn(CampoOrdenacion.toString());
 		}
 	return c;
 }

private Criteria filtro(Criteria c,int filtro) 
{ 
	 switch (filtro)
	 {
	 case 1:
		 c.add(TrabajosPeer.ESTADO,0);
		  break;
	 case 2:
		 c.add(TrabajosPeer.ESTADO,1);
		  break;
	 case 3:
		 c.add(TrabajosPeer.ESTADO,2);
		  break;
	 case 4:
		 c.add(TrabajosPeer.ESTADO,3);
		  break;
	 case 5:
		 c.add(TrabajosPeer.ESTADO,0);
		 c.or(TrabajosPeer.ESTADO,1);
		  break;		  
	 default:
		 //caso por defecto
		 break;
	 }
	return c;
}

 public StringBuffer replaceStringBuffer (StringBuffer strBA, String strOrigen, String strDestino) 
 {
	 return new StringBuffer(strBA.toString().replaceAll(strOrigen,strDestino));
 }

 private Criteria criteriaTrabajosTableContent(HttpServletRequest request,Criteria c) throws IOException, ServletException
 {
 	String param = "";	 
	 param =  WebUtils.getStringParam(request, new ClientesHelper().getIdclienteName());
	 if(param != null)
		 TorqueUtils.addEqualCriteria(c,TrabajosPeer.IDCLIENTE,param);
	  String paramSortCol =  WebUtils.getStringParam(request, "sort_col");
	  String paramSortDir =  WebUtils.getStringParam(request, "sort_dir");
	  int paramFiltro =  WebUtils.getintParam(request, "filtro");
	  c = ordenacion(c,paramSortCol,paramSortDir);
	  c = filtro(c,paramFiltro);

 	  return c;
 } 
 
 public String getPathElementTrabajos(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, TorqueException
 {
	 Criteria c= new Criteria();
	 String strPath = "";
	 int claveId=-1;
	 int claveFkId=-1;	 
	 claveId=WebUtils.getintParam(request, "trabajos.IDTRABAJO");
	 if (claveId!=-1)
	 {
		c.add(TrabajosPeer.IDTRABAJO, claveId);
		TrabajosGroupBean trgb = TrabajosManager.getTrabajoss(c);							
		strPath = trgb.getTrabajos(0).getPathTrabajosParsed(request.getQueryString());
	 }
	 return "<path>" + strPath + "</path>";
 } 
 
 public String getPathTableContentTrabajos(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, TorqueException
 {
	 Criteria c= new Criteria();
	 String strPath = "";
	 int claveId=-1;	 
	 claveId=WebUtils.getintParam(request, "clientes.IDCLIENTE");
	 if(claveId != -1){
		 strPath = ClientesManager.getClientes(claveId).getPathClientesParsed(request.getQueryString());
	 }		 	 
	 return "<path>" + strPath + "</path>";
 }  


public void  serviceTrabajosTableContent(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, TorqueException
 {
	 utf8RequestService(request);
	 int numElemPedidosBD = 40;
	 int gap = 0;//gap = viewedRows - numElemVisiblesUltPag	  
	 DinamicGridBean dgb = WebUtils.getDinamicGridBeanParam(request,numElemPedidosBD,gap); 
	 Criteria c =TrabajosManager.buildSearchCriteria(dgb);
	 c =criteriaTrabajosTableContent(request,c);	 
	 TrabajosGroupBean cgb = TrabajosManager.getTrabajoss(c);
	 dgb.setTotalSize(cgb.getTotalSize());
	  
	 String[] methodos= new String[] {
		TrabajosHelper.IDCLIENTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONACONTACTO_GET_METHOD_NAME+"TrabajosParsed"	
		,TrabajosHelper.TELEFONO_GET_METHOD_NAME+"TrabajosParsed"		
		,TrabajosHelper.FECHAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.HORAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.FECHAPRESUPUESTO_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.FECHAFINTRABAJO_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.FECHAFACTURA_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.DIRECCION_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.CP_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"		
		,TrabajosHelper.ESTADO_GET_METHOD_NAME+"TrabajosParsed"+"Label"
		//,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		//,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"

		//,TrabajosHelper.PERSONARECIBE_GET_METHOD_NAME+"TrabajosParsed"
		,"getHijosOrdenestrabajoTrabajos"
		,"getEditTrabajos"
		,"getDeleteTrabajos"
	};
	 
	 StringBuffer cadena=null;
	 cadena = AjaxUtils.buildXmlAjaxResponseTableContentFromListObj(cgb.getAlmacen(),methodos,TrabajosHelper.IDTRABAJO_GET_METHOD_NAME, dgb,"ISO-8859-1"); 
	 cadena.insert(cadena.indexOf("</ajax-response>"),"<response type='object' id='divPath'>" + getPathTableContentTrabajos(request,response) + "</response>");
	 xmlResponseService(response,cadena); 
 }  

 public void serviceTrabajosUlContent(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 utf8RequestService(request);
	 String[] methodos= new String[] {
	 		"getULContentTrabajosParsed"
			 };
	 String param =  WebUtils.getStringParam(request, "value");
	 if(param==null || param.length() <= 0)
		 param =  WebUtils.getStringParam(request, new OrdenestrabajoHelper().getIdtrabajoName());
	 	 
	 TrabajosGroupBean mgb = TrabajosManager.getTrabajoss(TrabajosManager.buildSearchCriteria(param));
	 simpleResponseService(response, AjaxUtils.buildAjaxULContentFromListObj(mgb.getAlmacen(),methodos, TrabajosHelper.COMPLEX_ID_GET_METHOD,"Trabajos"));
 } 

 public void serviceEstadoTrabajosUlContent(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 utf8RequestService(request);
	 String cadena="<ul><li>0-Abierto</li><li>1-Presupuestado</li><li>2-Rechazado</li><li>3-Facturado</li></ul>";
	 response.getWriter().print(cadena);
 }

 public void serviceTrabajosElement(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, TorqueException
 {
  StringBuffer cadena=null;
  Criteria c= new Criteria();
  int claveId=-1;
  claveId=WebUtils.getintParam(request, "trabajos.IDTRABAJO");
  if (claveId!=-1)
  {
	  c.add(TrabajosPeer.IDTRABAJO, claveId);
  }
  c.addAscendingOrderByColumn(TrabajosPeer.IDTRABAJO);
  TrabajosGroupBean trgb = TrabajosManager.getTrabajoss(c);
  
  if (trgb.getTotalSize()!=0)
  {
	  String [] parametros={
		TrabajosHelper.IDTRABAJO_GET_METHOD_NAME
		,TrabajosHelper.IDCLIENTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.HORAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAPRESUPUESTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFINTRABAJO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFACTURA_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DIRECCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.CP_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.TELEFONO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONACONTACTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONARECIBE_GET_METHOD_NAME+"TrabajosParsed"		
		,TrabajosHelper.ESTADO_GET_METHOD_NAME+"TrabajosParsed"
		,"getImporteCalculadoTrabajosParsed"		
		,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"
	  };
	  cadena=trgb.buildXml(parametros,null,"ISO-8859-1");	
	  cadena.insert(cadena.indexOf("</result>"),getPathElementTrabajos(request,response));  
  }
  xmlResponseService(response, cadena);
 }  
 

 protected StringBuffer updateIdtrabajoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getIdtrabajoTrabajosParsed());
 }  
 

 protected StringBuffer updateIdclienteResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getIdclienteTrabajosParsed());
 }  
 

 protected StringBuffer updateDescripcionResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getDescripcionTrabajosParsed());
 }  
 

 protected StringBuffer updateFechaavisoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getFechaavisoTrabajosParsed());
 }  
 

 protected StringBuffer updateHoraavisoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getHoraavisoTrabajosParsed());
 }  
 

 protected StringBuffer updateFechapresupuestoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getFechapresupuestoTrabajosParsed());
 }  
 

 protected StringBuffer updateFechafintrabajoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getFechafintrabajoTrabajosParsed());
 }  
 

 protected StringBuffer updateFechafacturaResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getFechafacturaTrabajosParsed());
 }  
 

 protected StringBuffer updateDireccionResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getDireccionTrabajosParsed());
 }  
 

 protected StringBuffer updateCpResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getCpTrabajosParsed());
 }  
 

 protected StringBuffer updateTelefonoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getTelefonoTrabajosParsed());
 }  
 

 protected StringBuffer updateEstadoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getEstadoTrabajosParsed());
 }  
 

 protected StringBuffer updateImporteResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getImporteTrabajosParsed());
 }  
 

 protected StringBuffer updateObservacionesResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getObservacionesTrabajosParsed());
 }  
 

 protected StringBuffer updatePersonacontactoResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getPersonacontactoTrabajosParsed());
 }  
 

 protected StringBuffer updatePersonarecibeResponseCallBack(String s)
 {
  ArrayList a = AjaxUtils.splitIdFields(s);
  return new StringBuffer(TrabajosManager.getTrabajos(Integer.parseInt(a.get(0).toString())).getPersonarecibeTrabajosParsed());
 }  
 	
 
 public void serviceTrabajosClientes(HttpServletRequest request, HttpServletResponse response) throws IOException, TorqueException, ServletException
 {
  String cadena=null;
  Criteria c= new Criteria();
  int claveId=-1;
  claveId=WebUtils.getintParam(request, "clientes.IDCLIENTE");
  if (claveId!=-1)
  {
	  c.add(ClientesPeer.IDCLIENTE, claveId);
  }
  c.addAscendingOrderByColumn(ClientesPeer.IDCLIENTE);
  ClientesGroupBean trgb = ClientesManager.getClientess(c);
  
  if (trgb.getTotalSize()!=0)
  {
	  cadena = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" ?>";
	  cadena = cadena + "<result><trabajos.IDCLIENTE>" + trgb.getClientes(0).getULContentClientesParsed()  + "</trabajos.IDCLIENTE></result>";
  }
  
  xmlResponseService(response, new StringBuffer(cadena));
 }  
  			

 public void serviceGetTrabajosDetallePdf(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 utf8RequestService(request);
	 String[] getMethodos= new String[] {
		TrabajosHelper.IDTRABAJO_GET_METHOD_NAME
		,TrabajosHelper.IDCLIENTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.HORAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAPRESUPUESTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFINTRABAJO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFACTURA_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DIRECCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.CP_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.TELEFONO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.ESTADO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONACONTACTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONARECIBE_GET_METHOD_NAME+"TrabajosParsed"
			 };
	  
	 
	 TrabajosGroupBean tgb = new TrabajosGroupBean();
	 try
	{
		tgb.setElemento(TrabajosHelper.getTrabajos(request));
	} catch (TorqueException e)
	{
		logger.severe(e.getMessage());
	}
	
	 byte[] content =  PdfUtils.getBytes(replaceStringBuffer(tgb.buildXml(getMethodos, null,"ISO-8859-1"),"n/a"," "), trabajos_transformer,"ISO-8859-1");
	 response.addHeader("content-disposition","attachment;filename=Trabajos.pdf");
	 response.setContentType("application/pdf");
	 response.setHeader("Cache-Control", "");//para que funcione en IE
	 response.setContentLength(content.length);
	 response.getOutputStream().write(content);
	 response.getOutputStream().flush();  
	 response.getOutputStream().close();
	
 }  

 public void serviceTrabajosTableContentPdf(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
  	utf8RequestService(request);
  	Criteria c= new Criteria();
  	String paramQuery =  WebUtils.getStringParam(request, "query");
  	if ((paramQuery != null)&& (paramQuery.compareTo("")!=0) )
		c = TrabajosManager.buildSearchCriteria(paramQuery);   
  	c =criteriaTrabajosTableContent(request,c);	  
  	TrabajosGroupBean tgb = TrabajosManager.getTrabajoss(c);
  
  	String[] methodos= new String[] {	
		TrabajosHelper.IDCLIENTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.HORAAVISO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAPRESUPUESTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFINTRABAJO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFACTURA_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.DIRECCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.CP_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.TELEFONO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.ESTADO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONACONTACTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.PERSONARECIBE_GET_METHOD_NAME+"TrabajosParsed"
			};
  
	 byte[] content =  PdfUtils.getBytes(replaceStringBuffer(tgb.buildXml(methodos, null,"ISO-8859-1"),"n/a"," "), trabajoss_transformer,"ISO-8859-1");
	 response.addHeader("content-disposition","attachment;filename=ListaTrabajos.pdf");
	 response.setContentType("application/pdf");
	 response.setHeader("Cache-Control", "");//para que funcione en IE
	 response.setContentLength(content.length);
	 response.getOutputStream().write(content);
	 response.getOutputStream().flush();  
	 response.getOutputStream().close();
 }
 
 public void serviceGetTrabajosPresupuestoPdf(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 utf8RequestService(request);
	 String[] getMethodos= new String[] {
		TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAPRESUPUESTO_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"
		,"getClienteTrabajosParsed"
		,"getImporteCalculadoMaterialesTrabajosParsed"
		,"getImporteCalculadoManoObraTrabajosParsed"		
		//,"getDescripcionOrdenestrabajoParsed"
		//,"getImporteOrdenestrabajoParsed"
		//,"getIdtipotareaTareasParsed"
		//,"getObservacionesTareasParsed"	
		,"getDescripcionMaterialesParsed"
		,"getIdtipomaterialMaterialesParsed"
		,"getCantidadMaterialesParsed"	
		,"getImporteMaterialesParsed"
		,"getImporteCalculadoMaterialesParsed"		
			 };
	  
	 String[] getMetodosHijos = new String[] {"getOrdenestrabajos","getTareass","getMaterialess"};//getXXXXXXs
	 
	 TrabajosGroupBean tgb = new TrabajosGroupBean();
	 try
	{
		tgb.setElemento(TrabajosHelper.getTrabajos(request));
	} catch (TorqueException e)
	{
		logger.severe(e.getMessage());
	}
	
	 byte[] content =  PdfUtils.getBytes(replaceStringBuffer(tgb.buildXml(getMethodos, getMetodosHijos,"ISO-8859-1"),"n/a"," "), trabajos_presupuesto_transformer,"ISO-8859-1");
	 response.addHeader("content-disposition","attachment;filename=TrabajosPresupuesto.pdf");
	 response.setContentType("application/pdf");
	 response.setHeader("Cache-Control", "");//para que funcione en IE
	 response.setContentLength(content.length);
	 response.getOutputStream().write(content);
	 response.getOutputStream().flush();  
	 response.getOutputStream().close();
	
 } 
 
 public void serviceGetTrabajosFacturaPdf(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
 {
	 utf8RequestService(request);
	 String[] getMethodos= new String[] {
		TrabajosHelper.IDTRABAJO_GET_METHOD_NAME
		,TrabajosHelper.DESCRIPCION_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.FECHAFACTURA_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.IMPORTE_GET_METHOD_NAME+"TrabajosParsed"
		,TrabajosHelper.OBSERVACIONES_GET_METHOD_NAME+"TrabajosParsed"		
		,"getClienteTrabajosParsed"
		,"getImporteCalculadoMaterialesTrabajosParsed"
		,"getImporteCalculadoManoObraTrabajosParsed"		
		//,"getDescripcionOrdenestrabajoParsed"
		//,"getImporteOrdenestrabajoParsed"
		//,"getIdtipotareaTareasParsed"
		//,"getObservacionesTareasParsed"	
		,"getDescripcionMaterialesParsed"
		,"getIdtipomaterialMaterialesParsed"
		,"getCantidadMaterialesParsed"	
		,"getImporteMaterialesParsed"
		,"getImporteCalculadoMaterialesParsed"
			 };
	  
	 String[] getMetodosHijos = new String[] {"getOrdenestrabajos","getTareass","getMaterialess"};//getXXXXXXs
	 
	 TrabajosGroupBean tgb = new TrabajosGroupBean();
	 try
	{
		tgb.setElemento(TrabajosHelper.getTrabajos(request));
	} catch (TorqueException e)
	{
		logger.severe(e.getMessage());
	}
	
	 byte[] content =  PdfUtils.getBytes(replaceStringBuffer(tgb.buildXml(getMethodos, getMetodosHijos,"ISO-8859-1"),"n/a"," "), trabajos_factura_transformer,"ISO-8859-1");
	 response.addHeader("content-disposition","attachment;filename=TrabajosFactura.pdf");
	 response.setContentType("application/pdf");
	 response.setHeader("Cache-Control", "");//para que funcione en IE
	 response.setContentLength(content.length);
	 response.getOutputStream().write(content);
	 response.getOutputStream().flush();  
	 response.getOutputStream().close();
	
 }  
  

}

