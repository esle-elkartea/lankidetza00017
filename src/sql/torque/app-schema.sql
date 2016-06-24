
-----------------------------------------------------------------------------
-- clientes
-----------------------------------------------------------------------------
DROP TABLE clientes CASCADE;


CREATE TABLE clientes
(
                                    idcliente serial,
                                    cif varchar (10) default '',
                                    fechaalta varchar (8) default '',
                                    fechabaja varchar (8) default '',
                                    nombre varchar (50) default '',
                                    razonsocial varchar (50) default '',
                                      -- REFERENCES localidades (idlocalidad)
    idlocalidad integer default 0,
                                    direccion varchar (50) default '',
                                    cp varchar (5) default '',
                                    telefono varchar (9) default '',
                                    fax varchar (9) default '',
                                    movil varchar (9) default '',
                                    email varchar (50) default '',
                                    numerocuenta varchar (20) default '',
                                    observaciones varchar (500) default '',
    PRIMARY KEY (idcliente)
);


-----------------------------------------------------------------------------
-- trabajadores
-----------------------------------------------------------------------------
DROP TABLE trabajadores CASCADE;


CREATE TABLE trabajadores
(
                                    idtrabajador serial,
                                      -- REFERENCES categorias (idcategoria)
    idcategoria integer default 0,
                                    nif varchar (10) default '',
                                    nombre varchar (50) default '',
                                    apellidouno varchar (50) default '',
                                    apellidodos varchar (50) default '',
                                    fechaalta varchar (8) default '',
                                    fechabaja varchar (8) default '',
                                    numeross varchar (20) default '',
                                    direccion varchar (50) default '',
                                    cp varchar (5) default '',
                                      -- REFERENCES localidades (idlocalidad)
    idlocalidad integer default 0,
                                    telefono varchar (9) default '',
                                    movil varchar (9) default '',
                                    email varchar (25) default '',
                                    observaciones varchar (500) default '',
    PRIMARY KEY (idtrabajador)
);


-----------------------------------------------------------------------------
-- partes
-----------------------------------------------------------------------------
DROP TABLE partes CASCADE;


CREATE TABLE partes
(
                                    idparte serial,
                                      -- REFERENCES ordenestrabajo (idorden)
    idorden integer default 0,
                                      -- REFERENCES trabajadores (idtrabajador)
    idtrabajador integer default 0,
                                    observaciones varchar (500) default '',
    PRIMARY KEY (idparte)
);


-----------------------------------------------------------------------------
-- lineasparte
-----------------------------------------------------------------------------
DROP TABLE lineasparte CASCADE;


CREATE TABLE lineasparte
(
                                    idlineaparte serial,
                                      -- REFERENCES partes (idparte)
    idparte integer default 0,
                                    fecha varchar (8) default '',
                                    horas float default 0,
                                    observaciones varchar (500) default '',
    PRIMARY KEY (idlineaparte)
);


-----------------------------------------------------------------------------
-- trabajos
-----------------------------------------------------------------------------
DROP TABLE trabajos CASCADE;


CREATE TABLE trabajos
(
                                    idtrabajo serial,
                                      -- REFERENCES clientes (idcliente)
    idcliente integer default 0,
                                    descripcion varchar (300) default '',
                                    fechaaviso varchar (8) default '',
                                    horaaviso varchar (4) default '',
                                    fechapresupuesto varchar (8) default '',
                                    fechafintrabajo varchar (8) default '',
                                    fechafactura varchar (8) default '',
                                    direccion varchar (50) default '',
                                    cp varchar (5) default '',
                                    telefono varchar (9) default '',
                                    estado integer default 0,
                                    importe float default 0,
                                    observaciones varchar (500) default '',
                                    personacontacto varchar (50) default '',
                                    personarecibe varchar (50) default '',
    PRIMARY KEY (idtrabajo)
);


-----------------------------------------------------------------------------
-- ordenestrabajo
-----------------------------------------------------------------------------
DROP TABLE ordenestrabajo CASCADE;


CREATE TABLE ordenestrabajo
(
                                    idorden serial,
                                    fechainicio varchar (8) default '',
                                    fechafin varchar (8) default '',
                                      -- REFERENCES trabajos (idtrabajo)
    idtrabajo integer default 0,
                                    descripcion varchar (250) default '',
                                    observaciones varchar (250) default '',
                                    tipomantenimiento integer default 0,
                                    urgencia integer default 0,
                                    sintomas varchar (250) default '',
                                    causas varchar (250) default '',
                                    importe float default 0,
    PRIMARY KEY (idorden)
);


-----------------------------------------------------------------------------
-- tareas
-----------------------------------------------------------------------------
DROP TABLE tareas CASCADE;


CREATE TABLE tareas
(
                                    idtarea serial,
                                    fechainicio varchar (8) default '',
                                    horas float default 0,
                                      -- REFERENCES ordenestrabajo (idorden)
    idorden integer default 0,
                                      -- REFERENCES tipotareas (idtipotarea)
    idtipotarea integer default 0,
                                      -- REFERENCES categorias (idcategoria)
    idcategoria integer default 0,
                                    observaciones varchar (500) default '',
    PRIMARY KEY (idtarea)
);


-----------------------------------------------------------------------------
-- materiales
-----------------------------------------------------------------------------
DROP TABLE materiales CASCADE;


CREATE TABLE materiales
(
                                    idmaterial serial,
                                    descripcion varchar (250) default '',
                                    cantidad float default 0,
                                    importe float default 0,
                                      -- REFERENCES tareas (idtarea)
    idtarea integer default 0,
                                      -- REFERENCES tipomateriales (idtipomaterial)
    idtipomaterial integer default 0,
    PRIMARY KEY (idmaterial)
);


