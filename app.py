from flask import Flask, render_template, request, jsonify

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    plaintext = data['plaintext']
    shift = int(data['shift'])
    encrypted_text = caesar_cipher(plaintext, shift)
    return jsonify(encrypted=encrypted_text)

def caesar_cipher(text, shift):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if char.isalpha():  # Check if it's a letter
            # Shift characters and ensure it wraps around the alphabet
            shift_amount = shift % 26
            if char.islower():
                result += chr((ord(char) - 97 + shift_amount) % 26 + 97)
            else:
                result += chr((ord(char) - 65 + shift_amount) % 26 + 65)
        else:
            # If it's not a letter, just add it as is
            result += char
    return result


if __name__ == "__main__":
    app.run(debug=True)
