from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def ping_server():
    return {"Ping" : "Ping"}