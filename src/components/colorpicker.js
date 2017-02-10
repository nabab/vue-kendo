/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-colorpicker', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="colorpicker" :disabled="disabled ? true : false" :required="required ? true : false">',
    props: {
      cfg: {
        type: Object,
        default: function(){
          return {
            buttons: true,
            clearButton: false,
            tileSize: {
              width: 14,
              height: 14
            },
            palette: null,
            preview: true
          };
        }
      }
    },
    mounted: function(){
      this.widget = $(this.$el).kendoColorPicker(bbn.vue.getOptions()).data("kendoColorPicker");
    }
  });

})(jQuery, bbn, kendo);
