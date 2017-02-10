/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  Vue.component('bbn-dropdown', {
    mixins: [bbn.vue.vueComponent],
    template: '<input v-bind:value="value" :name="name" ref="dropdown">',
    props: {
      source: {
        type: [String, Array, Object]
      },
      cfg: {
        type: Object,
        default: function(){
          return {
            dataTextField: 'text',
            dataValueField: 'value',
            dataSource: []
          };
        }
      }
    },
    mounted: function(){
      var vm = this,
          cfg = vm.bbn.vue.getOptions();
      if ( vm.disabled ){
        cfg.enable = false;
      }
      vm.widget = $(vm.$el).kendoDropDownList(cfg).data("kendoDropDownList");
      if ( !cfg.optionLabel && cfg.dataSource.length && !vm.value ){
        vm.widget.select(0);
        vm.widget.trigger("change");
      }
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
