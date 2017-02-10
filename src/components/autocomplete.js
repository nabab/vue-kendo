/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-autocomplete', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="autocomplete" :disabled="disabled ? true : false" :required="required ? true : false">',
    props: {
      animation: {
        type: [Boolean, Object]
      },
      source: {
        type: [String, Object, Array]
      },
      cfg: {
        type: Object,
        default: function(){
          return {
            dataTextField: 'text',
            delay: 200,
            highlightFirst: true
          };
        }
      }
    },
    mounted: function(){
      this.widget = $(this.$el).kendoAutoComplete(this.getOptions()).data("kendoAutoComplete");
    },
    computed: {
      dataSource: function(){
        if ( this.source ){
          return bbn.vue.transformDataSource(this);
        }
        return [];
      }
    },
    watch:{
      source: function(newDataSource){
        this.widget.setDataSource(newDataSource);
      }
    }
  });

})(jQuery, bbn, kendo);
