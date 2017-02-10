/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-combo', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="combo" :disabled="disabled ? true : false" :required="required ? true : false">',
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
            dataValueField: 'value',
            delay: 200,
            highlightFirst: true
          };
        }
      }
    },
    mounted: function(){
      this.widget = $(this.$el).kendoComboBox(bbn.vue.getOptions()).data("kendoComboBox");
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
        this.widget.setDataSource(this.dataSource);
      }
    }
  });

})(jQuery, bbn, kendo);
