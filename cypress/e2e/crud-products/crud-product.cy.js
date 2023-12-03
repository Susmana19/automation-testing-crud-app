describe('Crud App Test', () => {

  const productName = 'Arabica Coffee';
  const productPrice = '25';
  const productCategory = 'coffee';
  const pathproductImage = 'cypress/fixtures/images/arabica.jpg'
  const productImage = 'arabica.jpg';

  const updateProductName = 'Beef Burger';
  const updateProductPrice = '20';
  const updateProductCategory = 'foods';
  const updatePathproductImage = 'cypress/fixtures/images/beefburger.jpg'
  const updateProductImage = 'beefburger.jpg';

  it('Visits the Coffee Shop Crud App', () => {
    cy.visit('/')
    cy.contains('Add New Product').click()

    // button back from add product page
    cy.url().should('include', '/add')
    cy.contains('Back').click()
    cy.url().should('include', '/')

    // button back from edit product page
    cy.contains('Edit').click()
    cy.url().should('include', '/edit')
    cy.contains('Back').click()
    cy.url().should('include', '/')
  })

  it('Add New Product', () => {
    cy.visit('/')
    cy.contains('Add New Product').click()
    cy.url().should('include', '/add')

    // Get an input name of product, type into it
    cy.get('#product-name').type(productName)
    //  Verify that the value has been updated
    cy.get('#product-name').should('have.value', productName)

    // Get an input price of product, type into it
    cy.get('#product-price').type(productPrice)
    //  Verify that the value has been updated
    cy.get('#product-price').should('have.value', productPrice)

    // Get an input category of product, type into it
    cy.get('#product-category').select(productCategory)
    //  Verify that the value has been updated
    cy.get('#product-category').should('have.value', productCategory)

    //get file upload
    cy.get('[type="file"]').selectFile(pathproductImage, {force: true})

    //read file upload
    cy.readFile(pathproductImage, null).then((file) => {
      expect(Cypress.Buffer.isBuffer(file)).to.be.true
    })

    //submit add product
    cy.get("#form-submit").click();
    cy.url().should('include', '/')

    cy.visit('/')
    cy.clock().then((clock) => {
      clock.tick(5000)
    })

    //verify product which has been added is appear 
    cy.get('.product-name').contains(productName)
    cy.get('.product-price').contains(productPrice)
    cy.get('.product-category').contains(productCategory)
    .get('img')
    .invoke('attr', 'src')
    .should('include', productImage)

  })

  it('Edit Product', () => {
    cy.visit('/')
    //edit first index
    cy.get('#edit-0').click();

    // Clear an input
    cy.get('input[name="productName"]').clear();
    cy.get('input[name="productPrice"]').clear();

    // cy.get('#product-name').clear();
    // cy.get('#product-price').clear();

    cy.clock().then((clock) => {
          clock.tick(100000)
    })

    cy.get('input[name="productName"]').should('have.value', '')
    cy.get('input[name="productPrice"]').should('have.value', '')

    // Get an input, type into it
    cy.get('#product-name').type(updateProductName)
    //  Verify that the value has been updated
    cy.get('#product-name').should('have.value', updateProductName)

    // Get an input price of product, type into it
    cy.get('#product-price').type(updateProductPrice)
    //  Verify that the value has been updated
    cy.get('#product-price').should('have.value', updateProductPrice)

    // Get an input category of product, select into it
    cy.get('#product-category').select(updateProductCategory)
    //  Verify that the value has been updated
    cy.get('#product-category').should('have.value', updateProductCategory)

    //get file upload
    cy.get('[type="file"]').selectFile(updatePathproductImage, {force: true})

    //read file upload
    cy.readFile(updatePathproductImage, null).then((file) => {
      expect(Cypress.Buffer.isBuffer(file)).to.be.true
    })

    cy.get("#form-submit").click();
    cy.url().should('include', '/')

    cy.visit('/')
    cy.clock().then((clock) => {
        clock.tick(100000)
    })

    //verify product which has been edited is appear 
    cy.get('.product-name').contains(updateProductName)
    cy.get('.product-price').contains(updateProductPrice)
    cy.get('.product-category').contains(updateProductCategory)
    .get('img')
    .invoke('attr', 'src')
    .should('include', updateProductImage)

  })

  it('Delete Product', () => {
    cy.visit('/')

    //delete first index (product updated)
    cy.get('#delete-0').click();

    //verify product which has been deleted is disappear 
    cy.get('.product-name').should('not.have.text', updateProductName)
    cy.get('.product-price').should('not.have.text', updateProductPrice)
    cy.get('.product-category').should('not.have.text', updateProductCategory)

  })
})