const $ = require("jquery");
require("jquery-ui-bundle");
const Vue = require("vue");

var _id = 0;

function createRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createEntity(data) {
  return $.extend({id:_id++, color:createRandomColor()}, data);
}

function createInitialData() {
  var data = {
  };
  data.parents = [];

  data.parents.push(createEntity({name:"PARENT00", children:[]}));
  data.parents.push(createEntity({name:"PARENT01", children:[]}));
  data.parents.push(createEntity({name:"PARENT02", children:[]}));

  data.parents[0].children.push(createEntity({name:"CHILD00"}));
  data.parents[0].children.push(createEntity({name:"CHILD01"}));
  data.parents[0].children.push(createEntity({name:"CHILD02"}));

  data.parents[1].children.push(createEntity({name:"CHILD00"}));
  data.parents[1].children.push(createEntity({name:"CHILD01"}));

  data.parents[2].children.push(createEntity({name:"CHILD00"}));
  return data;
}

function getIdFromElement(element) {
  var id = null;
  var str = $(element).attr("data-id");
  if (str) {
    id = parseInt(str, 10);
  }
  return id;
}

function initialize() {
  var _draggedElement = null;
  $(".child").draggable({
    start: function(event) {
      _draggedElement = event.target;
      $(_draggedElement).css("z-index", 999999);
      console.info("start");
    },
    stop: function(event) {
      $(_draggedElement).css("z-index", 0);
      _draggedElement = null;
      $(".child").css({top:0,left:0});
    }
  });
  $(".child,.parent").droppable({
    drop: function(event, ui) {
      if (!_draggedElement) {
        return;
      }
      var topId = getIdFromElement(_draggedElement); // のった側
      var bottomId = getIdFromElement(event.target); // のせられた側
      
      if (ui.position.top < 0) {
        // 上に追加
        insertEntity(data, bottomId, topId, 0);
      } else if (ui.position.top > 0) {
        // 下に追加
        insertEntity(data, bottomId, topId, 1);
      }
    }
  });
}

function findEntity(data, id) {
  var result = null;
  var i, len;
  var found = false;
  for (i = 0, len = data.parents.length; i < len; i++) {
    if (found) {
      break;
    }
    var parent = data.parents[i];
    if (parent.id === id) {
      result = {pIndex:i, cIndex:null};
      break;
    }
    var i2, len2;
    for (i2 = 0, len2 = parent.children.length; i2 < len2; i2++) {
      var enitity = parent.children[i2];
      if (enitity.id === id) {
        result = {pIndex:i, cIndex:i2};
        found = true;
        break;
      }
    }
  }
  return result;
}

function insertEntity(data, bottomId, topId, offset) {
  var bottom = findEntity(data, bottomId);
  var top = findEntity(data, topId);
  if (bottom && top) {
    var movingEntity = data.parents[top.pIndex].children.splice(top.cIndex, 1)[0];
    if (bottom.cIndex >= 0) {
      data.parents[bottom.pIndex].children.splice(bottom.cIndex+offset, 0, movingEntity);
    } else {
      data.parents[bottom.pIndex].children.push(movingEntity);
    }
  }
}


var data = createInitialData();
// Vue初期化
var app = new Vue({
  el: '#app',
  data: data,
  created: function () {
    console.log("created");
  },
  mounted: function() {
    console.log("mounted");
    initialize();
  },
  updated: function() {
    console.log("updated");
    initialize();
  }
});

$("#btnShow").click(function(){
  alert(JSON.stringify(data));
});

