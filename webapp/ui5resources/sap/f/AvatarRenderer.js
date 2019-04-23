/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var A={};A.render=function(r,a){var i=a.getInitials(),s=a._getActualDisplayType(),d=a.getDisplaySize(),D=a.getDisplayShape(),I=a.getImageFitType(),c=a.getCustomDisplaySize(),C=a.getCustomFontSize(),S=a.getSrc(),b="sapFAvatar";r.write("<span");r.writeControlData(a);r.addClass(b);r.addClass(b+d);r.addClass(b+s);r.addClass(b+D);if(a.hasListeners("press")){r.addClass("sapMPointer");r.addClass("sapFAvatarFocusable");r.writeAccessibilityState(a,{"role":"button"});r.writeAttribute("tabIndex",0);}if(s===sap.f.AvatarType.Image){r.addClass(b+s+I);r.addStyle("background-image","url('"+jQuery.sap.encodeHTML(S)+"')");}if(d===sap.f.AvatarSize.Custom){r.addStyle("width",c);r.addStyle("height",c);r.addStyle("font-size",C);}r.writeClasses();r.writeStyles();r.write(">");if(s===sap.f.AvatarType.Icon){r.renderControl(a._getIcon());}else if(s===sap.f.AvatarType.Initials){r.write("<span");r.addClass(b+"InitialsHolder");r.writeClasses();r.write(">");r.writeEscaped(i);r.write("</span>");}if(a._fnLightBoxOpen){r.write("<span class=\"sapFAvatarMagnifyingGlass\"></span>");}r.write("</span>");};return A;},true);
