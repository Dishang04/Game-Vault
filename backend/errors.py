from fastapi import HTTPException
from fastapi.responses import JSONResponse

async def http_error_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": request+" failed, "+exc.detail},
    )

async def error_middleware(request, call_next):
    try:
        return await call_next(request)
    except HTTPException as e:
        return await http_error_handler(request, e)
