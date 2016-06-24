Object.extend(Ajax.InPlaceEditor.prototype,{
  baseInitialize: function(element, url, options) {
    this.url = url;
    this.element = $(element);
    this.options = Object.extend({
      okButton: false,
      okText: "ok",
      cancelLink: false,
      cancelText: "cancel",
      savingText: "Saving...",
      clickToEditText: "Click to edit",
      okText: "ok",
      rows: 1,
      onComplete: function(transport, element) {
        new Effect.Highlight(element, {startcolor: this.options.highlightcolor});
      },
      onFailure: function(transport) {
        alert("Error communicating with the server: " + transport.responseText.stripTags());
      },
      callback: function(form) {
        return Form.serialize(form);
      },
      handleLineBreaks: true,
      loadingText: 'Loading...',
      savingClassName: 'inplaceeditor-saving',
      loadingClassName: 'inplaceeditor-loading',
      formClassName: 'inplaceeditor-form',
      highlightcolor: Ajax.InPlaceEditor.defaultHighlightColor,
      highlightendcolor: "#FFFFFF",
      externalControl:	null,
      submitOnBlur: true,
      ajaxOptions: {}
    }, options || {});

    if(!this.options.formId && this.element.id) {
      this.options.formId = this.element.id + "-inplaceeditor";
      if ($(this.options.formId)) {
        // there's already a form with that name, don't specify an id
        this.options.formId = null;
      }
    }
    
    if (this.options.externalControl) {
      this.options.externalControl = $(this.options.externalControl);
    }
    
    this.originalBackground = Element.getStyle(this.element, 'background-color');
    if (!this.originalBackground) {
      this.originalBackground = "transparent";
    }
    
    this.element.title = this.options.clickToEditText;
    
    this.onclickListener = this.enterEditMode.bindAsEventListener(this);
    this.mouseoverListener = this.enterHover.bindAsEventListener(this);
    this.mouseoutListener = this.leaveHover.bindAsEventListener(this);
    Event.observe(this.element, 'dblclick', this.onclickListener);
    Event.observe(this.element, 'mouseover', this.mouseoverListener);
    Event.observe(this.element, 'mouseout', this.mouseoutListener);
    if (this.options.externalControl) {
      Event.observe(this.options.externalControl, 'dblclick', this.onclickListener);
      Event.observe(this.options.externalControl, 'mouseover', this.mouseoverListener);
      Event.observe(this.options.externalControl, 'mouseout', this.mouseoutListener);
    }
  }
  });

