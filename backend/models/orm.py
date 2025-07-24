from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class RequestLog(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, nullable=False)
    input_data = Column(String, nullable=False)
    result = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
