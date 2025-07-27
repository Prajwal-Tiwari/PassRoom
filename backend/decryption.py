# decryption.py

import sys

def decrypt(text):
    return ''.join(chr(ord(c) - 2) for c in text)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        print(decrypt(input_text))
    else:
        print("No input")