/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/core/ComponentContainer","sap/ui/documentation/sdk/controller/util/ControlsInfo","sap/ui/documentation/sdk/util/ToggleFullScreenHandler","sap/m/Text","sap/ui/core/HTML","sap/ui/Device","sap/ui/core/routing/History"],function(B,J,C,a,T,b,H,D,c){"use strict";return B.extend("sap.ui.documentation.sdk.controller.Sample",{onInit:function(){this.getRouter().getRoute("sample").attachPatternMatched(this._onSampleMatched,this);this._viewModel=new J({showNavButton:true,showNewTab:false});Promise.all([sap.ui.getCore().loadLibrary("sap.ui.fl",{async:true}),sap.ui.getCore().loadLibrary("sap.ui.rta",{async:true})]).then(this._loadRTA.bind(this));this.getView().setModel(this._viewModel);},_onSampleMatched:function(e){this._sId=e.getParameter("arguments").id;a.loadData().then(function(d){this._loadSample(d);}.bind(this));},_loadSample:function(d){var s=d.samples[this._sId],o;if(!s){return;}var p=this.getView().byId("page");var h=c.getInstance();var P=h.getPreviousHash();var m=this._viewModel.getData();m.showNavButton=D.system.phone||!!P;m.previousSampleId=s.previousSampleId;m.nextSampleId=s.nextSampleId;p.setTitle("Sample: "+s.name);try{o=this._createComponent();}catch(e){p.removeAllContent();p.addContent(new b({text:"Error while loading the sample: "+e}));return;}this.getOwnerComponent()._oCurrentOpenedSample=o?o:undefined;var f=(this._oComp.getMetadata())?this._oComp.getMetadata().getConfig():null;var S=f&&f.sample||{};m.showNewTab=!!S.iframe;if(S.iframe){o=this._createIframe(o,S.iframe);}else{this.sIFrameUrl=null;}var g=!!S.stretch;var i=g?"100%":null;p.setEnableScrolling(!g);if(o.setHeight){o.setHeight(i);}p.removeAllContent();p.addContent(o);p.scrollTo(0);this._viewModel.setData(m);},onNewTab:function(){sap.m.URLHelper.redirect(this.sIFrameUrl,true);},onPreviousSample:function(e){this.getRouter().navTo("sample",{id:this._viewModel.getProperty("/previousSampleId")},true);},onNextSample:function(e){this.getRouter().navTo("sample",{id:this._viewModel.getProperty("/nextSampleId")},true);},_createIframe:function(i,I){var s=this._sId,r=/\/([^\/]*)$/,d=/\..+$/,f,F,e;if(typeof I==="string"){f=r.exec(I);F=(f&&f.length>1?f[1]:I);e=d.exec(F)[0];var g=I.replace(d,"");this.sIFrameUrl=jQuery.sap.getModulePath(s+"."+g,e||".html");}else{jQuery.sap.log.error("no iframe source was provided");return;}if(!this._oHtmlControl){this._oHtmlControl=new H({id:"sampleFrame",content:'<iframe src="'+this.sIFrameUrl+'" id="sampleFrame" frameBorder="0"></iframe>'}).addEventDelegate({onAfterRendering:function(){if(!this._oHtmlControl._jQueryHTMLControlLoadEventAttached){this._oHtmlControl.$().on("load",function(){var S=this._oHtmlControl.$()[0].contentWindow;S.sap.ui.getCore().attachInit(function(){var h=this.getRootView().hasStyleClass("sapUiSizeCompact");S.sap.ui.getCore().applyTheme(this._oCore.getConfiguration().getTheme());S.sap.ui.getCore().getConfiguration().setRTL(this._oCore.getConfiguration().getRTL());S.jQuery('body').toggleClass("sapUiSizeCompact",h).toggleClass("sapUiSizeCozy",h);}.bind(this));}.bind(this));this._oHtmlControl._jQueryHTMLControlLoadEventAttached=true;}}.bind(this)});}else{this._oHtmlControl.getDomRef().src=this.sIFrameUrl;}return this._oHtmlControl;},_createComponent:function(){var s='sampleComp-'+this._sId;var d=this._sId;this._oComp=sap.ui.component(s);if(this._oComp){this._oComp.destroy();}this._oComp=sap.ui.getCore().createComponent({id:s,name:d});return new C({component:this._oComp});},onNavBack:function(e){this.getRouter().myNavBack("home",{});},onNavToCode:function(e){this.getRouter().navTo("code",{id:this._sId},false);},onToggleFullScreen:function(e){T.updateMode(e,this.getView(),this);},_oRTA:null,_loadRTA:function(){sap.ui.require(["sap/ui/fl/Utils","sap/ui/fl/FakeLrepConnectorLocalStorage"],function(U,F){U.checkControlId=function(){return true;};F.enableFakeConnector({"isProductiveSystem":true});this.getView().byId("toggleRTA").setVisible(true);this.getRouter().attachRouteMatched(function(){if(this._oRTA){this._oRTA.destroy();this._oRTA=null;}},this);}.bind(this));},onToggleAdaptationMode:function(e){sap.ui.require(["sap/ui/rta/RuntimeAuthoring"],function(R){if(!this._oRTA){this._oRTA=new R({flexSettings:{developerMode:false}});this._oRTA.setRootControl(this.getView().byId("page").getContent()[0]);this._oRTA.start();}}.bind(this));}});});