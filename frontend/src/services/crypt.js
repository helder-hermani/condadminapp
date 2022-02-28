import React from 'react';
const crypto = require('crypto');

export function gerarSalt(){
    return crypto.randomBytes(Math.ceil(6/2))
        .toString('hex')
        .slice(0,16);
};

export function gerarHash(senha, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(senha);
    var hash = hash.digest('hex');
    return {
        salt,
        hash,
    };
};

// Validar senha (login)
export function validateLogin(senhaDoLogin, saltNoBanco, hashNoBanco) {
    var senhaESalt = gerarHash(senhaDoLogin, saltNoBanco)
    return hashNoBanco === senhaESalt.hash;
}

// export default {gerarSalt, gerarHash, validateLogin};