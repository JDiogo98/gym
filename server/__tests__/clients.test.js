const request = require("supertest");
const app = require("../app");

describe("Clientes API", () => {
  test("Deve retornar a lista de clientes", async () => {
    const response = await request(app).get("/api/clients");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy(); 
  });
});
