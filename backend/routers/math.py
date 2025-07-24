from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.schemas import MathInput, MathResult, FactorialInput, FibonacciInput, HistoryItem
from models.orm import RequestLog
from typing import List
from services.cache import CacheService
import math
import asyncio

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/pow", response_model=MathResult)
async def power(input: MathInput, db: Session = Depends(get_db)):
    cache = CacheService(db)
    cached = cache.get_cached_result("pow", input.dict())
    if cached is not None:
        return {"result": cached}
    res = input.x ** input.y
    db.add(RequestLog(operation="pow", input_data=str(input.dict()), result=str(res)))
    db.commit()
    return {"result": res}

@router.post("/factorial", response_model=MathResult)
async def factorial(input: FactorialInput, db: Session = Depends(get_db)):
    cache = CacheService(db)
    cached = cache.get_cached_result("factorial", input.dict())
    if cached is not None:
        return {"result": cached}
    n = input.x
    if n < 0:
        return {"result": "Error: negative numbers not allowed"}
    res = math.factorial(n)
    db.add(RequestLog(operation="factorial", input_data=str(input.dict()), result=str(res)))
    db.commit()
    return {"result": res}

@router.post("/fibonacci", response_model=MathResult)
async def fibonacci(input: FibonacciInput, db: Session = Depends(get_db)):
    cache = CacheService(db)
    cached = cache.get_cached_result("fibonacci", input.dict())
    if cached is not None:
        return {"result": cached}
    n = input.x
    if n < 0:
        return {"result": "Error: n must be non-negative"}
    elif n in [0, 1]:
        res = n
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        res = b
    db.add(RequestLog(operation="fibonacci", input_data=str(input.dict()), result=str(res)))
    db.commit()
    return {"result": res}

@router.get("/history", response_model=List[HistoryItem])
async def get_history(db: Session = Depends(get_db)):
    await asyncio.sleep(0)
    return db.query(RequestLog).order_by(RequestLog.timestamp.desc()).all()

@router.delete("/history/{entry_id}")
async def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(RequestLog).filter(RequestLog.id == entry_id).first()
    if entry:
        db.delete(entry)
        db.commit()
    return {"message": "Șters cu succes"}
