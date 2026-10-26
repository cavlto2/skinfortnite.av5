from config import app, jsonify, request, jwt_required
import services.skin_fortnite as skin_service


@app.route("/skins-fortnite", methods=["GET"])
def listar_skins_fortnite():
    skins = skin_service.retornar_skins()
    return jsonify({"resultado": "ok", "detalhes": [skin.json() for skin in skins]})


@app.route("/skin-fortnite", methods=["POST"])
@jwt_required()
def incluir_skin_fortnite():
    dados = request.get_json(silent=True) or {}
    obrigatorios = ["nome", "raridade", "tipo", "temporada", "conjunto", "v_bucks"]
    if any(dados.get(campo) in (None, "") for campo in obrigatorios):
        return jsonify({"resultado": "erro", "detalhes": "Preencha todos os campos obrigatórios da skin."}), 400
    try:
        preco = int(dados["v_bucks"])
        if preco < 0:
            raise ValueError()
    except (ValueError, TypeError):
        return jsonify({"resultado": "erro", "detalhes": "V-Bucks deve ser um número inteiro igual ou maior que zero."}), 400
    skin = skin_service.criar_skin(dados)
    return jsonify({"resultado": "ok", "detalhes": skin.json()}), 201
