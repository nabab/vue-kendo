/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-timepicker', {
    mixins: [bbn.vue.vueComponent],
    template: '<span>' +
    '<input v-bind:value="ivalue" ref="timepicker" :disabled="disabled ? true : false" :required="required ? true : false" :placeholder="placeholder">' +
    '<input v-bind:value="value" ref="itimepicker" :name="name" :disabled="disabled ? true : false" type="hidden">' +
    '</span>',
    props: {
      cfg: {
        type: Object,
        default: function(){
          return {
            format: 'HH:mm',
            parseFormats: ['HH:mm:ss', 'HH:mm'],
            mask: '00:00'
          }
        }
      },
      format: {
        type: String
      },
      mask: {
        type: String
      },
      max: {
        type: [Date, String]
      },
      min: {
        type: [Date, String]
      },
      culture: {
        type: String
      },
      dates: {
        type: Array
      },
      depth: {
        type: String
      },
      disableDates: {
        type: [Array, Function]
      },
    },
    computed: {
      ivalue: function(){
        bbn.fn.log("VALUE IS ", this.value, kendo.parseDate(this.value));
        return kendo.toString(kendo.parseDate(this.value, "HH:mm:ss"), "HH:mm");
      }
    },
    mounted: function(){
      var vm = this;
      vm.widget = $(this.$refs.timepicker)
        .kendoMaskedTimePicker($.extend(vm.bbn.vue.getOptions(), {
          change: function(e){
            vm.update(kendo.toString(vm.widget.value(), "HH:mm:ss"));
            return true;
          }
        }))
        .data("kendoTimePicker");
    }
  });

})(jQuery, bbn, kendo);
