from fastapi import FastAPI, Depends, HTTPException, Header
from jose import jwt
import requests

app = FastAPI()

AUTH0_DOMAIN = "your-auth0-domain.auth0.com"
API_AUDIENCE = "YOUR_API_IDENTIFIER"
ALGORITHMS = ["RS256"]

def get_public_key():
    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    jwks = requests.get(jwks_url).json()["keys"]
    return {jwk["kid"]: jwk for jwk in jwks}

def verify_token(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header["kid"]
        jwk = get_public_key()[kid]

        public_key = {
            "kty": jwk["kty"],
            "kid": jwk["kid"],
            "use": jwk["use"],
            "n": jwk["n"],
            "e": jwk["e"]
        }

        payload = jwt.decode(
            token,
            public_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.get("/protected")
def protected(user=Depends(verify_token)):
    return {"message": f"Welcome {user['email']}"}
