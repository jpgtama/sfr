define([
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/_base/declare'
], function(lang, domClass, declare){
  return declare("app.utils.SingleSelectGroup", [], {

      widgetList: null,

      construct: function(options){
        lang.mixin(options);
      },

      add: function(w){
        if(!this.widgetList){
          this.widgetList = [];
        }
        this.widgetList.push(w);
      },

      clickNotify: function(w){

        // cancel others
        for(i =0;i<this.widgetList.length; i++){
            if(w === this.widgetList[i]){
              // do nothig coz this is selected
            }else{
              this.widgetList[i].deSelect();
            }
        }
      }

  });


});
