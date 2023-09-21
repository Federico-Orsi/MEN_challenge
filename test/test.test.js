import assert from 'assert';
import supertest from 'supertest';
import { PORT } from '../config.js';




const serverBaseUrl = `http://localhost:${PORT}`
const httpClient = supertest(serverBaseUrl)

let token
let postId
let userId
let newPost




describe('Usuario se registra OK', ()=>{

const userCorrecto = {
    "email":"user37@gmail.com",
    "password": "12345"
}


test('Registramos al user. Debe retornar status 200', async ()=>{
  const res = await httpClient.post('/api/auth/register').send(userCorrecto)

  userId = res.body._id

assert.strictEqual(res.statusCode, 200)
})

test('aquí se genera el access token OK', async ()=>{
    const res = await httpClient.post('/api/auth').send(userCorrecto)

  token = res.body.token

  assert.strictEqual(res.statusCode, 200)
  assert.strictEqual(res.body.email, userCorrecto.email)
  })


  test('testing token', async ()=>{
    const res = await httpClient.get('/api/posts').send().set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
})


    test('aqui creamos el nuevo post', async ()=>{

        newPost = {

            title: "yeahhh bitch",
            author: userId,
            body: "dale pablaaaaa"
        }
        const res = await httpClient.post('/api/posts').send(newPost).set('Authorization', `Bearer ${token}`)
        postId = res.body.newPost._id

        expect(res.statusCode).toBe(200)
    })


    test('aqui generamos un comentario para un post específico de un user en particular', async ()=>{

     const newComment = {comment: "vamoooos Che!!"}

     const res = await httpClient.post(`/api/posts/addComments/${postId}/${userId}`).send(newComment).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.author).toBe(userId)
        expect(res.body._id).toBe(postId)

    })

})


describe('Unhappy path!! Aquí comprobamos que se ejecuten algunos errores correctamente', ()=>{

    const userIncorrecto = {
        "email":"blabla",
        "password": "xxx"
    }

    test('Usuario intenta registrarse con datos incorrectos. Debe retornar status 500', async ()=>{
        const res = await httpClient.post('/api/auth/register').send(userIncorrecto)

        expect(res.statusCode).toBe(500)

      })


      test('Usuario intenta acceder a una ruta restringida sin tener el token adecuado. Debe retornar 401', async ()=>{
        const res = await httpClient.get('/api/users/me')

        expect(res.statusCode).toBe(401)

      })




    })