Ajax.ZkInPlaceEditor = Class.create();
Object.extend(Object.extend(Ajax.ZkInPlaceEditor.prototype,Ajax.InPlaceEditor.prototype),{
    initialize: function(element, url, id, classValidation ,grid,options)
    {
		this.viewPort = grid.viewPort;
 		this.refreshBuffer =  function(resp)
 					 {


  						this.viewPort.sincronizeContents();
   					 }
		Object.extend(options,{onComplete: this.refreshBuffer});
   		this.baseInitialize(element, url, options);
        this.id2Update = id;
		this.classValidation = classValidation;

	if (this.saving) return;
    if (this.editing) return;
    this.editing = true;
    this.onEnterEditMode();
    if (this.options.externalControl) {
      Element.hide(this.options.externalControl);
    }
    Element.hide(this.element);
    this.createForm();  
    this.element.parentNode.insertBefore(this.form, this.element);
    //var val = new Validation(null,this,{});
   
    Field.scrollFreeActivate(this.editField);

    return false;
  	},

  	getId2Update: function()
  	{
  		return this.id2Update;
  	},
  	
   createForm: function() {

    this.form = document.createElement("form");
    this.form.id = this.options.formId;
    Element.addClassName(this.form, this.options.formClassName)

    //---------------------------------------------------------------------<<<<<
    this.form.onsubmit = this.onSubmit.bind(this);

    this.createEditField();

    if (this.options.textarea) {
      var br = document.createElement("br");
      this.form.appendChild(br);
    }

    if (this.options.okButton) {
      okButton = document.createElement("input");
      okButton.type = "submit";
      okButton.value = this.options.okText;
      this.form.appendChild(okButton);
    }

    if (this.options.cancelLink) {
      cancelLink = document.createElement("a");
      cancelLink.href = "#";
      cancelLink.appendChild(document.createTextNode(this.options.cancelText));
      cancelLink.onclick = this.onclickCancel.bind(this);
      this.form.appendChild(cancelLink);
    }
  
  },
  	createEditField: function() {
    var text;
    if(this.options.loadTextURL) {
      text = this.options.loadingText;
    } else {
    	if (this.element.firstChild.nodeValue.indexOf("\n") != -1)
    	 	text = this.element.firstChild.nodeValue;
    	else
      		text = this.getText();
    }
    var obj = this;

    if (this.options.rows == 1 && !this.hasHTMLLineBreaks(text)) {
      this.options.textarea = false;
      var textField = document.createElement("input");
      textField.obj = this;
      textField.type = "text";
      textField.name = "value";
      textField.id = "nnmm";
      Element.addClassName(textField, this.classValidation);
      //textField.value = text;
	  //unescapeHTML() no codifica "<",">","%", etc..
	  textField.value = text.unescapeHTML();
      //textField.style.backgroundColor = this.options.highlightcolor; //no funciona en IE
      var size = this.options.size || this.options.cols || 0;
      if (size != 0){
       textField.size = size;
      }
      else
      {
       textField.size = this.getText().length;
      }
      if (this.options.submitOnBlur){
      //----------------------------------------------------------<<<<<<<<<<<<<<
        //textField.onblur = this.onSubmit.bind(this);
        textField.onblur = this.onSubmit.bindAsEventListener(this);
      }
      this.editField = textField;
    } else {
      this.options.textarea = true;
      var textArea = document.createElement("textarea");
      textArea.obj = this;
      textArea.name = "value";
      textArea.id = "nnmm";
	  Element.addClassName(textArea, this.classValidation);
      //textArea.value = this.convertHTMLLineBreaks(text);
	  // unescapeHTML() no codifica "<",">","%", etc..
	  textArea.value = this.convertHTMLLineBreaks(text);
      textArea.rows = this.options.rows;
      textArea.cols = this.options.cols || 40;
      textArea.style.position = 'absolute';
      if (this.options.submitOnBlur){
        //textArea.onblur = this.onSubmit.bind(this);
		textArea.onblur = this.onSubmit.bindAsEventListener(this);
      }
      this.editField = textArea;
    }

    if(this.options.loadTextURL) {
      this.loadExternalText();
    }
    var hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "primaryKeyId";
    hiddenField.value = this.getId2Update();
    this.form.appendChild(hiddenField);
    this.form.appendChild(this.editField);
    //Event.observe(this.editField,'blur',this.onblurSave.bindAsEventListener(this));
	Event.observe(this.editField,'keyup',this.onKeyPressCancel.bindAsEventListener(this));
  },
  
  onSubmit: function(ev) {
    // onLoading resets these so we need to save them away for the Ajax call
    var form = this.form;
    var value = this.editField.value;
    var val = new Validation(form.id,{stopOnFirst:true});
    //Validation.validate('field_id')
    var boo = val.validate();
    if(boo){
    // do this first, sometimes the ajax call returns before we get a chance to switch on Saving...
    // which means this will actually switch on Saving... *after* we've left edit mode causing Saving...
    // to be displayed indefinitely
    this.onLoading();
    
    new Ajax.Updater(
      { 
        success: this.element,
         // don't update on failure (this could be an option)
        failure: null
      },
      this.url,
      Object.extend({
        parameters: this.options.callback(form, value),
        onComplete: this.onComplete.bind(this),
        onFailure: this.onFailure.bind(this)
      }, this.options.ajaxOptions)
    );
    }
    else{
    	Event.stop(ev);
    }
    // stop the event to avoid a page refresh in Safari
    if (arguments.length > 1) {
      Event.stop(arguments[0]);
    }
    return false;
  },
  
  onKeyPressCancel: function(event){
   switch(event.keyCode) {
       case Event.KEY_ESC:
         Event.stop(event);
	   	 this.onComplete();
         this.leaveEditMode();
         return false;
       default:
       	return true;
    }
  }
});

