
package net.idtoki.instelec.model;


import java.util.logging.Logger;

import net.zylk.tools.format.FormatUtils;

import org.apache.torque.TorqueException;
import org.apache.torque.om.Persistent;

/**
 * The skeleton for this class was autogenerated by Torque on:
 *
 * [Thu Aug 10 13:35:35 CEST 2006]
 *
 * You should add additional methods to this class to meet the
 * application requirements.  This class will only be generated as
 * long as it does not already exist in the output directory.
 */
public  class Clientes
    extends net.idtoki.instelec.model.BaseClientes
    implements Persistent
{

private static final Logger logger = Logger.getLogger("net.idtoki.instelec.model.Clientes");


		
	public String getIdclienteClientesParsed()
	{
		return FormatUtils.genericParsedStr(this.getIdcliente() + "");
		}					

		
	public String getCifClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getCif());		
				}					

		
	public String getFechaaltaClientesParsed()
	{
				return FormatUtils.genericParsedStr(FormatUtils.aaaammdd2ddmmaaaa(this.getFechaalta(),"-"));		
				}					

		
	public String getFechabajaClientesParsed()
	{
				return FormatUtils.genericParsedStr(FormatUtils.aaaammdd2ddmmaaaa(this.getFechabaja(),"-"));		
				}					

		
	public String getNombreClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getNombre());		
				}					

		
	public String getRazonsocialClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getRazonsocial());		
				}					

		
	public String getIdlocalidadClientesParsed()
	{
		String strFK=null;
		try
		{
			strFK=this.getLocalidades().getULContentLocalidadesParsed();
		}
		catch (TorqueException te) {
			logger.severe("No se ha podido localizar Localidades. getIdlocalidadClientesParsed()" );
			te.printStackTrace();
		}
		return FormatUtils.genericParsedStr(strFK);		
		}					

		
	public String getDireccionClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getDireccion());		
				}					

		
	public String getCpClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getCp());		
				}					

		
	public String getTelefonoClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getTelefono());		
				}					

		
	public String getFaxClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getFax());		
				}					

		
	public String getMovilClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getMovil());		
				}					

		
	public String getEmailClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getEmail());		
				}					

		
	public String getNumerocuentaClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getNumerocuenta());		
				}					

		
	public String getObservacionesClientesParsed()
	{
				return FormatUtils.genericParsedStr(this.getObservaciones());		
				}					


	public String getPathClientesParsed(String strQueryString) throws TorqueException
	{	
	  String a = "";
	  if (strQueryString.indexOf("localidades") != -1)	  
	  	a = a + this.getLocalidades().getPathLocalidadesParsed(strQueryString) + "/";
	  a = a + this.getNombreClientesParsed();  
	  return a;
	}

	public String getULContentClientesParsed() throws TorqueException
	{
		return FormatUtils.genericParsedStr(this.getIdcliente() + "-" + this.getNombreClientesParsed());	
	}	

	public String getHijosTrabajosClientes()
	{
		return "<a href='#' class='hijos' id='getHijosTrabajosClientes" + this.getIdcliente() + "' title='Trabajos'>&#160;&#160;&#160;&#160;</a>";
	}
	
	public String getDeleteClientes()
	{
		return "<a href='#' class='eliminar' id='getDeleteClientes" + this.getIdcliente() + "'>&#160;&#160;&#160;&#160;</a>";
	}	
	public String getEditClientes()
	{
		return "<a href='#' class='edicion' id='getEditClientes" + this.getIdcliente() + "'>&#160;&#160;&#160;&#160;</a>";
	}

}
