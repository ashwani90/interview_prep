def send_mail(email: str):
    print(f"Sending email to {email}")


@app.post("/signup")
def signup(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_mail, email)
    return {"message": "Signup successful."}

# Background task with dependency
@app.post("/process")
def process_data(background_tasks: BackgroundTasks, user = Depends(get_current_user)):
    background_tasks.add_task(write_log, f"Processing data for user: {user.email}")
    return {"status": "Data processed."}

# Always create new DB session inside task