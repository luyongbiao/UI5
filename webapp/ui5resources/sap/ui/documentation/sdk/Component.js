/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/UIComponent","sap/ui/Device","sap/ui/documentation/sdk/model/models","sap/ui/documentation/sdk/controller/ErrorHandler","sap/ui/model/json/JSONModel","sap/ui/documentation/sdk/util/DocumentationRouter","sap/ui/documentation/sdk/controller/util/ConfigUtil","sap/ui/documentation/sdk/controller/util/APIInfo","sap/m/ColumnListItem"],function(q,U,D,m,E,J,a,C,A,b){"use strict";var t=[],l={},T=1000000;return U.extend("sap.ui.documentation.sdk.Component",{metadata:{manifest:"json",includes:["css/style.css","thirdparty/google-code-prettify/prettify.css","thirdparty/google-code-prettify/prettify.js","thirdparty/google-code-prettify/lang-css.js"]},init:function(){this._modelsPromise=null;this._oErrorHandler=new E(this);this.setModel(m.createDeviceModel(),"device");this.setModel(new J(),"treeData");this.setModel(new J(),"libsData");this.setModel(new J(),"versionData");U.prototype.init.apply(this,arguments);this.getRouter().initialize();if(D.system.desktop){this.loadVersionInfo().then(this.fetchAPIInfoAndBindModels.bind(this));}sap.m.TablePopin.prototype.onfocusin=function(){};},destroy:function(){this._oErrorHandler.destroy();this._oConfigUtil.destroy();this._oConfigUtil=null;U.prototype.destroy.apply(this,arguments);},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(q(document.body).hasClass("sapUiSizeCozy")||q(document.body).hasClass("sapUiSizeCompact")){this._sContentDensityClass="";}this._sContentDensityClass="sapUiSizeCompact";}return this._sContentDensityClass;},getConfigUtil:function(){if(!this._oConfigUtil){this._oConfigUtil=new C(this);}return this._oConfigUtil;},loadVersionInfo:function(){if(!this._oVersionInfoPromise){this._oVersionInfoPromise=sap.ui.getVersionInfo({async:true}).then(this._bindVersionModel.bind(this));}return this._oVersionInfoPromise;},fetchAPIInfoAndBindModels:function(){var v=this.getModel("versionData"),i=v.getProperty("/isInternal"),L=v.getProperty("/libraries");if(this._modelsPromise){return this._modelsPromise;}this._modelsPromise=new Promise(function(r){A.getAllLibrariesElementsJSONPromise(L).then(function(c){c.forEach(this._parseLibraryElements,this);if(t.length>0){t.push({isSelected:false,name:"experimental",ref:"#/api/experimental",text:"Experimental APIs"},{isSelected:false,name:"deprecated",ref:"#/api/deprecated",text:"Deprecated APIs"});}this._addDeprecatedAndExperimentalData(l,i);this._bindAllLibsModel(l);this._bindTreeModel(t);r();}.bind(this));}.bind(this));return this._modelsPromise;},_parseLibraryElements:function(L){for(var i=0;i<L.length;i++){if(!L[i].children){l[L[i].name]=L[i];}this._addElementToTreeData(L[i]);if(L[i].children){this._parseLibraryElements(L[i].children,true);}}},_addElementToTreeData:function(j){if(["public","protected"].indexOf(j.visibility)!==-1){if(j.kind!=="namespace"){var o=this._createTreeNode(j.basename,j.name,j.name===this._topicId);var n=j.name.substring(0,(j.name.indexOf(j.basename)-1));var e=this._findNodeNamespaceInTreeStructure(n);if(e){if(!e.nodes){e.nodes=[];}e.nodes.push(o);}else{var N=this._createTreeNode(n,n,n===this._topicId);N.nodes=[];N.nodes.push(o);t.push(N);this._removeDuplicatedNodeFromTree(n);}}else{var N=this._createTreeNode(j.name,j.name,j.name===this._topicId);t.push(N);}}},_createTreeNode:function(c,n,i){var o={};o.text=c;o.name=n;o.ref="#/api/"+n;o.isSelected=i;return o;},_findNodeNamespaceInTreeStructure:function(n,c){c=c||t;for(var i=0;i<c.length;i++){var o=c[i];if(o.name===n){return o;}if(o.nodes){var d=this._findNodeNamespaceInTreeStructure(n,o.nodes);if(d){return d;}}}},_removeNodeFromNamespace:function(n,N){for(var i=0;i<N.nodes.length;i++){if(N.nodes[i].text===n){N.nodes.splice(i,1);return;}}},_removeDuplicatedNodeFromTree:function(n){if(l[n]){var N=n.substring(0,n.lastIndexOf("."));var o=this._findNodeNamespaceInTreeStructure(N);var s=n.substring(n.lastIndexOf(".")+1,n.lenght);this._removeNodeFromNamespace(s,o);}},_bindAllLibsModel:function(o){var L=this.getModel("libsData");L.setSizeLimit(T);L.setData(o,false);},_bindTreeModel:function(t){var c=this.getModel("treeData");c.setSizeLimit(T);c.setData(t,false);},_bindVersionModel:function(v){var V,o;if(!v){return;}V=v.version;o={versionGav:v.gav,version:q.sap.Version(sap.ui.version).getMajor()+"."+q.sap.Version(sap.ui.version).getMinor(),fullVersion:sap.ui.version,isOpenUI5:v&&v.gav&&/openui5/i.test(v.gav),isSnapshotVersion:v&&v.gav&&/snapshot/i.test(v.gav),isDevVersion:V.indexOf("SNAPSHOT")>-1||(V.split(".").length>1&&parseInt(V.split(".")[1],10)%2===1),isInternal:/internal/i.test(v.name),libraries:v.libraries};this.getModel("versionData").setData(o,false);},_addDeprecatedAndExperimentalData:function(l,i){var w="Without Version";l.deprecated={noVersion:{name:w,apis:[]}};l.experimental={noVersion:{name:w,apis:[]}};function c(o,e,O,s){var f={control:s,entityName:e.name,text:e[o].text||e.description,type:O,"static":!!e.static,visibility:e.visibility};if(e[o].since){var S=e[o].since.split(".");var v=S[0]+"."+S[1];f.since=e[o].since;if(!l[o][v]){l[o][v]={name:v,apis:[]};}l[o][v].apis.push(f);}else{l[o].noVersion.apis.push(f);}}function d(M){return M.visibility==="restricted";}Object.keys(l).forEach(function(L){var s=l[L];s.methods&&s.methods.forEach(function(M){var I=d(M);if(I&&!i){return;}if(M.deprecated){c("deprecated",M,"methods",s.name);}if(M.experimental){c("experimental",M,"methods",s.name);}});s.events&&s.events.forEach(function(e){if(e.deprecated){c("deprecated",e,"events",s.name);}if(e.experimental){c("experimental",e,"events",s.name);}});});}});});