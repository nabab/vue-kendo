/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  bbn.vue = {
    /**
     * Makes the dataSource variable suitable to be used by the kendo UI widget
     * @param vm Vue object
     * @returns object
     */
    transformDataSource: function(vm){
      var type = typeof(vm.source),
          isArray = $.isArray(vm.source);
      if ( type === 'string' ){
        return new kendo.data.DataSource({
          transport:{
            read: function(e){
              bbn.fn.post(vm.source, e.data, function (d){
                e.success(d);
              });
            }
          }
        });
      }
      else if ( (type === 'object') && !isArray ){
        var tmp = [];
        for ( var n in vm.source ){
          var tmp2 = {};
          tmp2[vm.dataTextField] = vm.source[n];
          tmp2[vm.dataValueField] = n;
          tmp.push(tmp2);
        }
        return tmp;
      }
      else if ( isArray && vm.source.length && (typeof(vm.source[0]) !== 'object') ){
        return $.map(vm.source, function(a){
          var tmp = {};
          tmp[vm.dataTextField] = a;
          tmp[vm.dataValueField] = a;
          return tmp;
        });
      }
      return vm.source;
    },

    /**
     * Supposed to give the data in an appropriate way
     * @todo Remove or do something
     * @param vm Vue object
     * @returns {{}}
     */
    treatData: function(vm){
      var r = {};
      /*
       for ( var n in vm.$options.props ){
       if ( that.$options.props[n].default ){
       r[n] = vm.$options.props[n].default;
       }
       }
       vm.$data = $.extend(r, vm.$options.propsData, vm.$data);
       if ( vm.$data.dataSource ){
       vm.$data.dataSource = transformDataSource(vm.$data.dataSource);
       }
       //bbn.fn.log(vm.$data);
       */
      return vm.$data || {};
    },

    /**
     *
     * @param vm Vue object
     * @returns {{}}
     */
    getOptions: function(vm){
      var r = {};
      if ( vm.$options.props.cfg ){
        $.extend(r, vm.$options.props.cfg.default());
      }
      /*
       for ( var n in vm.$data ){
       r[n] = vm.$data[n];
       }
       for ( var n in vm.$options.propsData ){
       r[n] = vm.$options.propsData[n];
       }
       */
      if ( vm.$options.propsData.cfg ){
        $.extend(r,
          typeof(vm.$options.propsData.cfg) === 'string' ?
            JSON.parse(vm.$options.propsData.cfg) :
            vm.$options.propsData.cfg
        );
      }
      if ( r.source ){
        r.dataSource = vm.dataSource;
        delete r.source;
      }
      if ( r.ivalue ){
        delete r.ivalue;
      }
      if ( r.name ){
        delete r.name;
      }
      bbn.fn.log("getOptions", r, vm);
      return r;
    },

    vueComponent: {
      props: ['value', 'name', 'placeholder', 'required', 'disabled'],
      methods: {
        update: function(val){
          this.$emit('input', val);
        },
        getOptions: function(){
          var vm = this,
              cfg = $.extend(bbn.vue.getOptions(vm), {
                change: function(e){
                  vm.update(e.sender.value());
                  return true;
                }
              });
          return cfg;
        }
      },
      data: function(){
        return {};
      },
      watch:{
        disabled: function(newVal){
          if ( this.widget ){
            this.widget.enable(newVal ? false : true);
          }
          else if ( $(this.$el).is("input") ){
            if ( newVal ){
              $(this.$el).attr("disabled", true).addClass("k-state-disabled");
            }
            else{
              $(this.$el).attr("disabled", false).removeClass("k-state-disabled");
            }
          }
        },
        value: function(newVal, oldVal){
          if ( this.widget && (this.widget.value() !== newVal) ){
            this.widget.value(newVal);
          }
        }
      }
    }
  };

})(jQuery, bbn, kendo);