$(document).on('click', '#btn_add', function(e){
  e.preventDefault();
  $('#list').append(`
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="ingredient">${$('#add').val()}</span>
      <i class="far fa-trash-alt delete" id="btn_delete"></i>
    </li>
  `);
  $('#add').val('');
});

$(document).on('click', '#btn_delete', function(e){
  $(this).closest('li').remove();
});

var desgracado = false;

$(document).on('click', '#btn_search', function(e){
	e.preventDefault();
	let ingredients = [];
	$('.ingredient').each(function(i, obj) {
	    ingredients.push($(this).html());
	});
	let data = {'ingredients': ingredients};
	let result = search_ingredients(data);
	let jresult = result.responseJSON;
	var contador = 0;
	var first = true;
	var recipe_container = '';
	$('.recipes-container').removeClass('recipe-disable').html('').append(`<h3>Encontramos ${jresult.total} receitas`);
	for(var item_index=0;item_index<jresult.recipes.length;item_index++){
		if(contador % 3 === 0 || first === true){
			recipe_container += (first === true ? '' : '</div>') + '<div class="row g-4 py-5 row-cols-1 row-cols-lg-3">';
		}
		let item = jresult.recipes[item_index];
		let ingredients_str = '';
		let ingredients_str_db = item.ingredients;
		data.ingredients.forEach(function(ingredient){
			ingredients_str_db = replaceAll(ingredients_str_db, ingredient, `<strong>${ingredient}</strong>`);
		})
		let ingredients_json = JSON.parse(ingredients_str_db);
		let first_ingredient = true;
		ingredients_json.forEach(function(ingredient){
			ingredients_str += `${(first_ingredient == true ? '' : '<br />')}${ingredient}`;
			first_ingredient = false;
		})
		recipe_container += `
			<div class="col d-flex align-items-start">
				<div>
					<h4>${item.description}</h4>
					<p>${ingredients_str}</p>
					<a href="${item.url}">acessar receita</a>
				</div>
			</div>`;
		console.log(recipe_container);
		first = false;
		contador += 1;
	}
	$('.recipes-container').append(recipe_container);
	console.log(data);
	console.log(result.responseJSON);
})


function search_ingredients(ingredients){
    return $.ajax({
        url: '/api/search',
        type: 'POST',
        dataType: 'json',
        async: false,
        cache: false,
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify(ingredients),
        done: function(data){
            return data;
        }
    })
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}