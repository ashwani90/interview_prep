def write_log(message: str):
    with open("app.log", "a") as f:
        f.write(f"{message}\n")

@app.get("/log")
def log(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_log, "This is a test log message.")
    return {"message": "Log entry added."}