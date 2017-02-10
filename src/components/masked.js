/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-masked', {
    mixins: [bbn.vue.vueComponent],
    template: '<span>' +
    '<input ref="masked" :disabled="disabled ? true : false" :required="required ? true : false" v-on:keyup="update(widget.raw())">' +
    '<input v-bind:value="value" ref="real_masked" :name="name" :disabled="disabled ? true : false" type="hidden">' +
    '</span>',
    props: {
      mask: {
        type: String
      },
      cfg: {
        type: Object,
        default: function(){
          return {
            promptChar: '_'
          };
        }
      }
    },
    mounted: function(){
      this.widget = $(this.$refs.masked).kendoMaskedTextBox(bbn.vue.getOptions()).data("kendoMaskedTextBox");
    }
  });

})(jQuery, bbn, kendo);
