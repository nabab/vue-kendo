/**
 * Created by BBN on 10/02/2017.
 */
;(function($, bbn, kendo){
  "use strict";

  /**
   * Widget configuration editor
   * Lets visualize the whole configuration of a widget in a JSON editor field
   */
  Vue.component('bbn-config-editor', {
    template: '<input v-bind:value="value" type="hidden">',
    props: {
      value: {
        type: String
      },
      target: {
        type: [jQuery, String]
      },
      type: {
        type: String
      }
    },
    mounted: function(){
      var v = this;
      v.backup = {};
      if ( $(v.target).length ){
        v.widget = $(v.target).data(v.type);
        for ( var n in v.widget.options ){
          if ( (n !== 'value') && (n !== 'change') && v.$parent.$children[0].$options.props[n] ){
            if ( v.$parent.$children[0].$options.props[n].type && (v.$parent.$children[0].$options.props[n].type === Function) ){
              v.backup[n] = v.widget.options[n].toString();
            }
            else{
              v.backup[n] = v.widget.options[n];
            }
          }
        }
        v.value = JSON.stringify(v.backup);
        $(v.$el)
          .val(v.value)
          .change(function(){
            var todo = {},
                o = JSON.parse($(this).val());
            for ( var n in o ){
              if ( (n !== 'value') && (n !== 'change') && (v.backup[n] !== o[n]) ){
                v.backup[n] = o[n];
                if ( v.$parent.$children[0].$options.props[n].type && (v.$parent.$children[0].$options.props[n].type === Function) ){
                  todo[n] = eval(o[n]);
                }
                else{
                  todo[n] = o[n];
                }
              }
            }
            if ( Object.keys(todo).length ){
              v.widget.setOptions(todo);
            }
          })
          .json_editor();
      }
    }
  });

})(jQuery, bbn, kendo);
