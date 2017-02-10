/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-numeric', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="input" type="number" :disabled="disabled ? true : false" :required="required ? true : false">',
    props: {
      decimals: {
        type: [Number, String]
      },
      format: {
        type: String
      },
      max: {
        type: [Number, String]
      },
      min: {
        type: [Number, String]
      },
      round: {
        type: Boolean
      },
      step: {
        type: [Number, String]
      },
      cfg: {
        type: Object,
        default: function(){
          return {
            format: "n0"
          };
        }
      }
    },
    mounted: function(){
      var vm = this;
      vm.widget = $(vm.$el).kendoNumericTextBox($.extend(vm.bbn.vue.getOptions(), {
        spin: function(e){
          vm.$emit('input', e.sender.value());
        }
      })).data("kendoNumericTextBox");
    }
  });

})(jQuery, bbn, kendo);
