from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import nltk
nltk.download('words')

from nltk.corpus import words

app = Flask(__name__)
CORS(app)
english_words = set(word.lower() for word in words.words())

@app.route('/')
def home():
    return render_template('index.html')

#-------------------encryption--------------------------------------------------------------------------
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

def affine_encrypt(text, a, b):
    result = ""
    for char in text:
        if char.isalpha():
            base = ord('a') if char.islower() else ord('A')
            result += chr((a * (ord(char) - base) + b) % 26 + base)
        else:
            result += char
    return result

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.get_json()
    method = data.get('method', 'caesar')
    plaintext = data['plaintext']
    if method == 'caesar':
        shift = int(data['shift'])
        encrypted_text = caesar_cipher(plaintext, shift)
    elif method == 'affine':
        a = int(data['a'])
        b = int(data['b'])
        encrypted_text = affine_encrypt(plaintext, a, b)
    else:
        return jsonify({'error': 'Encryption method not supported'}), 400
    return jsonify(encrypted=encrypted_text)


#------------------------------decryption-------------------------------------------------------------
def caesar_decipher(text, shift):
    return caesar_cipher(text, -shift) 

def mod_inverse(a, m):
    # Find the modular inverse of a under modulo m
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return None  # If no modular inverse exists

def affine_decrypt(ciphertext, a, b):
    # Decrypt ciphertext using the affine cipher decryption formula
    result = ""
    a_inv = mod_inverse(a, 26)  # Find the modular inverse of a
    if a_inv is None:
        return "Modular inverse does not exist, decryption not possible"
    
    for char in ciphertext:
        if char.isalpha():
            base = ord('a') if char.islower() else ord('A')
            # Apply the affine decryption formula
            result += chr((a_inv * ((ord(char) - base) - b) % 26) + base)
        else:
            result += char
    return result

@app.route('/decrypt', methods=['POST'])
def decrypt():
    data = request.get_json()
    method = data.get('method', 'caesar')
    ciphertext = data['ciphertext']
    if method == 'caesar':
        shift = int(data['shift'])
        decrypted_text = caesar_decipher(ciphertext, shift)
    elif method == 'affine':
        a = int(data['a'])
        b = int(data['b'])
        decrypted_text = affine_decrypt(ciphertext, a, b)
    else:
        return jsonify({'error': 'Decryption method not supported'}), 400
    return jsonify(decrypted=decrypted_text)


#------------------------------------cracker--------------------------------------------------------

def crack_caesar(cipher_text):
    results = []
    for shift in range(26):
        decoded = caesar_cipher(cipher_text, -shift)
        word_count = sum((word.lower() in english_words) for word in decoded.split())
        results.append({'shift': shift, 'decoded': decoded, 'word_count': word_count})
    # Sort by the number of English words found in descending order
    results.sort(key=lambda x: x['word_count'], reverse=True)
    return results[:3]  

@app.route('/crack', methods=['POST'])
def crack():
    data = request.get_json()
    ciphertext = data['cipher_text']
    method = data.get('method')
    if method == 'caesar':
        possible_texts = crack_caesar(ciphertext)
        return jsonify(possible_texts)
    else:
        return jsonify({'error': f'Cracking method {method} not implemented'}), 501
    

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





# git add .
# git commit -m "message"
# git push heroku main

