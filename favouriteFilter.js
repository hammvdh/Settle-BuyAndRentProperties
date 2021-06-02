
//Functions to store the property into the favourites list and to add, remove, clear and view favourites

$(function() {
	$( ".addFav" ).on("click", function(){
		
		try {
			$(this).attr('disabled', true);
			
			var propIdToAdd = $(this).closest("div").attr("id");
			var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			if(myFavouriteProp == null) {
				myFavouriteProp = [];
			}
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToAdd == myFavouriteProp[j]) {
						
						alert("This property is already in your favourites"); 
				
						myFavouriteProp = [];
					}
				}
			}
			

			myFavouriteProp.push(propIdToAdd);
			localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
			
		}
		
		catch (e) {
			if (e==QUOTA_EXCEEDED_ERR) {
				console.log("Error: Local storage limit exceeds");
			}
			else {
				console.log("ERROR: Saving to local storage.");
			}
		}
	});
});




$(function() {
	$( ".removeFav" ).on("click", function(){
            
		var propIdToRemove = $(this).closest("div").attr("id");
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		if(myFavouriteProp != null) {
			for ( var j = 0; j < myFavouriteProp.length; j++) {
				
				if ( propIdToRemove == myFavouriteProp[j]) {
					
					alert("This Property has been removed");
					
					delete myFavouriteProp[j];
					$('.addFav').removeAttr("disabled");
					
					localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
					
					myFavouriteProp[j] = [];
				}
			}
		}
		
		if(myFavouriteProp == null) {
			alert("You have no favourite items");
		}
	});
});
	
	
$(function() {
	$( ".viewFavourites" ).on("click", function(){
		console.log("Restoring array data from local storage");
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		var resultCount=0;
		var output = "";
		
		if (myFavouriteProp != null) {
			
			for (var i = 0; i < data.properties.length; i++) {
				for (j = 0; j < myFavouriteProp.length; j++) {
					
					if (data.properties[i].id == myFavouriteProp[j]) {
						
						output+="<div class='property'><img class='property-image' src=" + data.properties[i].picture + ">" + 
						"<h2 class='prop-price'>" +
							"<strong>Price:</strong> £" + data.properties[i].price +
						"</h2>"+
						"<h2 class='prop-type'><strong> Property type:</strong> " + data.properties[i].type +"</h2>"
						+
						"<h2 class = 'prop-location'><strong> Location: </strong>"+ data.properties[i].location +"</h2>" + 
						"<p class='property-description'>" + data.properties[i].shortDescription + "</p>" + 
						"<button class='view-prop'>"+
							"<a href='" + data.properties[i].url + "'><h4>View Property</h4></a>"+
						"</button></div>";
						resultCount++;
					}
				}
			}
		}

		document.getElementById("results").innerHTML=`
		<h1> Favourite Properties ( ${resultCount} results ) </h1> 
		`
		// creating button to clear all favourites
		document.getElementById("clearButton").innerHTML=`
		<button class="clearFav" onclick="clearFav()"><a>Clear Favourites</a></button> 
		`
		
		document.getElementById( "Placeholder" ).innerHTML = output;
	
	});
});

function clearFav() {
	localStorage.clear();
	window.location.reload();
}