def get_db():
    db = "DB_CONNECTION"
    return db

@app.get("/item")
def get_items(db=Depends(get_db)):
    return {"db": db}

