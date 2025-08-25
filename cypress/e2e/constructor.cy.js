describe("Burger Constructor Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as(
      "getIngredients"
    );
    cy.intercept("POST", "/api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    cy.window().then((win) => {
      win.localStorage.setItem("refreshToken", "mockedRefreshToken");
      win.localStorage.setItem("accessToken", "mockedAccessToken");
    });

    cy.visit("http://localhost:3000");
    cy.wait("@getIngredients");
  });

  it("Открытие модального окна с описанием ингредиента и разные виды закрытия", () => {
    cy.get("[data-testid=ingredient-card]").first().as("card");

    cy.get("@card").click();
    cy.get("[data-testid=modal]")
      .should("be.visible")
      .should("contain.text", "Флюоресцентная булка R2-D3");
    cy.get("[data-testid=modal-close]").click();
    cy.get("[data-testid=modal]").should("not.exist");

    cy.get("@card").click();
    cy.get("[data-testid=modal]")
      .should("be.visible")
      .should("contain.text", "Флюоресцентная булка R2-D3");
    cy.get("[data-testid=modal-overlay]").click("topRight");
    cy.get("[data-testid=modal]").should("not.exist");

    cy.get("@card").click();
    cy.get("[data-testid=modal]")
      .should("be.visible")
      .should("contain.text", "Флюоресцентная булка R2-D3");
    cy.get("body").type("{esc}");
    cy.get("[data-testid=modal]").should("not.exist");
  });

  it("Перетаскивание ингредиента в конструктор и открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»", () => {
    cy.get('[data-testid="ingredient-bun"]').first().trigger("dragstart");
    cy.get('[data-testid="constructor"]').trigger("drop");

    cy.get('[data-testid="ingredient-sauce"]').first().trigger("dragstart");
    cy.get('[data-testid="constructor"]').trigger("drop");

    cy.get('[data-testid="ingredient-main"]').first().trigger("dragstart");
    cy.get('[data-testid="constructor"]').trigger("drop");

    cy.get('[data-testid="constructor-bun-top"]').should("exist");
    cy.get('[data-testid="constructor-bun-bottom"]').should("exist");
    cy.get('[data-testid="constructor-item"]').should("exist");

    cy.get("button")
      .contains("Оформить заказ")
      .should("not.be.disabled")
      .click();

    cy.wait("@postOrder");
    cy.get('[data-testid="modal"]')
      .should("be.visible")
      .contains("идентификатор заказа");

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });
});
