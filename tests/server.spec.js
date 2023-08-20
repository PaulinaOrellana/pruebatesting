const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {
    //1.-
    it("obtener un 200 en cafes y al menos recibir un arreglo con un objeto", async () => {

        const { statusCode, body } = await request(server).get('/cafes').send()

        console.log("Status:", statusCode);
        console.log("Response Body:", body);

        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    })

    //2.-
    it("Obtener 404 al eliminar cafe con id que no existe", async () => {
            const jwt = "token"
            const idcafe = 11
            const { statusCode, body } = await request(server)
                .delete(`/cafes/${idcafe}`)
                .set("Authorization", jwt)
                .send()

            console.log("Response Status Code:", statusCode);
            console.log("Response Body:", body);

            expect(statusCode).toBe(404)
        })
    
    //3.-
    it("Agregar nuevo Cafe y devolver código 201", async () => {
        const id = 635635765
        const cafe = {id, nombre:"Nuevo Café"}
        const { body:cafes, statusCode } = await request(server)
            .post("/cafes")
            .send(cafe); 
        
        console.log("Status Code:", statusCode);
        expect(cafes).toContainEqual(cafe);
        expect(statusCode).toBe(201)
    })

    //4.-
    it("Obtener codigo 400 al intentar actualizar un café enviando id diferente al id del payload", async () => {
        const actualizarCafe = { id: 1, nombre: "Cortado" }
        const response = await request(server)
        .put("/cafes/2")
        .send(actualizarCafe)
        const statusCode = response.statusCode
    
        console.log("Status Code:", statusCode)

        expect(statusCode).toBe(400)
    })
    
});
