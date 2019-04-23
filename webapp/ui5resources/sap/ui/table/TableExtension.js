/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","./TableUtils"],function(q,B,T){"use strict";var a=B.extend("sap.ui.table.TableExtension",{_table:null,_type:null,_settings:null,constructor:function(t,s){B.call(this);this._table=t;this._settings=s||{};this._type=a.TABLETYPES.STANDARD;if(T.isInstanceOf(t,"sap/ui/table/TreeTable")){this._type=a.TABLETYPES.TREE;}else if(T.isInstanceOf(t,"sap/ui/table/AnalyticalTable")){this._type=a.TABLETYPES.ANALYTICAL;}var e=this._init(this._table,this._type,this._settings);if(e){var b=this;t["_get"+e]=function(){return b;};}},destroy:function(){this._table=null;this._type=null;B.prototype.destroy.apply(this,arguments);},getInterface:function(){return this;}});a.TABLETYPES={TREE:"TREE",ANALYTICAL:"ANALYTICAL",STANDARD:"STANDARD"};a.prototype.getTable=function(){return this._table;};a.prototype._init=function(t,s,S){return null;};a.prototype._attachEvents=function(){};a.prototype._detachEvents=function(){};a.attachEvents=function(t){if(!t._aExtensions){return;}for(var i=0;i<t._aExtensions.length;i++){t._aExtensions[i]._attachEvents();}};a.detachEvents=function(t){if(!t._aExtensions){return;}for(var i=0;i<t._aExtensions.length;i++){t._aExtensions[i]._detachEvents();}};a.enrich=function(t,E,s){if(!E||!(E.prototype instanceof a)){return null;}var e=new E(t,s);if(!t._aExtensions){t._aExtensions=[];}t._aExtensions.push(e);return e;};a.cleanup=function(t){if(!t._bExtensionsInitialized||!t._aExtensions){return;}for(var i=0;i<t._aExtensions.length;i++){t._aExtensions[i].destroy();}delete t._aExtensions;delete t._bExtensionsInitialized;};return a;});
