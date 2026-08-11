from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_transcribe_no_file():
    resp = client.post("/api/speech/transcribe")
    assert resp.status_code == 422 or resp.status_code == 400


def test_transcribe_invalid_file(tmp_path):
    # create a dummy text file to upload
    f = tmp_path / "not_audio.txt"
    f.write_text("hello")
    with open(f, "rb") as fh:
        resp = client.post("/api/speech/transcribe", files={"file": ("not_audio.txt", fh, "text/plain")})
    assert resp.status_code == 400
