 
 $(document).on("click", "button.delete", deleteTodo);


function deleteTodo(event) {
    event.stopPropagation();

    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/goods/" + id
    }).done(console.log("This button works"));
  }

   
//  $(document).on("click", ".delete", deleteTodo);

// var $itemsTable = $(".allItemsTable");

// function deleteTodo(event) {
//     event.stopPropagation();

//     var id = $(this).attr("id");
//     console.log("id: " + id);
//     $.ajax({
//       method: "DELETE",
//       url: "/api/goods/" + id,
//      //  success: function(response) {
//     	// $("#allItemsTable").html(response);
//      //  }
//     }).done(getItems);
//   }

//  function getItems() {
//  	$.get("/itemMmgt", function(data) {
//  		itemMgmt = data;
//  		initializeRows();
//  	});
//  }

//  function initializeRows() {
//  	$itemsTable.empty();
//  	var rowsToAdd = [];
//  	for (var i = 0; i < itemMgmt.length; i++) {
//  		rowsToAdd.push(createNewRow(todo));
//  	}
//  }