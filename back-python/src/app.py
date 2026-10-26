from config import *
from models.pessoa import Pessoa
from models.skin_fortnite import SkinFortnite

from routes.skin_fortnite import *
from routes.utils import *
from routes.login import *

if __name__ ==  "__main__":
    app.run(debug=True)
# cria o banco, caso não exista :-/
# auxiliar_criar_bd()

# this is the app start