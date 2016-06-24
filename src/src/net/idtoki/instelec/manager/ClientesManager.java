package net.idtoki.instelec.manager;

import org.apache.torque.TorqueException;
import org.apache.torque.util.Criteria;

import net.idtoki.instelec.model.ClientesPeer;

/**
 * The skeleton for this class was autogenerated by Torque on:
 *
 * [Wed Jul 26 13:47:22 CEST 2006]
 *
 *  You should add additional methods to this class to meet the
 *  application requirements.  This class will only be generated as
 *  long as it does not already exist in the output directory.
 */
public class ClientesManager
    extends BaseClientesManager
{


//Borrado de un elemento
	public static boolean borraClientes(int idBorrar) {

		Criteria c=new Criteria();
		c.add(ClientesPeer.IDCLIENTE, idBorrar);
		boolean bRet = false;
		try {
			ClientesPeer.doDelete(c);
			bRet = true;
		} catch (TorqueException e) {
			logger.info("No se ha podido borrar en la tabla Clientes");
			e.printStackTrace();
			bRet = false;
		}
		return bRet;
	}

}

