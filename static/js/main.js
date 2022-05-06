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

function write_recipes(ingredients, start=false, clean=true){
    var contador = 0;
    var first = true;
    var recipe_container = '';
    var result = search_ingredients(ingredients, start)
    var jresult = result.responseJSON;
    if(jresult.status === true){
        if(clean === true){
            $('.recipes-container').removeClass('recipe-disable').html('').append(`<h3>Encontramos ${jresult.total} receitas`);
        }

        for(var item_index=0; item_index<jresult.recipes.length; item_index++){
            if(item_index % 3 === 0 || first === true){
                recipe_container += (first === true ? '' : '</div>') + '<div class="row g-4 py-5 row-cols-1 row-cols-lg-3">';
            }

            var item = jresult.recipes[item_index];

            var ingredients_str_db = item.ingredients;
            console.log(ingredients_str_db);
            ingredients.forEach(function(ingredient){
                console.log(ingredient);
                ingredients_str_db = replaceAll(ingredients_str_db, ingredient, `<strong>${ingredient}</strong>`);
            });

            var ingredients_json = JSON.parse(ingredients_str_db);
            var ingredients_str = ''
            let first_ingredient = true;
            ingredients_json.forEach(function(ingredient){
                ingredients_str += `${(first_ingredient == true ? '' : '<br />')}${ingredient}`;
                first_ingredient = false;
            });

            recipe_container += `
                <div class="col d-flex align-items-start">
                    <div>
                        <h4>${item.description}</h4>
                        <p>${ingredients_str}</p>
                        <a href="${item.url}">acessar receita</a>
                    </div>
                </div>`;
            first = false;
        }
        $('.recipes-container').append(recipe_container);
    }
}


function get_user_ingredients(){
    var ingredients = [];
    $('.ingredient').each(function(i, obj){
        ingredients.push($(this).html());
    });
    return ingredients;
}


$(document).on('click', '#btn_search', function(e){
    e.preventDefault();
    var ingredients = get_user_ingredients();
    write_recipes(ingredients);
});



function search_ingredients(ingredients, start=false){
    return $.ajax({
        url: `api/search${(start !== false ? '/' + start : '')}`,
        type: 'POST',
        dataType: 'json',
        async: false,
        cache: false,
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify({'ingredients': ingredients}),
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

var last_count = 0;


$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        var ingredients = get_user_ingredients();
        last_count += 10
        write_recipes(ingredients, last_count, false)
    }
});