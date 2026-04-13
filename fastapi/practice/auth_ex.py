def get_current_user():
    return {"user": "john_doe"}

@app.get("/dashboard")
def read_dashboard(current_user=Depends(get_current_user)):
    return {"user": current_user}