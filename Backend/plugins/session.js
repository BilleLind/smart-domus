const cookie = require('fastify-cookie')
const fastifySession = require('fastify-session')
const csrf = require('fastify-csrf', {sessionPlugin: 'fastify-session'})
const fp = require('fastify-plugin')

async function session(fastify, opts){
    fastify.register(cookie)
    .register(fastifySession, {
        secret: process.env.SESSION_SECRET,    
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development'
        }
    }).register(csrf)
}

module.exports = {session}

/* This instead 
https://javascript.plainenglish.io/how-to-build-a-reliable-authentication-api-with-fastify-c5a24bf8cd41 */