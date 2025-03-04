const { comparerMain } = require("../poker"); // Assurez-vous que le chemin correspond à votre fichier de logique poker.

describe("Tests de comparaison de mains de poker", () => {
  test("Deux quinte flush royale : égalité", () => {
    const main1 = ["As♠", "R♠", "D♠", "V♠", "10♠"];
    const main2 = ["As♥", "R♥", "D♥", "V♥", "10♥"];
    expect(comparerMain(main1, main2)).toBe("C'est une égalité");
  });

  test("Quinte Flush vs Carré : Quinte Flush gagne", () => {
    const main1 = ["9♠", "8♠", "7♠", "6♠", "5♠"];
    const main2 = ["7♥", "7♦", "7♠", "7♣", "9♠"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Carré vs Full : Carré gagne", () => {
    const main1 = ["7♠", "7♥", "7♦", "7♣", "9♠"];
    const main2 = ["10♠", "10♥", "10♦", "4♣", "4♠"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Full House vs Quinte : Full House gagne", () => {
    const main1 = ["10♠", "10♥", "10♦", "4♣", "4♠"];
    const main2 = ["9♠", "8♠", "7♠", "6♠", "5♠"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Couleur vs Quinte : Quinte gagne", () => {
    const main1 = ["9♠", "8♠", "7♠", "6♠", "5♠"];
    const main2 = ["As♣", "10♣", "7♣", "6♣", "2♣"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Brelan vs Paire : Brelan gagne", () => {
    const main1 = ["8♠", "8♦", "8♣", "K♠", "3♣"];
    const main2 = ["10♠", "10♥", "K♠", "4♣", "3♦"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Deux Paires vs Paire : Deux Paires gagne", () => {
    const main1 = ["J♠", "J♦", "4♠", "4♥", "A♠"];
    const main2 = ["10♠", "10♥", "K♠", "4♣", "3♦"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Paire vs Carte Haute : Paire gagne", () => {
    const main1 = ["10♠", "10♥", "K♠", "4♣", "3♦"];
    const main2 = ["A♠", "K♣", "7♦", "5♠", "3♣"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Carte Haute vs Carte Haute : départage avec carte la plus haute", () => {
    const main1 = ["A♠", "K♠", "7♦", "5♠", "3♣"];
    const main2 = ["A♣", "K♣", "7♦", "5♠", "2♠"];
    expect(comparerMain(main1, main2)).toBe("Main 1 gagne");
  });

  test("Carte Haute : égalité avec mêmes cartes", () => {
    const main1 = ["A♠", "K♠", "7♦", "5♠", "3♣"];
    const main2 = ["A♠", "K♠", "7♦", "5♠", "3♣"];
    expect(comparerMain(main1, main2)).toBe("C'est une égalité");
  });
});
