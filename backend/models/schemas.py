from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MathInput(BaseModel):
    x: float
    y: Optional[float] = None

class FactorialInput(BaseModel):
    x: int

class FibonacciInput(BaseModel):
    x: int

class MathResult(BaseModel):
    result: float | str

class HistoryItem(BaseModel):
    id: int
    operation: str
    input_data: str
    result: str
    timestamp: datetime

    class Config:
        orm_mode = True
