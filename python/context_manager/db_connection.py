class Db():
    def __enter__(self):
        print("connecting to DB")
        return self
    
    def __exit__(self, exc_type, exc_value, exc_tb):
        print("closing db connection")

with Db() as db:
    db.conn()
    
