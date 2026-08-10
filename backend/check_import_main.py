import importlib, traceback
try:
    importlib.import_module('main')
    print('imported main')
except Exception:
    traceback.print_exc()
