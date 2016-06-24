package net.idtoki.instelec.manager;

import org.apache.torque.TorqueException;
import org.apache.torque.util.Criteria;

import net.idtoki.instelec.model.LineaspartePeer;

/**
 * The skeleton for this class was autogenerated by Torque on:
 *
 * [Mon Aug 07 12:09:17 CEST 2006]
 *
 *  You should add additional methods to this class to meet the
 *  application requirements.  This class will only be generated as
 *  long as it does not already exist in the output directory.
 */
public class LineasparteManager
    extends BaseLineasparteManager
{


//Borrado de un elemento
	public static boolean borraLineasparte(int idBorrar) {

		Criteria c=new Criteria();
		c.add(LineaspartePeer.IDLINEAPARTE, idBorrar);
		boolean bRet = false;
		try {
			LineaspartePeer.doDelete(c);
			bRet = true;
		} catch (TorqueException e) {
			logger.info("No se ha podido borrar en la tabla Lineasparte");
			e.printStackTrace();
			bRet = false;
		}
		return bRet;
	}

}


