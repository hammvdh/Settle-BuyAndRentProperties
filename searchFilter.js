
//Functions to get user input from search container using JQuery UI widgets

$(function() {
	$("#minBed").spinner({
		min: 1,
		max: 4,
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {
	$("#maxBed").spinner({
		min: 1,
		max: 4,
		spin: function(event, ui) {
			$(this).change();
		}
	});
});

$(function() {
	  $("#property").selectmenu();
});

$(function() {
	  $("#time").selectmenu();
});

$(function() {
	$("#priceSlider").slider({
		range:true,
		min: 200000,
		max: 1000000,
		values: [ 70, 300 ],
		slide: function( event, ui ){
			$("#price").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
		}
	});
	$("#price").val(" £" + $(" #priceSlider").slider( "values", 0 ) + " - £" + $("#priceSlider").slider( "values", 1 ) );
});

$(function() {
	$( "#searchBtn" ).on("click", function(){
		// variables to store the values of each user input
		var resultCount=0;
		var propType = $("#property").val();
	    var minBed =  $("#minBed").val();
        var maxBed =  $("#maxBed").val();
		var date =  $("#time").val();
		var minPrice = $("#priceSlider").slider("option", "values")[0];
		var maxPrice = $("#priceSlider").slider("option", "values")[1];
		
		var output="<div class='flex-results'>";
		//For loop to do through the data in the array and using if statements to print the values only if they meet the criteria
		for (var i in data.properties) {
			if (( propType == data.properties[i].type) || (propType=="Any"))
			if (( maxBed >= data.properties[i].bedrooms && minBed <= data.properties[i].bedrooms ))
			if (( date == data.properties[i].added.month) || (date=="Any Date"))
			if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
			{
				{
					{
						{
							output+=
							"<div class='property'><img class='property-image' src=" + data.properties[i].picture + ">" + 
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
							resultCount++; // increasing number of results by 1
						} 
					}
				}
				
			} 
			
		}
		output+="</div>";
		// getting the results from the result count variable and printing them into the results div tag
		document.getElementById("results").innerHTML=`
        <h1> Properties Available ( ${resultCount} results ) <h1>
        `
		document.getElementById( "Placeholder" ).innerHTML = output;

	});	
});