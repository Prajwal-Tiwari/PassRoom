# encryption.py

import sys

def encrypt(text):
    return ''.join(chr(ord(c) + 2) for c in text)  # simple Caesar cipher +2

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        print(encrypt(input_text))
    else:
        print("No input")
