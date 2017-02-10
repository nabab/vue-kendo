/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  var ui = kendo.ui;

  if ( kendo.ui.Editor ){
    kendo.ui.Editor.fn.options.encoded = false;
    kendo.ui.Editor.fn.options.tools = [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "justifyFull",
      "insertUnorderedList",
      "insertOrderedList",
      "indent",
      "outdent",
      "createLink",
      "unlink",
      "insertImage",
      "subscript",
      "superscript",
      "createTable",
      "addRowAbove",
      "addRowBelow",
      "addColumnLeft",
      "addColumnRight",
      "deleteRow",
      "deleteColumn",
      "viewHtml",
      "formatting",
      "fontName",
      "fontSize",
      "foreColor",
      "backColor"
    ];
  }

  kendo.ui.DropDownList.prototype.options.autoWidth = true;

  var dropDownTreeView = ui.Widget.extend({
    _uid: null,
    _selId: null,
    _treeview: null,
    _dropdown: null,

    init: function(element, options){
      var that = this,
          isInput = bbn.fn.tagName(element) === "input";

      ui.Widget.fn.init.call(that, element, options);

      that._uid = new Date().getTime();

      var classes = $(element).attr("class"),
          of = $(element).css("overflow"),
          mh = $(element).css("max-height"),
          of = $(element).css("overflow"),
          w = $(element).width() - 24,
          additionalStyle = "",
          container = $(element);

      if ( of && mh ){
        additionalStyle = kendo.format("max-height:{0};overflow:{1};", mh, of);
      }
      if ( w ){
        additionalStyle += kendo.format("width:{0};", w);
      }
      if ( isInput ){
        container = $(kendo.format('<div class="{0}" style="{1}"/>', classes, additionalStyle));
        $(element).hide().after(container);
      }
      var treeID = 'extTreeView' + that._uid;
      container.append(kendo.format("<input id='extDropDown{0}' class='k-ext-dropdown {1}'/>", that._uid, classes));
      container.append(kendo.format("<div id='{0}' class='k-ext-treeview' style='z-index:1;{1}'/>", treeID, additionalStyle));

      var $treeviewRootElem,
          $dropdownRootElem,
          ds = [];
      if ( inputVal ){
        ds.push({
          text: inputVal,
          value: inputVal
        });
      }

      var ddCfg = {
        dataSource: [],
        dataTextField: "text",
        dataValueField: "value",
        open: function(e){
          //to prevent the dropdown from opening or closing. A bug was found when clicking on the dropdown to
          //"close" it. The default dropdown was visible after the treeview had closed.
          e.preventDefault();
          // If the treeview is not visible, then make it visible.
          if ( !$treeviewRootElem.hasClass("k-custom-visible") ){
            // Position the treeview so that it is below the dropdown.
            $treeviewRootElem.css({
              "top": $dropdownRootElem.position().top + $dropdownRootElem.height(),
              "left": $dropdownRootElem.position().left
            });
            // Display the treeview.
            $treeviewRootElem.slideToggle("fast", function(){
              that._dropdown.close();
              $treeviewRootElem.addClass("k-custom-visible");
            });
          }
          if ( that._selId ){
            that._treeview.expandTo(that._selId);
            var ddVal = $dropdownRootElem.find("span.k-input").text();
            var selectedNode = that._treeview.findByText(ddVal);
            that._treeview.select(selectedNode);
          }
          var list = $("#" + treeID);
          var width = list.width();
          list.width("auto");
          var width2 = list.width();
          var width3 = $dropdownRootElem.width() + 22;
          if ( width3 > width2 ){
            list.width(width3);
          }
          else if ( width2 > width ){
            list.css({width: width2});
          }
          else{
            list.width(width);
          }
        }
      };
      if ( options.optionLabel ){
        ddCfg.optionLabel = options.optionLabel;
      }
      if ( options.change ){
        ddCfg.change = options.change;
      }
      if ( options.select ){
        ddCfg.select = options.select;
      }

      // Create the dropdown.
      that._dropdown = $(kendo.format("#extDropDown{0}", that._uid)).kendoDropDownList(ddCfg).data("kendoDropDownList");

      if ( options.dropDownWidth ){
        that._dropdown._inputWrapper.width(options.dropDownWidth);
      }
      else if ( w ){
        that._dropdown._inputWrapper.css({width: w}).parent().css({width: w});
      }

      $dropdownRootElem = $(that._dropdown.element).closest("span.k-dropdown"); // Create the treeview.
      that._treeview = $(kendo.format("#extTreeView{0}", that._uid)).kendoTreeView(options.treeview).data("kendoTreeView");
      that._treeview.bind("select", function(e){
        //bbn.fn.log("SELECT", e);
        // When a node is selected, display the text for the node in the dropdown and hide the treeview.
        $dropdownRootElem.find("span.k-input").text($(e.node).children("div").text());
        $treeviewRootElem.slideToggle("fast", function(){
          that._selId = $("#extTreeView" + that._uid).data("kendoTreeView").dataItem(e.node).id;
          $treeviewRootElem.removeClass("k-custom-visible");
          that.trigger("select", e);
        });
      });

      $treeviewRootElem = $(that._treeview.element).closest("div.k-treeview"); // Hide the treeview.
      $treeviewRootElem
        .width($dropdownRootElem.width() - 2)
        .css({
          "border": "1px solid #ccc",
          "display": "none",
          "position": "absolute",
          "background-color": that._dropdown.list.css("background-color")
        });
      var inputVal = that.element.val();
      if ( inputVal ){
        that.value(inputVal);
      }
      $(document).click(function(e){
        // Ignore clicks on the treetriew.
        if ( $(e.target).closest("div.k-treeview").length === 0 ){
          // If visible, then close the treeview.
          if ( $treeviewRootElem.hasClass("k-custom-visible") ){
            $treeviewRootElem.slideToggle("fast", function(){
              $treeviewRootElem.removeClass("k-custom-visible");
            });
          }
        }
      });
    },

    value: function (value ){
      if ( value !== undefined ){
        var that = this,
            dataItem = that._treeview.dataSource.get(value),
            item = that._treeview.findByUid(dataItem.uid),
            $dropdownRootElem = $(that._dropdown.element).closest("span.k-dropdown");
        that._dropdown.value(value);
        $dropdownRootElem.find("span.k-input").text($(item).children("div").text());
        that._selId = value;
        return this.element.val(value);
      }
      else{
        return this.element.val();
      }
    },

    dropDownList: function(){
      return this._dropdown;
    },

    treeview: function(){
      return this._treeview;
    },

    options: {
      name: "DropDownTreeView"
    }
  });
  ui.plugin(dropDownTreeView);

  var MaskedDatePicker = ui.Widget.extend({
    init: function (element, options) {
      var that = this;
      ui.Widget.fn.init.call(this, element, options);

      $(element).kendoMaskedTextBox({ mask: that.options.dateOptions.mask || "00/00/0000" })
        .kendoDatePicker({
          format: that.options.dateOptions.format || "dd/MM/yyyy",
          parseFormats: that.options.dateOptions.parseFormats || ["yyyy-MM-dd", "dd/MM/yyyy"]
        })
        .closest(".k-datepicker")
        .add(element)
        .removeClass("k-textbox");

      that.element.data("kendoDatePicker").bind("change", function() {
        that.trigger('change');
      });
    },
    options: {
      name: "MaskedDatePicker",
      dateOptions: {}
    },
    events: [
      'change'
    ],
    destroy: function () {
      var that = this;
      ui.Widget.fn.destroy.call(that);

      kendo.destroy(that.element);
    },
    value: function(value) {
      var datepicker = this.element.data("kendoDatePicker");

      if (value === undefined) {
        return datepicker.value();
      }

      datepicker.value(value);
    }
  });
  ui.plugin(MaskedDatePicker);

  var MaskedDateTimePicker = ui.Widget.extend({
    init: function (element, options) {
      var that = this;
      ui.Widget.fn.init.call(this, element, options);

      $(element).kendoMaskedTextBox({ mask: that.options.dateOptions.mask || "00/00/0000 00:00" })
        .kendoDateTimePicker({
          format: that.options.dateOptions.format || "dd/MM/yyyy HH:mm",
          parseFormats: that.options.dateOptions.parseFormats || ["yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy HH:mm"]
        })
        .closest(".k-datetimepicker")
        .add(element)
        .removeClass("k-textbox");

      that.element.data("kendoDateTimePicker").bind("change", function() {
        that.trigger('change');
      });
    },
    options: {
      name: "MaskedDateTimePicker",
      dateOptions: {}
    },
    events: [
      'change'
    ],
    destroy: function () {
      var that = this;
      ui.Widget.fn.destroy.call(that);

      kendo.destroy(that.element);
    },
    value: function(value) {
      var datetimepicker = this.element.data("kendoDateTimePicker");

      if (value === undefined) {
        return datetimepicker.value();
      }

      datetimepicker.value(value);
    }
  });
  ui.plugin(MaskedDateTimePicker);

  var MaskedTimePicker = ui.Widget.extend({
    init: function (element, options) {
      var that = this;
      ui.Widget.fn.init.call(this, element, options);

      $(element).kendoMaskedTextBox({ mask: that.options.dateOptions.mask || "00:00" })
        .kendoTimePicker({
          format: that.options.dateOptions.format || "HH:mm",
          parseFormats: that.options.dateOptions.parseFormats || ["HH:mm:ss", "HH:mm"]
        })
        .closest(".k-timepicker")
        .add(element)
        .removeClass("k-textbox");

      that.element.data("kendoTimePicker").bind("change", function() {
        that.trigger('change');
      });
    },
    options: {
      name: "MaskedTimePicker",
      dateOptions: {}
    },
    events: [
      'change'
    ],
    destroy: function () {
      var that = this;
      ui.Widget.fn.destroy.call(that);

      kendo.destroy(that.element);
    },
    value: function(value) {
      var timepicker = this.element.data("kendoTimePicker");

      if (value === undefined) {
        return timepicker.value();
      }

      timepicker.value(value);
    }
  });
  ui.plugin(MaskedTimePicker);

})(jQuery, bbn, kendo);