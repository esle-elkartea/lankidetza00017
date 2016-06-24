
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
public  class Tipomateriales
    extends net.idtoki.instelec.model.BaseTipomateriales
    implements Persistent
{

private static final Logger logger = Logger.getLogger("net.idtoki.instelec.model.Tipomateriales");


		
	public String getIdtipomaterialTipomaterialesParsed()
	{
		return FormatUtils.genericParsedStr(this.getIdtipomaterial() + "");
		}					

		
	public String getDescripcionTipomaterialesParsed()
	{
				return FormatUtils.genericParsedStr(this.getDescripcion());		
				}					


	public String getPathTipomaterialesParsed(String strQueryString) throws TorqueException
	{	
	  String a = "";
	  a = a + this.getDescripcionTipomaterialesParsed();  
	  return a;
	}

	public String getULContentTipomaterialesParsed() throws TorqueException
	{
		return FormatUtils.genericParsedStr(this.getIdtipomaterial() + "-" + this.getDescripcionTipomaterialesParsed());	
	}	

	public String getHijosMaterialesTipomateriales()
	{
		return "<a href='#' class='hijos' id='getHijosMaterialesTipomateriales" + this.getIdtipomaterial() + "' title='Materiales'>&#160;&#160;&#160;&#160;</a>";
	}
	
	public String getDeleteTipomateriales()
	{
		return "<a href='#' class='eliminar' id='getDeleteTipomateriales" + this.getIdtipomaterial() + "'>&#160;&#160;&#160;&#160;</a>";
	}	
	public String getEditTipomateriales()
	{
		return "<a href='#' class='edicion' id='getEditTipomateriales" + this.getIdtipomaterial() + "'>&#160;&#160;&#160;&#160;</a>";
	}

}
