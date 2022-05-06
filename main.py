from flask import Flask, render_template, request, jsonify

from core.database import(
    SessionLocal,
    engine,
    Base,
    get_db
)
import json

from model.recipe import Recipe

app = Flask(__name__,
            static_folder='static',
            template_folder='templates')


@app.route('/')
def index():
    return render_template('index.html')



@app.route('/api/search', methods=['POST'], defaults={'start': 0})
@app.route('/api/search/<start>', methods=['POST'])
def search(start=0):
    data = request.json
    ingredients = data.get('ingredients', False)
    if ingredients == False:
        return jsonify({'status': False, message: 'Missing list of ingredients'})
    data = Recipe.find_by_ingredients(session=SessionLocal(), ingredients=ingredients, start=start)
    retorno = {'status': True, 'recipes': []}
    for item in data:
        temp = {
            'id': item.id,
            'description': item.description,
            'source_id': item.source_id,
            'ingredients': item.ingredientes,
            'url': item.url,
            'time': item.tempo_preparo,
            'categoria': item.categoria
        }
        retorno['recipes'].append(temp)
    total = Recipe.count_by_ingredients(session=SessionLocal(), ingredients=ingredients)
    retorno.update({'total': total})
    return json.dumps(retorno, ensure_ascii=False).encode('utf-8').decode()