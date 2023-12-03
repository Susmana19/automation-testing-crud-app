context("GET /products", () => {
    it("gets a list of products", () => {
      cy.request("GET", "http://localhost:5000/api/v1/products").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data).length.to.be.greaterThan(1)
      })
    })
  })