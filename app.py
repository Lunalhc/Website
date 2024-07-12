from flask import Flask, request, jsonify

app = Flask(__name__)

def caesar_cipher(text, shift):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if char.isalpha():
            shift_amount = shift % 26
            if char.islower():
                result += chr((ord(char) - ord('a') + shift_amount) % 26 + ord('a'))
            else:
                result += chr((ord(char) - ord('A') + shift_amount) % 26 + ord('A'))
        else:
            result += char
    return result

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    plaintext = data['plaintext']
    shift = data['shift']
    encrypted_text = caesar_cipher(plaintext, int(shift))
    return jsonify({'encrypted': encrypted_text})

if __name__ == '__main__':
    app.run(debug=True)
