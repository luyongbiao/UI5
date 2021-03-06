/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.m.SuggestionsList.
sap.ui.define(['./library'],
	function(library) {
		"use strict";

		//
		// SuggestionsList has to be used exclusively by Suggest.js
		//
		var SuggestionsList = sap.ui.core.Control.extend("sap.m.SuggestionsList", {

			metadata: {

				library: "sap.m",
				properties: {
					width: { type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue: "auto" },
					maxWidth: { type: "sap.ui.core.CSSSize", group: "Dimension", defaultValue: "100%" }
				},
				associations: {
					parentInput: { type: "sap.ui.core.Control", multiple: false, singularName: "parentInput" },
					ariaLabelledBy: { type: "sap.ui.core.Control", multiple: true, singularName: "ariaLabelledBy" }
				}
			},

			renderer: {
				render: function(oRm, oList) {
					oRm.write("<ul");
					oRm.writeControlData(oList);
					oRm.addClass("sapMSuL");
					oRm.addClass("sapMSelectList");
					oRm.writeClasses();
					oRm.writeAccessibilityState({
						role: "listbox",
						"multiselectable": "false"
					});
					oRm.addStyle("width", oList.getWidth());
					oRm.addStyle("max-width", oList.getMaxWidth());
					oRm.writeStyles();
					oRm.write(">");

					this.renderItems(oRm, oList);

					oRm.write("</ul>");
				},

				renderItems: function(oRm, oList) {
					var searchValue;
					var selectedIndex = oList.getSelectedItemIndex();
					try {
						searchValue = sap.ui.getCore().byId(oList.getParentInput()).getValue();
					} catch (e) {
						searchValue = "";
					}
					oList.getItems().forEach(function(item, index) {
						item.render(oRm, item, searchValue, index === selectedIndex);
					});
				}
			}
		});

		SuggestionsList.prototype.init = function() {
			this._iSelectedItem = -1;
		};

		SuggestionsList.prototype.onBeforeRendering = function() {
			this.$().off();
		};

		SuggestionsList.prototype.onAfterRendering = function() {
			// only on desktop: prevent blur of the search field
			this.$().on("mousedown", function(event){
				event.preventDefault();
			});
		};

		SuggestionsList.prototype.getItems = function(){
			try {
				return sap.ui.getCore().byId(this.getParentInput()).getSuggestionItems();
			} catch (e) {
				return [];
			}
		};

		// Update DOM in place
		SuggestionsList.prototype.update = function(){
			var rm;
			var domRef = this.getDomRef();
			if (domRef) {
				rm = sap.ui.getCore().createRenderManager();
				this.getRenderer().renderItems(rm, this);
				rm.flush(domRef);
				rm.destroy();
			}
			return this;
		};

		// select an item to highlight it visually by keyboard navigation
		SuggestionsList.prototype.selectByIndex = function(iIndex, bRelative){

			var items = this.getItems();
			var index;
			var item;
			var itemId;
			var parentInput = sap.ui.getCore().byId(this.getParentInput());
			var descendantAttr = "aria-activedecendant";

			// selectByIndex(null || undefined || -1) -> remove selection
			if (isNaN(parseInt(iIndex, 10))) {
				iIndex = -1;
				bRelative = false;
			}

			if ((!items.length) || (bRelative && iIndex === 0) || (!bRelative && iIndex < 0)) {
				index = -1;
			} else {
				if (bRelative) {
					if (this._iSelectedItem < 0) {
						index = (iIndex < 0 ? items.length : -1) + iIndex;
					} else {
						index = this._iSelectedItem + iIndex;
					}
				} else {
					index = iIndex;
				}
				index = Math.min(Math.max(index, 0), items.length - 1);
			}
			this._iSelectedItem = index;

			// Highlight the selected item.
			if (items.length) {
				this.$().children("li")
					.removeClass("sapMSelectListItemBaseSelected")
					.attr("aria-selected", "false")
					.eq(index)
					.addClass("sapMSelectListItemBaseSelected")
					.attr("aria-selected", "true");
			}
			// set aria-activedescendant attribute in the input itself:
			if (parentInput) {
				if (index >= 0) {
					item = parentInput.getSuggestionItems()[index];
					itemId = item && item.getId();
				}
				if (itemId) {
					parentInput.$("I").attr(descendantAttr, itemId);
				} else {
					parentInput.$("I").removeAttr(descendantAttr);
				}
			}

			return this._iSelectedItem;
		};

		SuggestionsList.prototype.getSelectedItemIndex = function(){
			return this._iSelectedItem;
		};

		return SuggestionsList;

	}, /* bExport= */ true);