/* In place editor para fechas */
Ajax.ZkInPlaceDateEditor = Class.create();
Ajax.ZkInPlaceDateEditor.prototype = {
  initialize: function(element, url, id, grid,options){
     Calendar.setup({
      //inputField   :    element.id,            // id of the input field
      displayArea	 :	  element.id,
	  //ifFormat       :    "%d-%m-%Y",      	    // format of the input field
	  daFormat       :    "%d-%m-%Y",      	        // format of the input field
	  //button       :    "calendar_image_trigger"  // trigger for the calendar (button ID)
	  //showsTime	 : true,
	  electric		 : false,
	  showOthers	 : true,
	  onUpdate       : this.sendDate.bind(this),
	  visibleOnLoad  : true,
	  eventName		 : 'dblclick',
	  updateUrl		 : url,
	  updatePk		 : id
   	 });
	 this.viewPort = grid.viewPort;
   	 this.refreshBuffer =  function(resp){
  		this.viewPort.sincronizeContents();
   	 	}
   	 this.options = Object.extend({}, options || {});
  },
  sendDate: function(cal){
  //alert(cal.params.displayArea.innerHTML);
  	 this.calendar=cal;
	 var query = "value="+cal.date.print("%Y%m%d")+"&primaryKeyId="+cal.params.updatePk;
	 //no borrar de momento
	 //this.options = Object.extend(this.options, {parameters:query});
    // new Ajax.Request(cal.params.updateUrl, this.options);
	 new Ajax.Request(cal.params.updateUrl,{
			parameters:query,
			onSuccess: this.refreshBuffer.bind(this)
		});
	//falta hacer un rollback cuando el ajaxrequest falla para devolver a la grid a su estado original
  } 
  
};

/* In js free launcher */
Ajax.ZkInPlaceFreeLauncher = Class.create();
Ajax.ZkInPlaceFreeLauncher.prototype = {
  initialize: function(element, callback, id, options){
  	callback(element,id);
  }
};


/* Editor con autocompletado*/
Ajax.ZkInPlaceAutoCompleteEditor = Class.create();
Object.extend(Object.extend(Ajax.ZkInPlaceAutoCompleteEditor.prototype,Ajax.InPlaceEditor.prototype),{
    initialize: function(element, url, id, classValidation, autoUrl,grid, options)
    {
    	
    this.minChars = options.minChars;  	
    	
		this.viewPort = grid.viewPort;
 		this.refreshBuffer =  function(resp)
 					 {
  						this.viewPort.sincronizeContents();
   					 }
       
    	this.baseInitialize(element, url, {onComplete: this.refreshBuffer});;
	
    	this.id2Update = id;
    	this.autoUrl = autoUrl;
    	this.classValidation = classValidation;


    	if (this.saving) return;
    	if (this.editing) return;
    	this.editing = true;
    	this.onEnterEditMode();
    	if (this.options.externalControl) {
      		Element.hide(this.options.externalControl);
    	}
    	Element.hide(this.element);
    	this.createForm();

    	Field.scrollFreeActivate(this.editField);
    	// stop the event to avoid a page refresh in Safari
    	return false;
  	},

  	getId2Update: function()
  	{
  		return this.id2Update;
  	},
  	getAutoUrl: function()
  	{
  		return this.autoUrl;
  	},
  	createEditField: function() {
    var text;
    if(this.options.loadTextURL) {
      text = this.options.loadingText;
    } else {
      text = this.getText();
    }

	// creo el input visible y el hidden para el id que hay que actualizar
    this.options.textarea = false;
    var textField = document.createElement("input");
    textField.type = "text";
    textField.name = "value";
    textField.id = this.getId2Update()+"value";
    textField.value = text;
    textField.size = 10;
    Element.addClassName(textField, this.classValidation);
    this.editField = textField;

    var hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "primaryKeyId";
    hiddenField.value = this.getId2Update();

    //creamos la capa de autocompletado
    var autoDiv = document.createElement("div");
    autoDiv.id = textField.id+"Update";
    autoDiv.style.display = 'none';
    Element.addClassName(autoDiv,"in-place-auto-div");
    autoDiv.style.zIndex='99';

    if(this.options.loadTextURL) {
      this.loadExternalText();
    }
    this.form.appendChild(this.editField);
    this.form.appendChild(autoDiv);
    this.form.appendChild(hiddenField);
    Event.observe(this.editField,'keyup',this.onKeyPressCancel.bindAsEventListener(this));
  },


  createForm: function() {

    this.form = document.createElement("form");
    this.form.id = this.options.formId;
    Element.addClassName(this.form, this.options.formClassName)
    this.form.onsubmit = this.onSubmit.bind(this);

    this.createEditField();

    if (this.options.textarea) {
      var br = document.createElement("br");
      this.form.appendChild(br);
    }

    if (this.options.okButton) {
      okButton = document.createElement("input");
      okButton.type = "submit";
      okButton.value = this.options.okText;
      this.form.appendChild(okButton);
    }

    if (this.options.cancelLink) {
      cancelLink = document.createElement("a");
      cancelLink.href = "#";
      cancelLink.appendChild(document.createTextNode(this.options.cancelText));
      cancelLink.onclick = this.onclickCancel.bind(this);
      this.form.appendChild(cancelLink);
    }

    //a?ado el form y el autocompletado
    this.element.parentNode.insertBefore(this.form, this.element);
	new Ajax.ZkAutocompleter(this.getId2Update()+"value",this.getId2Update()+"valueUpdate",this.getAutoUrl(),{inPlaceEditor:this,minChars:this.minChars});

  },

  onSubmit: function(ev) {
    // onLoading resets these so we need to save them away for the Ajax call
    var form = this.form;
    var value = this.editField.value;
    var val = new Validation(form.id,{stopOnFirst:true});
    //Validation.validate('field_id')
    var boo = val.validate();
    if(boo){
    // do this first, sometimes the ajax call returns before we get a chance to switch on Saving...
    // which means this will actually switch on Saving... *after* we've left edit mode causing Saving...
    // to be displayed indefinitely
    this.onLoading();
    
    new Ajax.Updater(
      { 
        success: this.element,
         // don't update on failure (this could be an option)
        failure: null
      },
      this.url,
      Object.extend({
        parameters: this.options.callback(form, value),
        onComplete: this.onComplete.bind(this),
        onFailure: this.onFailure.bind(this)
      }, this.options.ajaxOptions)
    );
    }
    else{
    	Event.stop(ev);
    }
    // stop the event to avoid a page refresh in Safari
    if (arguments.length > 1) {
      Event.stop(arguments[0]);
    }
    return false;
  },

  onKeyPressCancel: function(event){
   switch(event.keyCode) {
       case Event.KEY_ESC:
         Event.stop(event);
	   	 this.onComplete();
         this.leaveEditMode();
         return false;
       default:
       	return true;
    }
 }
});



