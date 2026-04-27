from sqlmodel import SQLModel, Field
from typing import Optional

class RestaurantBase(SQLModel):
    name: str
    city: str
    country: str
    food_type: str
    rating: Optional[float] = None
    visited: bool = False

class Restaurant(RestaurantBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(SQLModel):
    name: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    food_type: Optional[str] = None
    rating: Optional[float] = None
    visited: Optional[bool] = None
