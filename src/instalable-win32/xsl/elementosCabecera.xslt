<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:java="http://xml.apache.org/xslt/java" exclude-result-prefixes="java" version="1.0">
<xsl:output method="fo"/>
<xsl:template match="numeroRegistro">
	<fo:block font-size="8pt" color="#808080">
		<fo:inline font-size="10pt">nº registro:  </fo:inline><xsl:value-of select="." />
	</fo:block>
</xsl:template>	
<xsl:template match="nombre">
	<fo:block font-size="18pt" color="#808080">
		<xsl:value-of select="." />
	</fo:block>
</xsl:template>
<xsl:template match="direccion">
	<fo:block font-size="10pt" color="#808080">
		<xsl:value-of select="." />
	</fo:block>
</xsl:template>	
<xsl:template match="telefono">
	<fo:block font-size="8pt" color="#808080">
		tfno: <xsl:value-of select="." />
	</fo:block>
</xsl:template>	
<xsl:template match="fax">
	<fo:block font-size="8pt" color="#808080">
		fax: <xsl:value-of select="." />
	</fo:block>
</xsl:template>	
<xsl:template match="email">
	<fo:block font-size="8pt" color="#808080">
		e-mail: <xsl:value-of select="." />
	</fo:block>
</xsl:template>	
</xsl:stylesheet>
