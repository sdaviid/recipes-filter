# Idéia

Muitas vezes eu tinha alguns poucos ingredientes em casa e queria fazer algo com eles, não sendo um mestre da cozinha por vez recorria aos sites de receitas e por mais que tenham diversas receitas, as pesquisas não traziam receitas com os ingredientes que eu queria.
Decidi então coletar diversas receitas e montar um sistema para filtrar de acordo com o que eu tenho.

> O projeto ainda está em crescimento, até o momento pelo pequeno banco de dados, não está trazendo receitas com apenas X, Y, mas a idéia é chegar nisso.


# Execução

Instalar as dependências


``python -m pip install -r requirements.txt``


E executar o servidor

``gunicorn main:app``

E poderá acessar http://localhost:8000/



# Funcionamento

Criei um bot para coletar receitas a partir da API do aplicativo do TudoGostoso (https://github.com/sdaviid/bot-tudogostoso)
O sistema possui um banco de dados com o título, ingredientes (da forma que o usuário do TudoGostoso adicionou), tempo de preparo, categoria e url original.

A partir disso, cria-se uma consulta por receitas que contenham os ingredientes listados.


# Demo

Você pode acessar a versão de demonstração em:

http://recipe-filter.lab.davidsouza.site/


# Disclaimer
> Aos desenvolvedores do TudoGostoso, não foi solicitado nenhuma autorização, o sistema não guarda absolutamente nenhuma receita, apenas ingredientes para filtragem e redirecionamento ao site para detalhes.