Validation.addAllThese([
	['requerido-es', 'Este campo es requerido.', function(v) {
				return !Validation.get('IsEmpty').test(v);
			}],
	['validate-number-es', 'Introducir un número válido en este campo.', function(v) {
				return Validation.get('IsEmpty').test(v) || !isNaN(v);
			}],
	['validate-digits-es', 'Introducir sólo dígitos en este campo.', function(v) {
				return Validation.get('IsEmpty').test(v) ||  !/[^\d]/.test(v);
			}],
	['validate-alpha-es', 'Introducir sólo letras o caracteres no numéricos (a-z) en este campo.', function (v) {
				//return Validation.get('IsEmpty').test(v) ||  /^[a-zA-Z]+$/.test(v)
				return Validation.get('IsEmpty').test(v) ||  /^[a-zA-Z\W]+$/.test(v)//admita acentos u otros caracteres
			}],
	['validate-alphanum-es', 'Introducir sólo letras (a-z) o  números (0-9) en este campo. Espacios o otros caracteres no están permitidos.', function(v) {
				return Validation.get('IsEmpty').test(v) ||  !/\W/.test(v)
			}],
	['validate-date-es', 'Introducir una fecha válida.', function(v) {
				var test = new Date(v);
				return Validation.get('IsEmpty').test(v) || !isNaN(test);
			}],
	['validate-email-es', 'Introducir una dirección válida. Por ejemplo mail@domain.com .', function (v) {
				return Validation.get('IsEmpty').test(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v)
			}],
	['validate-date-au-es', 'Introducir fechas con formato (dd/mm/yyyy). Por ejemplo 17/03/2006  17 de marzo 2006.', function(v) {
				if(!Validation.get('IsEmpty').test(v)) {
					var upper = 31;
					if(/^(\d{2})\/(\d{2})\/(\d{4})$/.test(v)) { // dd/mm/yyyy
						if(RegExp.$2 == '02') upper = 29;
						if((RegExp.$1 <= upper) && (RegExp.$2 <= 12)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return true;
				}
			}],
	['validate-currency-dollar', 'Please enter a valid $ amount. For example $100.00 .', function(v) {
				// [$]1[##][,###]+[.##]
				// [$]1###+[.##]
				// [$]0.##
				// [$].##
				return Validation.get('IsEmpty').test(v) ||  /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(v)
			}],
	['validate-date-separador-es','Introducir fechas con formato (dd mm yyyy). Por ejemplo 17$03$2006  17 de marzo 2006.', function(v) {
				var expr = /[^0-9]/; //no numero
				var separador = v.match(expr); //primera coincidencia no numero (Ej: "-")
				var splitvar = v.split(separador);
				var vFormat =splitvar.join("/");
				//v.replace(/[^0-9]/g,"/");//reemplazamos sel separador actual por "/"
				//var vFormat = v.replace(/[^0-9]/g,"/");
				return Validation.get("validate-date-au-es").test(vFormat);	
				}],
	['validate-hora-es','Introducir horas con formato (hh:mm). Por ejemplo 17:45 (17 horas 45 minutos.', function(v) {
			return Validation.get('IsEmpty').test(v) || /^(0[1-9]|1\d|2[0-3]):([0-5]\d)$/.test(v);
				}]
]);

