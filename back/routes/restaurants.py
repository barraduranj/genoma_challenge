from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from database import get_session
from models import Restaurant, RestaurantCreate, RestaurantUpdate

router = APIRouter(prefix="/api/restaurants", tags=["restaurants"])

@router.get("/", response_model=List[Restaurant])
def read_restaurants(
    session: Session = Depends(get_session),
    country: Optional[str] = None
):
    query = select(Restaurant)
    if country:
        query = query.where(Restaurant.country == country)
    
    restaurants = session.exec(query).all()
    return restaurants

@router.post("/", response_model=Restaurant)
def create_restaurant(restaurant: RestaurantCreate, session: Session = Depends(get_session)):
    db_restaurant = Restaurant.model_validate(restaurant)
    session.add(db_restaurant)
    session.commit()
    session.refresh(db_restaurant)
    return db_restaurant

@router.patch("/{restaurant_id}", response_model=Restaurant)
def update_restaurant(
    restaurant_id: int, 
    restaurant: RestaurantUpdate, 
    session: Session = Depends(get_session)
):
    db_restaurant = session.get(Restaurant, restaurant_id)
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    restaurant_data = restaurant.model_dump(exclude_unset=True)
    for key, value in restaurant_data.items():
        setattr(db_restaurant, key, value)
    
    session.add(db_restaurant)
    session.commit()
    session.refresh(db_restaurant)
    return db_restaurant

@router.delete("/{restaurant_id}")
def delete_restaurant(restaurant_id: int, session: Session = Depends(get_session)):
    db_restaurant = session.get(Restaurant, restaurant_id)
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    session.delete(db_restaurant)
    session.commit()
    return {"ok": True}