-----------------------------------------------------------------------------
-- tipomateriales
-----------------------------------------------------------------------------
DROP TABLE tipomateriales CASCADE;


CREATE TABLE tipomateriales
(
                                    idtipomaterial serial,
                                    descripcion varchar (300) default '',
    PRIMARY KEY (idtipomaterial)
);


-----------------------------------------------------------------------------
-- tipotareas
-----------------------------------------------------------------------------
DROP TABLE tipotareas CASCADE;


CREATE TABLE tipotareas
(
                                    idtipotarea serial,
                                    descripcion varchar (300) default '',
    PRIMARY KEY (idtipotarea)
);


-----------------------------------------------------------------------------
-- categorias
-----------------------------------------------------------------------------
DROP TABLE categorias CASCADE;


CREATE TABLE categorias
(
                                    idcategoria serial,
                                    descripcion varchar (300) default '',
                                    coste float default 0,
    PRIMARY KEY (idcategoria)
);


-----------------------------------------------------------------------------
-- provincias
-----------------------------------------------------------------------------
DROP TABLE provincias CASCADE;


CREATE TABLE provincias
(
                                    idprovincia serial,
                                    nombre varchar (50) default '',
    PRIMARY KEY (idprovincia)
);


-----------------------------------------------------------------------------
-- localidades
-----------------------------------------------------------------------------
DROP TABLE localidades CASCADE;


CREATE TABLE localidades
(
                                    idlocalidad serial,
                                      -- REFERENCES provincias (idprovincia)
    idprovincia integer default 0,
                                    nombre varchar (50) default '',
    PRIMARY KEY (idlocalidad)
);


----------------------------------------------------------------------
-- localidades                                                      
----------------------------------------------------------------------

ALTER TABLE clientes
    ADD CONSTRAINT clientes_FK_1 FOREIGN KEY (idlocalidad)
    REFERENCES localidades (idlocalidad)
;

----------------------------------------------------------------------
-- clientes                                                      
----------------------------------------------------------------------

ALTER TABLE trabajadores
    ADD CONSTRAINT trabajadores_FK_1 FOREIGN KEY (idcategoria)
    REFERENCES categorias (idcategoria)
;
ALTER TABLE trabajadores
    ADD CONSTRAINT trabajadores_FK_2 FOREIGN KEY (idlocalidad)
    REFERENCES localidades (idlocalidad)
;

----------------------------------------------------------------------
-- trabajadores                                                      
----------------------------------------------------------------------

ALTER TABLE partes
    ADD CONSTRAINT partes_FK_1 FOREIGN KEY (idtrabajador)
    REFERENCES trabajadores (idtrabajador)
;
ALTER TABLE partes
    ADD CONSTRAINT partes_FK_2 FOREIGN KEY (idorden)
    REFERENCES ordenestrabajo (idorden)
;

----------------------------------------------------------------------
-- partes                                                      
----------------------------------------------------------------------

ALTER TABLE lineasparte
    ADD CONSTRAINT lineasparte_FK_1 FOREIGN KEY (idparte)
    REFERENCES partes (idparte)
;

----------------------------------------------------------------------
-- lineasparte                                                      
----------------------------------------------------------------------

ALTER TABLE trabajos
    ADD CONSTRAINT trabajos_FK_1 FOREIGN KEY (idcliente)
    REFERENCES clientes (idcliente)
;

----------------------------------------------------------------------
-- trabajos                                                      
----------------------------------------------------------------------

ALTER TABLE ordenestrabajo
    ADD CONSTRAINT ordenestrabajo_FK_1 FOREIGN KEY (idtrabajo)
    REFERENCES trabajos (idtrabajo)
;

----------------------------------------------------------------------
-- ordenestrabajo                                                      
----------------------------------------------------------------------

ALTER TABLE tareas
    ADD CONSTRAINT tareas_FK_1 FOREIGN KEY (idorden)
    REFERENCES ordenestrabajo (idorden)
;
ALTER TABLE tareas
    ADD CONSTRAINT tareas_FK_2 FOREIGN KEY (idtipotarea)
    REFERENCES tipotareas (idtipotarea)
;
ALTER TABLE tareas
    ADD CONSTRAINT tareas_FK_3 FOREIGN KEY (idcategoria)
    REFERENCES categorias (idcategoria)
;

----------------------------------------------------------------------
-- tareas                                                      
----------------------------------------------------------------------

ALTER TABLE materiales
    ADD CONSTRAINT materiales_FK_1 FOREIGN KEY (idtarea)
    REFERENCES tareas (idtarea)
;
ALTER TABLE materiales
    ADD CONSTRAINT materiales_FK_2 FOREIGN KEY (idtipomaterial)
    REFERENCES tipomateriales (idtipomaterial)
;

----------------------------------------------------------------------
-- materiales                                                      
----------------------------------------------------------------------


----------------------------------------------------------------------
-- tipomateriales                                                      
----------------------------------------------------------------------


----------------------------------------------------------------------
-- tipotareas                                                      
----------------------------------------------------------------------


----------------------------------------------------------------------
-- categorias                                                      
----------------------------------------------------------------------


----------------------------------------------------------------------
-- provincias                                                      
----------------------------------------------------------------------

ALTER TABLE localidades
    ADD CONSTRAINT localidades_FK_1 FOREIGN KEY (idprovincia)
    REFERENCES provincias (idprovincia)
;
