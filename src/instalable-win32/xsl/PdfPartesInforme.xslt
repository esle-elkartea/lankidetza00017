<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
	<xsl:output method="fo"/>
	<xsl:include href="main.xslt"/>
	<xsl:template match="result">
		<xsl:for-each select="./Partes">
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="16cm"/>
				<fo:table-body>
					<fo:table-row>
						<fo:table-cell text-align="center" table-layout="fixed">
							<fo:block font-weight="bold" font-size="14pt">PARTE DE TRABAJO</fo:block>
						</fo:table-cell>					
					</fo:table-row>
				</fo:table-body>
			</fo:table>		
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="5cm"/>
				<fo:table-column column-width="11cm"/>		
				<fo:table-body>	
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm"  table-layout="fixed" background-color="#c0c0c0">
							<fo:block font-size="10pt">
								Técnico
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="TrabajadorPartesParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>					
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm"  table-layout="fixed" background-color="#c0c0c0">
							<fo:block font-size="10pt">
								Nº
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="Idparte"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>					
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm"  table-layout="fixed" background-color="#c0c0c0">
							<fo:block font-size="10pt">
								Cliente
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="ClientePartesParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>								
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm"  table-layout="fixed" background-color="#c0c0c0">
							<fo:block font-size="10pt">
								Orden de trabajo
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="OrdenPartesParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>					
				</fo:table-body>
			</fo:table>					
					
			<fo:table border-style="solid" border-width="0.1mm" table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="3cm"/>
				<fo:table-column column-width="2cm"/>
				<fo:table-column column-width="11cm"/>
				<fo:table-body>
					<fo:table-row background-color="#c0c0c0">
						<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
							<fo:block font-size="10pt">Fecha</fo:block>
						</fo:table-cell>
						<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
							<fo:block font-size="10pt">Horas</fo:block>
						</fo:table-cell>
						<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
							<fo:block font-size="10pt">Descripción</fo:block>
						</fo:table-cell>					
					</fo:table-row>
				</fo:table-body>
			</fo:table>	
			<xsl:for-each select="./Lineasparte">
				<fo:table border-style="solid" border-width="0.1mm" table-layout="fixed">
					<fo:table-column column-width="3cm"/>
					<fo:table-column column-width="2cm"/>
					<fo:table-column column-width="11cm"/>			
					<fo:table-body>
						<fo:table-row>
							<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">		
								<fo:block font-size="10pt">
									<xsl:value-of select="FechaLineasparteParsed"/>
								</fo:block>
							</fo:table-cell>
							<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">			
								<fo:block font-size="10pt">
									<xsl:value-of select="HorasLineasparteParsed"/>
								</fo:block>
							</fo:table-cell>
							<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">		
								<fo:block font-size="10pt">
									<xsl:value-of select="ObservacionesLineasparteParsed"/>
								</fo:block>
							</fo:table-cell>						
						</fo:table-row>
					</fo:table-body>
				</fo:table>						
			</xsl:for-each>					
						
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="3cm"/>
				<fo:table-column column-width="13cm"/>		
				<fo:table-body>								
					<fo:table-row>
						<fo:table-cell number-columns-spanned="2"  text-align="left" padding-after="0.1cm" padding-before="0.1cm"   table-layout="fixed">
							<fo:block font-size="10pt">
								Observaciones
							</fo:block>						
						</fo:table-cell>
					</fo:table-row>	
					<fo:table-row>
						<fo:table-cell number-columns-spanned="2"  text-align="left" padding-after="0.1cm" padding-before="0.1cm" border-top-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="ObservacionesPartesParsed"/>
							</fo:block>						
						</fo:table-cell>
					</fo:table-row>																														
				</fo:table-body>
			</fo:table>																														
		</xsl:for-each>	
	</xsl:template>
	<xsl:include href="elementosCabecera.xslt"/>
</xsl:stylesheet>
