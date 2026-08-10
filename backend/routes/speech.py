from fastapi import APIRouter, UploadFile, HTTPException, status, File

from services.speech_to_text import SpeechToTextError, transcribe_audio

router = APIRouter()


@router.post("/speech/transcribe")
async def transcribe_speech(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No audio file was uploaded.")

    try:
        text = transcribe_audio(file)
        return {"status": "success", "text": text}
    except SpeechToTextError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Speech transcription failed.")
