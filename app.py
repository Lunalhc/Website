from flask import Flask, render_template, request, jsonify
import string
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from nltk.corpus import words
english_words = set(word.lower() for word in words.words())

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

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    ciphertext = data['ciphertext']
    shift = int(data['shift'])
    decrypted_text = caesar_decipher(ciphertext, shift)
    return jsonify(decrypted=decrypted_text)

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

def caesar_decipher(text, shift):
    return caesar_cipher(text, -shift) 

#---------------------------------------------------------------------------------------
@app.route('/crack', methods=['POST'])
def crack():
    data = request.get_json()
    ciphertext = data['cipher_text']
    possible_texts = crack_caesar(ciphertext)
    return jsonify(possible_texts)

def crack_caesar(cipher_text):
    results = []
    for shift in range(26):
        decoded = caesar_cipher(cipher_text, -shift)
        word_count = sum((word.lower() in english_words) for word in decoded.split())
        results.append({'shift': shift, 'decoded': decoded, 'word_count': word_count})
    # Sort by the number of English words found in descending order
    results.sort(key=lambda x: x['word_count'], reverse=True)
    return results[:3]  # Return top 5 possible decryptions
#-----------------------------------------------------------------------------------------------------------------------------

@app.route('/concepts')
def concepts():
    return render_template('concepts.html')

@app.route('/flowchart')
def flowchart():
    return render_template('flowchart.html')

@app.route('/moreinfo')
def moreinfo():
    return render_template('moreinfo.html')

#---------------------------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)


