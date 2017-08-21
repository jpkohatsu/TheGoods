// need:
// $(document).on("click", "button.search", searchItems);
//
// function searchItems(results){
// 	event.stopPropagation();
//
// 	var search = $(this).data("search");
//
// 	if (search === "" || search === false || search === "all" || search === "All"){
// 		$.ajax({
// 			method: "GET",
// 			url: "/api/goods"
// 		}).done(console.log("search for all"));
// 	}
// 	else {
// 		$ajax({
// 			method: "GET",
// 			url: "api/goods/name?" + search
// 		}).done(console.log("searched by item name"));
// 	}
// };


//query all items available for rent
//itme by name
//location
//price
//category
//owner
