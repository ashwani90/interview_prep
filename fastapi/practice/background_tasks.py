from fastapi import BackgroundTasks

def log_task():
    print("Logging in background")

@app.get("/task")
def run_task(background_tasks: BackgroundTasks):
    background_tasks.add_task(log_task)
    return {"message": "Task Started"}

    