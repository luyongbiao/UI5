/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/core/routing/History','sap/ui/core/routing/Router','./TargetHandler','./Router'],function(q,B,H,R,T,M){"use strict";var a=B.extend("sap.m.routing.RouteMatchedHandler",{constructor:function(r,c){if(r instanceof M){q.sap.log.warning("A sap.m.routing.Router is used together with an sap.m.routing.RouteMatchedHandler (deprecated)."+"The RoutematchedHandler is not taking over triggering the navigations, the Router will do it.",this);return;}this._oTargetHandler=new T(c);r._oTargetHandler=this._oTargetHandler;r.attachRouteMatched(this._onHandleRouteMatched,this);r.attachRoutePatternMatched(this._handleRoutePatternMatched,this);this._oTargets=r.getTargets();if(this._oTargets){this._oTargets.attachDisplay(this._onHandleDisplay,this);}this._oRouter=r;}});a.prototype.destroy=function(){if(this._oRouter){this._oRouter.detachRouteMatched(this._onHandleRouteMatched,this);this._oRouter.detachRoutePatternMatched(this._handleRoutePatternMatched,this);this._oRouter=null;}if(this._oTargets){this._oTargets.detachDisplay(this._onHandleRouteMatched,this);this._oTargets=null;}return this;};a.prototype.setCloseDialogs=function(c){this._oTargetHandler.setCloseDialogs(c);return this;};a.prototype.getCloseDialogs=function(){return this._oTargetHandler.getCloseDialogs();};a.prototype._handleRoutePatternMatched=function(e){var t=+e.getParameter("config").viewLevel;this._oTargetHandler.navigate({viewLevel:t,navigationIdentifier:e.getParameter("name"),askHistory:true});};a.prototype._onHandleRouteMatched=function(e){var p=e.getParameters(),c=p.config;if(!this._oRouter.getRoute(p.name)._oTarget){return;}this._oTargetHandler.addNavigation({targetControl:p.targetControl,eventData:p.arguments,view:p.view,navigationIdentifier:p.name,transition:c.transition,transitionParameters:c.transitionParameters,preservePageInSplitContainer:c.preservePageInSplitContainer});};a.prototype._onHandleDisplay=function(e){var p=e.getParameters(),c=p.config;this._oTargetHandler.addNavigation({targetControl:p.control,eventData:p.data,view:p.view,navigationIdentifier:p.name,transition:c.transition,transitionParameters:c.transitionParameters,preservePageInSplitContainer:c.preservePageInSplitContainer});};return a;},true);
