import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Asegúrate de que la ruta sea correcta

const { expect } = chai;
chai.use(chaiHttp);

describe('Instrumentos API', () => {
  let instrumentId; // Guardar ID del instrumento creado

  it('Debe crear un nuevo instrumento', (done) => {
    const newInstrument = {
      name: "Bajo Eléctrico",
      description: "Bajo con 4 cuerdas, de cuerpo sólido",
      price: 400,
      stock: 100,
      category: "Bajos",
      image_url: "http://example.com/bajo.jpg"
    };

    chai.request(app)
      .post('/api/instruments')
      .send(newInstrument)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(newInstrument.name);
        instrumentId = res.body.id;
        done();
      });
  });

  it('Debe actualizar el stock del instrumento', (done) => {
    const updatedStock = { stock: 150 };

    chai.request(app)
      .patch(`/api/instruments/${instrumentId}`)
      .send(updatedStock)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stock).to.equal(150);
        done();
      });
  });

  it('Debe eliminar el instrumento', (done) => {
    chai.request(app)
      .delete(`/api/instruments/${instrumentId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('No debe encontrar el instrumento eliminado', (done) => {
    chai.request(app)
      .get(`/api/instruments/${instrumentId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
