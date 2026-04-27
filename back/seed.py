from sqlmodel import Session, select
from models import Restaurant

def seed_data(session: Session):
    existing = session.exec(select(Restaurant)).first()
    if existing:
        return 
    
    restaurants = [
        Restaurant(name="Cocó Café", city="San Miguel", country="Chile", food_type="Cafetería, Pastelería", rating=5.0, visited=True),
        Restaurant(name="Coffee Culture Coffee Roasters", city="Maipú", country="Chile", food_type="Cafetería", rating=4.0, visited=True),
        Restaurant(name="Vapiano", city="Las Condes", country="Chile", food_type="Italiana", rating=4.5, visited=True),
        Restaurant(name="Boragó", city="Vitacura", country="Chile", food_type="Experimental, Gourmet", rating=None, visited=False),
        Restaurant(name="Alchemist", city="Copenhagen", country="Dinamarca", food_type="Gourmet", rating=None, visited=False),
    ]
    
    for r in restaurants:
        session.add(r)
    session.commit()