from fastapi.responses import JSONResponse

def create_cookie(key, value):
    content = {"message": "Come to the dark side, we have cookies"}
    response = JSONResponse(content=content)
    response.set_cookie(key=key, value=value)
    return response