/* In place editor Rico.Live */

Ajax.ZkLiveGrid = Class.create();
Object.extend(Object.extend(Ajax.ZkLiveGrid.prototype,Rico.LiveGrid.prototype),{
			  initialize: function( tableId, visibleRows, totalRows, url, editores ,eventos,options, ajaxOptions ) {
				 this.editores = editores;
				 this.eventos = eventos;
				 this.options = {
							tableClass:           $(tableId).className,
							loadingClass:         $(tableId).className,
							scrollerBorderRight: '1px solid #ababab',
							bufferTimeout:        20000,
							sortAscendImg:        'images/sort_asc.gif',
							sortDescendImg:       'images/sort_desc.gif',
							sortImageWidth:       9,
							sortImageHeight:      5,
							ajaxSortURLParms:     [],
							onRefreshComplete:    null,
							requestParameters:    null,
							inlineStyles:         true,
							registEditMode:	  true
							};
				  Object.extend(this.options, options || {});

				  this.ajaxOptions = {parameters: null};
				  Object.extend(this.ajaxOptions, ajaxOptions || {});

				  this.tableId     = tableId;
				  this.table       = $(tableId);

				  this.addLiveGridHtml();

				  var columnCount  = this.table.rows[0].cells.length;
				  this.metaData    = new Rico.LiveGridMetaData(visibleRows, totalRows, columnCount, options);
				  this.buffer      = new Rico.LiveGridBuffer(this.metaData);

				  var rowCount = this.table.rows.length;
				  this.viewPort =  new Rico.GridViewPort(this.table,
														this.table.offsetHeight/rowCount,
														visibleRows,
														this.buffer, this);
				  this.scroller    = new Rico.LiveGridScroller(this,this.viewPort);
				  this.options.sortHandler = this.sortHandler.bind(this);

				  if ( $(tableId + '_header') )
					 this.sort = new Rico.LiveGridSort(tableId + '_header', this.options)

				  this.processingRequest = null;
				  this.unprocessedRequest = null;

				  this.initAjax(url);
				  if ( this.options.prefetchBuffer || this.options.prefetchOffset > 0) {
					 var offset = 0;
					 if (this.options.offset ) {
						offset = this.options.offset;
						this.scroller.moveScroll(offset);
						this.viewPort.scrollTo(this.scroller.rowToPixel(offset));
					 }
					 if (this.options.sortCol) {
						 this.sortCol = options.sortCol;
						 this.sortDir = options.sortDir;
					 }
					 this.requestContentRefresh(offset);
				  }
			},

  			//GUS
            onPrepareEditMode: function(id) {
				this.editores.process(id,this);
            }
		});
