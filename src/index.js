var data = {
    counter: 0
};
data.parents = [];

data.parents.push({name:"PARENT00", children:[]});
data.parents.push({name:"PARENT01", children:[]});
data.parents.push({name:"PARENT02", children:[]});

data.parents[0].children.push({name:"CHILD00"});
data.parents[0].children.push({name:"CHILD01"});
data.parents[0].children.push({name:"CHILD02"});

data.parents[1].children.push({name:"CHILD00"});
data.parents[1].children.push({name:"CHILD01"});

data.parents[2].children.push({name:"CHILD00"});

var app = new Vue({
  el: '#app',
  data: data,
  created: function () {
    console.log("created");
  },
  mounted: function() {
    console.log("mounted");
    $(".child").draggable();
    $( ".child" ).droppable({
      drop: function( event, ui ) {
          console.log("drop");
          //$( this ).remove();
          $(".child").css({top:0,left:0});
      }
    });
  },
  updated: function() {
    console.log("updated");
  }
});

// jQuery event test
$("#btn01").click(function(){
    data.counter += 5;
    data.parents[2].children.push({name:"CHILD" + data.counter.toString()});
    app.render();
});
