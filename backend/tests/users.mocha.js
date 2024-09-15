import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users API', () => {
  let token; // Guardar el token de autenticación para las pruebas
  let dynamicEmail = `felipe.${new Date().toISOString().replace(/:/g, '').slice(0, 19)}@example.com`; // Generar email dinámico
  let userId; // Guardar el ID del usuario creado

  // Test para registrar un nuevo usuario
  it('Debe registrar un nuevo usuario', (done) => {
    const newUser = {
      name: "Felipe",
      email: dynamicEmail, // Usa un email dinámico único para cada prueba
      password: "123456",
      profile_image_url: "http://example.com/profile.jpg",
    };

    chai.request(app)
      .post('/api/users/register')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(newUser.name);
        expect(res.body.email).to.equal(newUser.email);
        userId = res.body.id;
        done();
      });
  });

  // Test para iniciar sesión
  it('Debe iniciar sesión correctamente y devolver un token', (done) => {
    const loginCredentials = {
      email: dynamicEmail, // Usar el mismo email dinámico que en el registro
      password: "123456",
    };

    chai.request(app)
      .post('/api/users/login')
      .send(loginCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token; // Guardamos el token para pruebas posteriores
        done();
      });
  });

  // Test para obtener el perfil del usuario autenticado
  it('Debe obtener el perfil del usuario autenticado', (done) => {
    chai.request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`) // Usar el token para autenticación
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
        expect(res.body.email).to.equal(dynamicEmail); // Validar el email del usuario autenticado
        done();
      });
  });

  // Test para actualizar solo el nombre del usuario autenticado
  it('Debe actualizar el nombre del usuario', (done) => {
    const updatedUser = {
      name: "Felipe Actualizado",
    };

    chai.request(app)
      .patch('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(updatedUser.name); // Validar el nombre actualizado
        done();
      });
  });
});
