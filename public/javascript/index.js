var renderedCharacters;

$("input[type=checkbox]").on( "click", function() {
	var value = $(this).val();
	var text = $(this).next('label').text();
    if($(this).prop("checked") == true) {
    	var checkedItems = "input[name=" + $(this).attr("name") + "]:checked";
		$(checkedItems).prop("checked", false);
    	$(this).prop("checked", true);
    	$.each($("input[name=" + $(this).attr("name") + "]:not(:checked)"), function() {
    		removeFilter($(this).val());
    	});
    	renderFilterSelected(value, text);
	} else if($(this).prop("checked") == false) {
		
		removeFilter(value);	
	}
	getCharacter();
});

$('#sort select').on('change', function (e) {
	sortCharacter();
	renderCharacters(renderedCharacters);
});

$(document).ready(function() {
	getCharacter();
});

function removeFilter(id) {
    $("input[value=" + id + "]").prop("checked", false);
    $('#' + id).remove();
    getCharacter();
}

function renderFilterSelected(value, text) {
	var html = 
	'<li class="sel-filter" id="' + value + '">' + 
		text + 
		'<span style="cursor:pointer" onclick="removeFilter(\'' + value + '\')">&nbsp;&nbsp;&nbsp;X</span>' + 
	'</li>';
	$('#sel-filters ul').append(html);
}

function sortCharacter() {
	var optionSelected = $("#sort select option:selected").val();
	if (optionSelected) {
		renderedCharacters.results = renderedCharacters.results.sort(function(a, b) {
	    	return optionSelected === 'asc' ? a.id - b.id : b.id - a.id;
	    });	
	}
}

function getCharacter() {
	var url = '/v1/characters';
	$.each($("input[type=checkbox]:checked"), function(index) {
        if(index == 0) {
        	url += '?' + $(this).attr("name") + '=' + $(this).val();
        } else {
        	url += '&' + $(this).attr("name") + '=' + $(this).val();
        }
        
    });
	$.get({
		headers: { 'content-type' : 'application/json', 'Accept': 'application/json' },
		url: url,
	}, function(error, response, body) {
		var data = body.responseJSON;
		renderedCharacters = data;
		sortCharacter();
		renderCharacters(data);
	});
}

function renderCharacters(data) {
	var html = '<div class="row">';
	for (var i = 0; i < data.results.length; i++) {
		var yearDiff = new Date().getFullYear() - new Date('2017-11-04T18:50:21.651Z').getFullYear();
		html += 
		'<div class="col-md-3 col-xs-6">' +
	        '<div class="char">' +
	            '<div>' +
	                '<img style="border-radius: 5px 5px 0 0;" class="img-responsive" src="' + data.results[i].image + '" alt="...">' +
	            	'<div class="image-title">' + 
	            		'<span style="font-size:15px">' + data.results[i].name + '</span> <br />' + 
	                	'<span>id: ' + data.results[i].id + ' - created ' + yearDiff + ' years ago</span>' +
	            	'</div>' + 
	            	'<div class="image-details">' +
	            		'<ul>' + 
	            			'<li><span style="color:#808080">STATUS</span><span style="float:right;color:orange">' + data.results[i].status + '</span></li>' +
	            			'<li><span style="color:#808080">SPECIES</span><span style="float:right;color:orange">' + data.results[i].species + '</span></li>' +
	            			'<li><span style="color:#808080">GENDER</span><span style="float:right;color:orange">' + data.results[i].gender + '</span></li>' +
	            			'<li><span style="color:#808080">ORIGIN</span><span style="float:right;color:orange">' + data.results[i].origin.name + '</span></li>' +
	            			'<li style="border-bottom: none;"><span style="color:#808080;padding-top:8px;">LAST LOCATION</span><span style="float:right;color:orange">' + data.results[i].location.name + '</span></li>' +
	            		'</ul>' +
	            	'</div>' +
	            '</div></div></div>'
	}
	html += '</div>'
	$('#sel-characters').html(html);
}


