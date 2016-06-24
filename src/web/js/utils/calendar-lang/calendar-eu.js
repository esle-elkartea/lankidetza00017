// ** I18N

// Calendar ES (eukara) language
// Author: Zylk.net S.L.L, <info@zylk.net>
// Updater: Servilio Afre Puentes <servilios@yahoo.com>
// Updated: 2004-06-03
// Encoding: UTF-8
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.

// full day names
Calendar._DN = new Array
("Igandea",
 "Astelehena",
 "Asteartea",
 "Asteazkena",
 "Osteguna",
 "Ostirala",
 "Larunbata",
 "Igandea");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("Igan",
 "Aleh",
 "Aart",
 "Aazk",
 "Oste",
 "Osti",
 "Laru",
 "Igan");

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 1;

// full month names
Calendar._MN = new Array
("Urtarrila",
 "Otsaila",
 "Martxoa",
 "Apirila",
 "Maiatza",
 "Ekaina",
 "Uztaila",
 "Abuztua",
 "Iraila",
 "Urria",
 "Azaroa",
 "Abendua");

// short month names
Calendar._SMN = new Array
("Urt",
 "Ots",
 "Mar",
 "Apr",
 "Mai",
 "Eka",
 "Uzt",
 "Abu",
 "Ira",
 "Urr",
 "Aza",
 "Abe");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "Egutegiari buruz";

Calendar._TT["ABOUT"] =
"Data/Ordua DHTML autatzailea\n" +
"(c) dynarch.com 2002-2005 / Autorea: Mihai Bazon\n" + // don't translate this this ;-)
"Azken bertsioa lortzeko: http://www.dynarch.com/projects/calendar/\n" +
"GNU LGPL Lizentziapean banatuta. Xehetasun gehiagorako http://gnu.org/licenses/lgpl.html ikustatu." +
"\n\n" +
"Data aukeraketa:\n" +
"- Urtea Aukeratzeko \xab, \xbb botoiak sakatu\n" +
"- Hilabetea aukeratzeko " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " botoiak sakatu\n" +
"- Aukeraketa azkarra egiteko edozein botoian saguaren botoia sakatuta mantendu.";
Calendar._TT["ABOUT_TIME"] = "\n\n" +
"Ordu Aukeraketa:\n" +
"- Ordua Gehitzeko orduaren edozein atalean sakatu.\n" +
"- Ordua murrizteko SHIFT sakatu saguarekin orduan sakatzen duzun bitartean\n" +
"- edo saguarekin klik egin eta eraman aukeraketa arinago egiteko.";

Calendar._TT["PREV_YEAR"] = "Aurreko urtea (menurako mantendu)";
Calendar._TT["PREV_MONTH"] = "Aurreko hilabetea (menurako mantendu)";
Calendar._TT["GO_TODAY"] = "'Gaur'-era joan";
Calendar._TT["NEXT_MONTH"] = "Urrengo hilabetea (menurako mantendu)";
Calendar._TT["NEXT_YEAR"] = "Urrengo urtea (menurako mantendu)";
Calendar._TT["SEL_DATE"] = "Data aukeratu";
Calendar._TT["DRAG_TO_MOVE"] = "Mugitzeko saguarekin eraman";
Calendar._TT["PART_TODAY"] = " (gaur)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Asteko lehen eguna %s jarri";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "Itxi";
Calendar._TT["TODAY"] = "Gaur";
Calendar._TT["TIME_PART"] = "Balorea aldatzeko (SHIFT)Klik edo saguarekin eraman";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y/%m/%d";
Calendar._TT["TT_DATE_FORMAT"] = "%Yko %Bren %en, %A";

Calendar._TT["WK"] = "Ast";
Calendar._TT["TIME"] = "Ordua:";
