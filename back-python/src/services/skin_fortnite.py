from config import db
from models.skin_fortnite import SkinFortnite


def criar_skin(data):
    skin = SkinFortnite(
        nome=data["nome"].strip(),
        raridade=data["raridade"].strip(),
        tipo=data["tipo"].strip(),
        temporada=data["temporada"].strip(),
        conjunto=data["conjunto"].strip(),
        v_bucks=int(data["v_bucks"]),
        disponivel=data.get("disponivel", True)
    )
    db.session.add(skin)
    db.session.commit()
    return skin


def retornar_skins():
    return SkinFortnite.query.order_by(SkinFortnite.id.desc()).all()
