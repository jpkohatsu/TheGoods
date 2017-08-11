$(document).ready(function() {
  // Getting a reference to the input field where user adds a new Item
  var $newItemInput = $("input.new-item");
  // Our new Item will go inside the itemContainer
  var $itemContainer = $(".item-container");
  // Adding event listeners for deleting, editing, and adding Items
  $(document).on("click", "button.delete", deleteItems);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".item", editItems);
  $(document).on("keyup", ".item", finishEdit);
  $(document).on("blur", ".item", cancelEdit);
  $(document).on("submit", "#item-form", insertItems);

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
      items = ; //data;
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