//GUS Para extender la clase de rico dinamic grid

SearchRowsConfigurator = Class.create();
SearchRowsConfigurator.prototype =
{
 initialize: function(liveGrid, viewedRows, objElemento)
 {
  this.liveGrid = liveGrid;
  this.viewedRows = viewedRows;
  //this.totalRowsId = totalRowsId;
  //this.gapId = gapId;
  this.objElemento = objElemento;
 },
 ajaxUpdate: function(ajaxResponse)
 {
  var cell = ajaxResponse.getElementsByTagName("numResults")[0];
  objElemento.setstrTotalRegistros(cell.firstChild.nodeValue - objElemento.getstrGap());
  //$(this.totalRowsId).value = cell.firstChild.nodeValue - $(this.gapId).value;
  var numResults = cell.text != undefined ? cell.text : cell.textContent;

  //si el numero de elementos devuelos es menor que los que se ven-->para que no desaparezca el scroll
  numResults = numResults >= this.viewedRows ? numResults : this.viewedRows+1;
  if ( this.liveGrid.metaData.getTotalRows() != numResults)
  {
   this.liveGrid.metaData.setTotalRows(numResults);
   this.liveGrid.scroller.updateSize();
  }
 }
};

//Objeto Path

findPath = Class.create();
findPath.prototype =
{
 initialize: function(divPathId)
 {
  this.divPathId = divPathId;
 },
 ajaxUpdate: function(ajaxResponse)
 {
  var strPath = "";
  if (ajaxResponse.getElementsByTagName("path")[0].firstChild)
  	strPath = ajaxResponse.getElementsByTagName("path")[0].firstChild.nodeValue;	
  $(this.divPathId).innerHTML = strPath;
 }
};

