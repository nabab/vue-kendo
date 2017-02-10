/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  /**
   * Classic input with normalized appearance
   */
  Vue.component('bbn-input', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="input" class="k-textbox" v-on:input="update($event.target.value)" :disabled="disabled ? true : false" :required="required ? true : false">',
    props: {
      type: {
        type: String,
      }
    },
    mounted: function(){
      if ( this.disabled ){
        $(this.$el).addClass("k-state-disabled");
      }
    }
  });

})(jQuery, bbn, kendo);
