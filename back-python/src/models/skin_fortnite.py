from config import db


class SkinFortnite(db.Model):
    __tablename__ = "skins_fortnite"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    raridade = db.Column(db.String(40), nullable=False)
    tipo = db.Column(db.String(60), nullable=False)
    temporada = db.Column(db.String(40), nullable=False)
    conjunto = db.Column(db.String(120), nullable=False)
    v_bucks = db.Column(db.Integer, nullable=False)
    disponivel = db.Column(db.Boolean, nullable=False, default=True)

    def json(self):
        return {
            "id": self.id, "nome": self.nome, "raridade": self.raridade,
            "tipo": self.tipo, "temporada": self.temporada,
            "conjunto": self.conjunto, "v_bucks": self.v_bucks,
            "disponivel": self.disponivel
        }
