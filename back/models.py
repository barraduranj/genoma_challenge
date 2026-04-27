from sqlmodel import SQLModel, Field
from typing import Optional
from pydantic import field_validator

class RestaurantBase(SQLModel):
    name: str

    city: str = Field(index=True)
    country: str = Field(index=True)

    food_type: str
    rating: Optional[float] = Field(default=None, ge=0, le=5)
    visited: bool = False

    @field_validator("name", "city")
    @classmethod
    def capitalize_fields(cls, v: str) -> str:
        if not v:
            return v
        # title() pone en mayúscula la primera letra de cada palabra y el resto en minúscula
        return v.title().strip()

class Restaurant(RestaurantBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(SQLModel):
    name: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    food_type: Optional[str] = None
    rating: Optional[float] = Field(default=None, ge=0, le=5)
    visited: Optional[bool] = None

    @field_validator("name", "city")
    @classmethod
    def capitalize_fields(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        return v.title().strip()

