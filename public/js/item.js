=======
$(document).ready(function() {
  // Getting a reference to the input field where user adds a new Item
  var $newItemInput = $("input.new-item");
  // Our new Item will go inside the itemContainer
  var $itemContainer = $(".item-container");
  // Adding event listeners for deleting, editing, and adding Items
  $(document).on("click", "button.delete", deleteItem);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".item", editItem);
  // $(document).on("keyup", ".item", finishEdit);
  $(document).on("blur", ".item", cancelEdit);
  $(document).on("submit", "#item-form", insertItem);

  // Our initial Item array
  var items = [];

  // Getting Users Items from database when page loads
  getItems();

  function initializeRows() {
    $itemContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      rowsToAdd.push(createNewRow(items[i]));
    }
    $itemContainer.prepend(rowsToAdd);
  }

// This function grabs items from the database and updates the view
  function getItems() {
    $.get("/api/goods", function(data) {
      items = data; //data;
      initializeRows();
    });
  }

  // This function deletes an Item when the user clicks the delete button
  function deleteItem(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/goods/" + id
    }).done(getItems);
  }

  // This function handles showing the input box for a user to edit an item
  function editItem() {
    var currentItem = $(this).data("item");
    $(this).children().hide();
    $(this).children("input.edit").val(currentItem.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var item = $(this).parent().data("item");
    item.complete = !item.complete;
    updateitem(item);
  }

  // This function updates an Item in our database
  function updateItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/goods",
      data: Items
    }).done(getItems);
  }

  // This function is called whenever an item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentItem = $(this).data("item");
    $(this).children().hide();
    $(this).children("input.edit").val(currentItem.text);
    $(this).children("span").show();
    $(this).children("button").show();
  }

  // This function constructs a item row
  function createNewRow(item) {
    var $newInputRow = $(
      [
        "<li class='list-group-item item-item'>",
        "<span>",
        item.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", item.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("item", item);
    if (item.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new item into our database and then updates the view
  function insertItem(event) {
    event.preventDefault();
    var item = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/goods", item, getItems);
    $newItemInput.val("");
  }
});

//Start of what I was doing

console.log("we connected to item.js");
var $TABLE = $('#table');
var $BTN = $('#export-btn');
// var $EXPORT = $('#export');

$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  console.log("clickity");
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = ["availability", "name", "description", "category",
"pricePerHour", "outTimeStamp"];
  var data = [];
  
  // Get the headers (add special header logic here)
  // $($rows.shift()).find('th:not(:empty)').each(function () {
  //   headers.push($(this).text().toLowerCase());
  // });
  
  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });

    data.push(h);
    console.log(JSON.stringify(data));
    var jsonData = {
      "availability": data[0],
      "name" : data[1],
      "description" : data[2],
      "category" : data[3],
      "pricePerHour": data[4],
      "outTimeStamp": data[5]    
    }
  console.log(jsonData);
  postData(jsonData);
  });



  // var jsonData = {
  //   "availability": data[0],
  //   "name" : data[1],
  //   "description" : data[2],
  //   "category" : data[3],
  //   "pricePerHour": data[4],
  //   "outTimeStamp": data[5]    
  // }
  // console.log(jsonData);
  // postData(jsonData);


  // Output the result
  // $EXPORT.text(JSON.stringify(data));
  
function postData(data){
  $.post("/api/goods", JSON.stringify(data));
}

$('.item-return').click(function(){
  $(this).parents('tr').detach();
});
});


// $(document).ready(function(){
//     function popTable(){
      





//       var row;
//         "<td>"+owner+"</td>"
//         "<td>"+name+"</td>"
//         "<td>"+location+"</td>"
//         "<td>"+category+"</td>"
//         "<td>"+price+"</td>"
//         "<td>"+checkoutTime+"</td>"
//         "<td>"+cost+"</td>"
      
//       $ (".rentedItem").append(row);
//     }
//   })






