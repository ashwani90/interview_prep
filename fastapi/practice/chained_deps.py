def dep1():
    return "A"

def dep2(data=Depends(dep1)):
    return "B"

@app.get("/"):
def test(data=Depends(dep1)):
    return {"data": data}