<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
	<xsl:output method="fo"/>
	<xsl:include href="main.xslt"/>
	<xsl:template match="result">
		<xsl:for-each select="./Trabajos">
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="16cm"/>
				<fo:table-body>
					<fo:table-row>
						<fo:table-cell text-align="center" table-layout="fixed">
							<fo:block font-weight="bold" font-size="14pt">PRESUPUESTO</fo:block>
						</fo:table-cell>					
					</fo:table-row>
				</fo:table-body>
			</fo:table>		
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="5cm"/>
				<fo:table-column column-width="11cm"/>		
				<fo:table-body>	
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-size="10pt">
								Cliente
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-weight="bold" font-size="10pt">
								<xsl:value-of select="ClienteTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>					
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-size="10pt">
								Fecha
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="FechapresupuestoTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>								
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-size="10pt">
								Descripción
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="DescripcionTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>	
				</fo:table-body>					
			</fo:table>					
						
			<xsl:for-each select="./Ordenestrabajo">
				
				<xsl:for-each select="./Tareas">
				
					<fo:table table-layout="fixed" space-before="0.4cm">
						<fo:table-column column-width="3cm"/>
						<fo:table-column column-width="5cm"/>
						<fo:table-column column-width="2cm"/>
						<fo:table-column column-width="3cm"/>	
						<fo:table-column column-width="3cm"/>									
						<fo:table-body>	
							<fo:table-row background-color="#c0c0c0">
								<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">Artículo</fo:block>						
								</fo:table-cell>							
								<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">Descripción</fo:block>						
								</fo:table-cell>							
								<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">Cantidad</fo:block>						
								</fo:table-cell>
								<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">Precio</fo:block>						
								</fo:table-cell>
								<fo:table-cell text-align="center" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">Importe</fo:block>						
								</fo:table-cell>																																					
							</fo:table-row>	
							<xsl:for-each select="./Materiales">											
							<fo:table-row>
								<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">
										<xsl:value-of select="DescripcionMaterialesParsed"/>
									</fo:block>						
								</fo:table-cell>
								<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">
										<xsl:value-of select="IdtipomaterialMaterialesParsed"/>
									</fo:block>						
								</fo:table-cell>															
								<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">
										<xsl:value-of select="CantidadMaterialesParsed"/>
									</fo:block>						
								</fo:table-cell>							
								<fo:table-cell text-align="center" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">
										<xsl:value-of select="ImporteMaterialesParsed"/>
									</fo:block>						
								</fo:table-cell>	
								<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" border-style="solid" border-width="0.1mm" table-layout="fixed">
									<fo:block font-size="10pt">
										<xsl:value-of select="ImporteCalculadoMaterialesParsed"/>
									</fo:block>						
								</fo:table-cell>																													
							</fo:table-row>	
							</xsl:for-each>																			
						</fo:table-body>
					</fo:table>				
				
				</xsl:for-each>					
					
			</xsl:for-each>	
			
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="13cm"/>
				<fo:table-column column-width="3cm"/>		
				<fo:table-body>		
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"  table-layout="fixed">
							<fo:block font-size="10pt">
								Materiales
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="ImporteCalculadoMaterialesTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>									
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-size="10pt">
								Mano de obra
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-size="10pt">
								<xsl:value-of select="ImporteCalculadoManoObraTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>	
					<fo:table-row>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-weight="bold" font-size="10pt">
								Total
							</fo:block>						
						</fo:table-cell>
						<fo:table-cell text-align="right" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm"   border-style="solid" border-width="0.1mm"  table-layout="fixed">
							<fo:block font-weight="bold" font-size="10pt">
								<xsl:value-of select="ImporteTrabajosParsed"/>
							</fo:block>						
						</fo:table-cell>												
					</fo:table-row>																				
				</fo:table-body>
			</fo:table>							
		
			<fo:table table-layout="fixed" space-before="0.4cm">
				<fo:table-column column-width="16cm"/>
				<fo:table-body>
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.1cm" table-layout="fixed">
							<fo:block font-weight="bold" font-size="10pt">Observaciones</fo:block>
						</fo:table-cell>					
					</fo:table-row>
					<fo:table-row>
						<fo:table-cell text-align="left" padding="0.4cm" padding-after="0.1cm" padding-before="0.4cm" table-layout="fixed">
							<fo:block font-size="10pt" white-space-collapse="false">
								<xsl:value-of select="ObservacionesTrabajosParsed"/>
							</fo:block>
						</fo:table-cell>					
					</fo:table-row>					
				</fo:table-body>
			</fo:table>						
																														
		</xsl:for-each>	
	</xsl:template>
	<xsl:include href="elementosCabecera.xslt"/>
</xsl:stylesheet>