// //
// $(document).ready(function() {
//   function viewProducts() {
//   // Initializes table and populates cells based on items within
//   // bamazon.sql databes.
//   var table = new Table({
//     head: ["Item_ID", "Brand", "Product", "Department", "Price", "Quantity"],
//     colWidths: [10, 15, 40, 15, 10, 10]
//   });
//   var query0 = "SELECT * FROM products";
//   connection.query(query0, function(err, res) {
//     if (err) throw err;
//     // console.log(res);
//     for (var i = 0; i < res.length; i++) {
//       table.push(
//         [res[i].item_id, res[i].brand, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
//       );
//     }
//     console.log(table.toString());
//     managerOptions();
//   });
// }









<<<<<<< HEAD



//!!!!New Items need to be added to DB


// $(document).ready(function() {
//   // Getting a reference to the input field where user adds a new Item
//   var $newItemInput = $("input.new-item");
//   // Our new Item will go inside the itemContainer
//   var $itemContainer = $(".item-container");
//   // Adding event listeners for deleting, editing, and adding Items
//   $(document).on("click", "button.delete", deleteItems);
//   $(document).on("click", "button.complete", toggleComplete);
//   $(document).on("click", ".item", editItems);
//   $(document).on("keyup", ".item", finishEdit);
//   $(document).on("blur", ".item", cancelEdit);
//   $(document).on("submit", "#item-form", insertItems);

//   // Our initial Item array
//   var items = [];

//   // Getting Users Items from database when page loads
//   getItems();

//   function initializeRows() {
//     $itemContainer.empty();
//     var rowsToAdd = [];
//     for (var i = 0; i < items.length; i++) {
//       rowsToAdd.push(createNewRow(items[i]));
//     }
//     $itemContainer.prepend(rowsToAdd);
//   }

// // This function grabs items from the database and updates the view
//   function getItems() {
//     $.get("/api/goods", function(data) {
//       items = data;
//       initializeRows();
//     });
//   }

//   // This function deletes an Item when the user clicks the delete button
//   // function deleteItem(event) {
//   //   event.stopPropagation();
//   //   var id = $(this).data("id");
//   //   $.ajax({
//   //     method: "DELETE",
//   //     url: "/api/goods/" + id
//   //   }).done(getItems);
//   // }

//   // This function handles showing the input box for a user to edit an item
//   //function editItem() {
//     var currentItem = $(this).data("item");
//     $(this).children().hide();
//     $(this).children("input.edit").val(currentItem.text);
//     $(this).children("input.edit").show();
//     $(this).children("input.edit").focus();
//   //}

//   // Toggles complete status
//   function toggleComplete(event) {
//     event.stopPropagation();
//     var item = $(this).parent().data("item");
//     item.complete = !item.complete;
//     updateitem(item);
//   }

//   // This function updates an Item in our database
//   function updateItem(item) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/goods",
//       data: Items
//     }).done(getItems);
//   }

//   // This function is called whenever an item is in edit mode and loses focus
//   // This cancels any edits being made
//   // function cancelEdit() {
//   //   var currentItem = $(this).data("item");
//   //   $(this).children().hide();
//   //   $(this).children("input.edit").val(currentItem.text);
//   //   $(this).children("span").show();
//   //   $(this).children("button").show();
//   // }

//   // This function constructs a item row
//   function createNewRow(item) {
//     var $newInputRow = $(
//       [
//         "<li class='list-group-item item-item'>",
//         "<span>",
//         item.text,
//         "</span>",
//         "<input type='text' class='edit' style='display: none;'>",
//         "<button class='delete btn btn-default'>x</button>",
//         "<button class='complete btn btn-default'>✓</button>",
//         "</li>"
//       ].join("")
//     );

//     $newInputRow.find("button.delete").data("id", item.id);
//     $newInputRow.find("input.edit").css("display", "none");
//     $newInputRow.data("item", item);
//     if (item.complete) {
//       $newInputRow.find("span").css("text-decoration", "line-through");
//     }
//     return $newInputRow;
//   }

//   // This function inserts a new item into our database and then updates the view
//   function insertItem(event) {
//     event.preventDefault();
//     var item = {
//       text: $newItemInput.val().trim(),
//       complete: false
//     };

//     $.post("/api/goods", item, getItems);
//     $newItemInput.val("");
//   }
// });
=======
>>>>>>> 14fae658a2143a0d40702951d853663ca4e28437
