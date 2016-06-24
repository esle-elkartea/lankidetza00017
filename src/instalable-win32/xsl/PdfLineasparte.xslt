<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
	<xsl:output method="fo"/>
	<xsl:include href="main.xslt"/>
	<xsl:template match="result">
		<xsl:for-each select="./Lineasparte">
			<fo:table table-layout="fixed" >
				<fo:table-column column-width="4cm"/>
				<fo:table-column column-width="4cm"/>
				<fo:table-column column-width="4cm"/>
				<fo:table-column column-width="4cm"/>			
				<fo:table-body>	
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Idlineaparte
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="IdlineaparteLineasparteParsed"/>
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Idparte
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="IdparteLineasparteParsed"/>
							</fo:block>						
						</fo:table-cell>
					</fo:table-row>
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Fecha
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="FechaLineasparteParsed"/>
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Horas
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="HorasLineasparteParsed"/>
							</fo:block>						
						</fo:table-cell>
					</fo:table-row>
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Observaciones
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="ObservacionesLineasparteParsed"/>
							</fo:block>						
						</fo:table-cell>
					</fo:table-row>
				</fo:table-body>
			</fo:table>																											
		</xsl:for-each>	
	</xsl:template>
	<xsl:include href="elementosCabecera.xslt"/>
</xsl:stylesheet>


