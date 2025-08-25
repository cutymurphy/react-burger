import { localUrl } from "../../src/utils/localUrl";

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit(localUrl);
  });
});
