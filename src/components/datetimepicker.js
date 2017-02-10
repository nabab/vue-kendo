/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-datetimepicker', {
    mixins: [bbn.vue.vueComponent],
    template: '<span>' +
    '<input v-bind:value="ivalue" ref="datetimepicker" :disabled="disabled ? true : false" :required="required ? true : false" :placeholder="placeholder">' +
    '<input v-bind:value="value" ref="idatetimepicker" :name="name" :disabled="disabled ? true : false" type="hidden">' +
    '</span>',
    props: {
      cfg: {
        type: Object,
        default: function(){
          return {
            format: 'dd/MM/yyyy HH:mm',
            parseFormats: ['yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy HH:mm'],
            mask: '00/00/0000 00:00'
          }
        }
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
        return kendo.toString(kendo.parseDate(this.value, "yyyy-MM-dd HH:mm:ss"), "dd/MM/yyyy HH:mm");
      }
    },
    mounted: function(){
      var vm = this;
      vm.widget = $(this.$refs.datetimepicker)
        .kendoMaskedDateTimePicker($.extend(vm.bbn.vue.getOptions(), {
          change: function(e){
            vm.update(kendo.toString(vm.widget.value(), "yyyy-MM-dd HH:mm:ss"));
            return true;
          }
        }))
        .data("kendoDateTimePicker");
    }
  });

})(jQuery, bbn, kendo);