//sobreescribo metodo refreshContents de Rico.GridViewPort
Object.extend(Rico.GridViewPort.prototype,{
   initialize: function(table, rowHeight, visibleRows, buffer, liveGrid) {
	      this.lastDisplayedStartPos = 0;
	      this.div = table.parentNode;
	      this.table = table
	      this.rowHeight = rowHeight;
	      this.div.style.height = this.rowHeight * visibleRows;
	      this.div.style.overflow = "hidden";
	      this.buffer = buffer;
	      this.liveGrid = liveGrid;
	      this.visibleRows = visibleRows + 1;
	      this.lastPixelOffset = 0;
	      this.startPos = 0;
	      this.columnaClick = 0;
	      this.filaClick = 0;

      //GUS esto es un chapuza pero creo que no hay otra manera de hacerlo
          this.kkkprepare = function(evt){
          					var col = 0;
          					var fil = 0;
          					var elem = Event.element(evt)
          					var elemId=Event.element(evt).id;
          					if(elem.parentNode.tagName == "TD"){
	          					var td = Event.element(evt).parentNode;
	          					var tr = td.parentNode;
	          					this.columnaClick = calcula(td,col);
	          					var tr = td.parentNode;
	          					this.filaClick =calcula(tr,fil) ;
         					}       					
	                         this.liveGrid.onPrepareEditMode(Event.element(evt).id);
	                         Event.stop(evt);

	                        }.bindAsEventListener(this);

   },

   //ZYLK.NET
   sincronizeContents: function() {
   	  var startPos = parseInt(this.lastPixelOffset / this.rowHeight);
      this.isBlank = false;
      var viewPrecedesBuffer = this.buffer.startPos > startPos
      var contentStartPos = viewPrecedesBuffer ? this.buffer.startPos: startPos;
      var contentEndPos = (this.buffer.startPos + this.buffer.size < startPos + this.visibleRows)
                                 ? this.buffer.startPos + this.buffer.size
                                 : startPos + this.visibleRows;
      var rowSize = contentEndPos - contentStartPos;
      var rows = this.buffer.getRows(contentStartPos, rowSize );
      var blankSize = this.visibleRows - rowSize;
      var blankOffset = viewPrecedesBuffer ? 0: rowSize;
      var contentOffset = viewPrecedesBuffer ? blankSize: 0;


      for (var i=0; i < rows.length; i++) {//initialize what we have
        //this.populateRow(this.table.rows[i + contentOffset], rows[i]); //sincronización de las filas
        this.sincronizeRow(this.table.rows[i + contentOffset], rows[i])
      }

   },

   //ZYLK.NET
   sincronizeRow: function(htmlRow, row) {
      for (var j=0; j < row.length; j++) {
      	if(row[j] != htmlRow.cells[j].innerHTML)
      	{
         	row[j] = htmlRow.cells[j].innerHTML;
      	}
      }
   },

   refreshContents: function(startPos) {
      if (startPos == this.lastRowPos && !this.isPartialBlank && !this.isBlank) {
         return;
      }
      if ((startPos + this.visibleRows < this.buffer.startPos)
          || (this.buffer.startPos + this.buffer.size < startPos)
          || (this.buffer.size == 0)) {
         this.clearRows();
         return;
      }
      this.isBlank = false;
      var viewPrecedesBuffer = this.buffer.startPos > startPos
      var contentStartPos = viewPrecedesBuffer ? this.buffer.startPos: startPos;
      var contentEndPos = (this.buffer.startPos + this.buffer.size < startPos + this.visibleRows)
                                 ? this.buffer.startPos + this.buffer.size
                                 : startPos + this.visibleRows;
      var rowSize = contentEndPos - contentStartPos;
      var rows = this.buffer.getRows(contentStartPos, rowSize );
      var blankSize = this.visibleRows - rowSize;
      var blankOffset = viewPrecedesBuffer ? 0: rowSize;
      var contentOffset = viewPrecedesBuffer ? blankSize: 0;

      for (var i=0; i < rows.length; i++) {//initialize what we have
        this.populateRow(this.table.rows[i + contentOffset], rows[i]);
        //GUS Registro de los eventos de edicion en las celdas
        if (this.liveGrid.options.registEditMode == true){
         var edit_row = this.table.rows[i + contentOffset];
	   	 for (var j=0; j < rows[i].length; j++) {
	   	    if (rows[i][j].indexOf("\n") != -1){
	   	 	var temp = rows[i][j].replace(/<span id="[a-zA-Z0-9]*">/gi,"").replace(/<\/span>/gi,"");
	   	 	edit_row.cells[j].firstChild.innerHTML="";
	   	 	edit_row.cells[j].firstChild.appendChild(document.createTextNode(temp));
	   	    }
	   	    try{
	   	    	//Event.stopObserving(edit_row.cells[j],'dblclick',this.kkkprepare);
				/*Event.stopObserving(edit_row.cells[j],'dblclick',function(evt){
	                         this.liveGrid.onPrepareEditMode(Event.element(evt).id);
	                         Event.stop(evt);
	                    }.bindAsEventListener(this));*/
				Event.stopObserving(edit_row.cells[j],this.liveGrid.eventos[j],this.kkkprepare);
	   	    }catch (e) {
	   	    	//do nothing
	   	    }
	   		//Event.observe(edit_row.cells[j],'dblclick',this.kkkprepare);
			/*Event.observe(edit_row.cells[j],'dblclick',function(evt){
	                         this.liveGrid.onPrepareEditMode(Event.element(evt).id);
	                         Event.stop(evt);
	                    }.bindAsEventListener(this));*/
			Event.observe(edit_row.cells[j],this.liveGrid.eventos[j],this.kkkprepare);
      	 }
        }

      }
      for (var i=0; i < blankSize; i++) {// blank out the rest
        this.populateRow(this.table.rows[i + blankOffset], this.buffer.getBlankRow());
      }
      this.isPartialBlank = blankSize > 0;
      this.lastRowPos = startPos;

      this.liveGrid.table.className = this.liveGrid.options.tableClass;
      // Check if user has set a onRefreshComplete function
      var onRefreshComplete = this.liveGrid.options.onRefreshComplete;
      if (onRefreshComplete != null){
          onRefreshComplete();
	  }
   }
});

