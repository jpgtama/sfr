define(['dojo/dom-class'], function(domClass){

  var obj = {
    removeLoading: function(node){
        domClass.remove(node, 'loading');
    }
  };

  return obj;

});
