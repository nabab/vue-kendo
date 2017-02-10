/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-form', {
    template: '<form :action="action" :disabled="disabled" :method="method"><slot></slot></form>',
    props: {
      disabled: {},
      script: {},
      action: {
        type: String,
        default: '.'
      },
      method: {
        type: String,
        default: 'post'
      },
    },
    mounted: function(){
      if ( this.$options.propsData.script ){
        $(this.$el).data("script", this.$options.propsData.script);
      }
    }
  });

})(jQuery, bbn, kendo);