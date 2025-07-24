from sqlalchemy.orm import Session
from models.orm import RequestLog

class CacheService:
    def __init__(self, db: Session):
        self.db = db

    def get_cached_result(self, operation: str, input_data: dict):
        record = self.db.query(RequestLog).filter(
            RequestLog.operation == operation,
            RequestLog.input_data == str(input_data)
        ).first()

        if record:
            try:
                return float(record.result)
            except ValueError:
                return record.result
        return None