Ajax.ZkAutocompleter = Class.create();
Object.extend(Object.extend(Ajax.ZkAutocompleter.prototype,Ajax.Autocompleter.prototype),{
    initialize: function(element, update, url,options) {
    this.element     = $(element);
    this.update      = $(update);
    this.hasFocus    = false;
    this.changed     = false;
    this.active      = false;
    this.index       = 0;
    this.entryCount  = 0;

    if (this.setOptions)
      this.setOptions(options);
    else
      this.options = options || {};

    this.options.paramName    = this.options.paramName || this.element.name;
    this.options.tokens       = this.options.tokens || [];
    this.options.frequency    = this.options.frequency || 0.4;
    this.options.minChars     = this.options.minChars || 1;

    this.options.inPlaceEditor = this.options.inPlaceEditor || null;

    this.options.onShow       = this.options.onShow ||


    function(element, update){
      if(!update.style.position || update.style.position=='absolute') {
        update.style.position = 'absolute';
        var offsetH = element.offsetHeight;
        var updateH = parseInt(update.getStyle('height'));
        //alert(updateH + "-" + Position.page(element)[1] + "-" +  element.offsetHeight + "-" + document.body.scrollTop);
        var heightAvail = 0;
        if (self.innerHeight) // all except Explorer
        	heightAvail = self.innerHeight;
        else if (document.documentElement && document.documentElement.clientHeight) // Explorer 6 Strict Mode
        	heightAvail = document.documentElement.clientHeight;
        else if (document.body) // other Explorers
        	heightAvail = document.body.clientHeight;	
        if ((updateH + Position.page(element)[1] + element.offsetHeight) > (heightAvail))
        	offsetH = 0 - updateH;
        Position.clone(element, update, {setHeight: false, offsetTop: offsetH, setWidth:false});
      }
      Effect.Appear(update,{duration:0.15});
    };
    this.options.onHide = this.options.onHide ||
    function(element, update){ new Effect.Fade(update,{duration:0.15}) };

    if (typeof(this.options.tokens) == 'string')
      this.options.tokens = new Array(this.options.tokens);

    this.observer = null;

    this.element.setAttribute('autocomplete','off');

    Element.hide(this.update);

    //Event.observe(this.element, "dblclick", this.onBlur.bindAsEventListener(this));
    Event.observe(this.element, "keypress", this.onKeyPress.bindAsEventListener(this));

    this.options.asynchronous  = true;
    this.options.onComplete    = this.onComplete.bind(this);
    this.options.defaultParams = this.options.parameters || null;
    this.url                   = url;
  },

  onClick: function(event) {
    var element = Event.findElement(event, 'LI');
    this.index = element.autocompleteIndex;
	//alert(element.id);//ISO-8859-1_NumPoblacion
	//alert(this.index); //Indice dentro de la lista devuelta
    this.selectEntry();
    this.hide();

    //envio del formulario a traves del inplace editor si existe
    if(this.options.inPlaceEditor != null){
    	this.options.inPlaceEditor.onSubmit();
    }
  },

  updateChoices: function(choices) {
    if(!this.changed && this.hasFocus) {
	
      this.update.innerHTML = choices;
      Element.cleanWhitespace(this.update);
      Element.cleanWhitespace(this.update.firstChild);

      if(this.update.firstChild && this.update.firstChild.childNodes) {
        this.entryCount = 
          this.update.firstChild.childNodes.length;
        for (var i = 0; i < this.entryCount; i++) {
          var entry = this.getEntry(i);
          entry.autocompleteIndex = i;
          this.addObservers(entry);
        }
      } else { 
        this.entryCount = 0;
      }

      this.stopIndicator();

      this.index = 0;
      this.render();
      //para el IE
      overIE('li');
    }
  }


});

//Sobrecarga del update del Element del prototype para los saltos de linea
Element.update = function(element, html) {
    if (html.stripScripts().indexOf("\n") != -1)
    	$(element).firstChild.nodeValue = html.stripScripts();
    else
    	$(element).innerHTML = html.stripScripts();	
    setTimeout(function() {html.evalScripts()}, 10);
  }


//Joselu: funcion recursiva que calcula la posicion de un nodo hermano 
//parametro nod: nodo actual
//cnt: contador 
//devuelve el lugar que ocupa el nodo entre sus hermanos
function calcula(nod,cnt) {
    if (nod.previousSibling) {
        nod = nod.previousSibling
    	var cnt = cnt +1;
        return calcula(nod,cnt);
    } else {
        return cnt;
    }
} 

