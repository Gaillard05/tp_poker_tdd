type Carte = string;

// Tableau des valeurs des cartes du poker (rangs)
const ordreDesCartes: { [key: string]: number } = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  V: 11,
  Re: 12,
  Ro: 13,
  A: 14,
};

// Fonction pour obtenir la valeur numérique d'une carte
function getCardValue(carte: Carte): number {
  const value = carte.slice(0, -1); // Enlever la couleur
  return ordreDesCartes[value] || 0;
}

// Fonction pour obtenir la couleur d'une carte
function getCardSuit(carte: Carte): string {
  return carte.slice(-1); // La couleur est le dernier caractère de la carte
}

// Fonction qui détermine le type de la main et sa valeur (score)
function getMainValue(main: Carte[]): {
  score: number;
  tieBreaker: number[];
  isRoyal: boolean;
  couleur: string;
} {
  if (isRoyalFlush(main)) {
    return {
      score: 10,
      tieBreaker: getTieBreaker(main),
      isRoyal: true,
      couleur: getCardSuit(main[0]),
    };
  }
  if (isStraightFlush(main)) {
    return {
      score: 9,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: getCardSuit(main[0]),
    };
  }
  if (isFourOfAKind(main)) {
    return {
      score: 8,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  if (isFullHouse(main)) {
    return {
      score: 7,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  if (isFlush(main)) {
    return {
      score: 6,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: getCardSuit(main[0]),
    };
  }
  if (isStraight(main)) {
    return {
      score: 5,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  if (isThreeOfAKind(main)) {
    return {
      score: 4,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  if (isTwoPair(main)) {
    return {
      score: 3,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  if (isOnePair(main)) {
    return {
      score: 2,
      tieBreaker: getTieBreaker(main),
      isRoyal: false,
      couleur: "",
    };
  }
  return {
    score: 1,
    tieBreaker: getTieBreaker(main),
    isRoyal: false,
    couleur: "",
  }; // High Card
}

// Détection d'une Quinte Flush Royale (Royal Flush)
function isRoyalFlush(main: Carte[]): boolean {
  const royalCards = ["A", "V", "Re", "Ro", "10"];
  return (
    isFlush(main) &&
    royalCards.every((card) => main.some((c) => c.startsWith(card)))
  );
}

// Détection d'une Quinte Flush (Straight Flush)
function isStraightFlush(main: Carte[]): boolean {
  return isFlush(main) && isStraight(main);
}

// Détection d'une Couleur (Flush)
function isFlush(main: Carte[]): boolean {
  const couleurs = main.map(getCardSuit); // Extraire la couleur
  return new Set(couleurs).size === 1;
}

// Détection d'une Suite (Straight)
function isStraight(main: Carte[]): boolean {
  const valeurs = main.map(getCardValue).sort((a, b) => a - b);
  return valeurs[4] - valeurs[0] === 4 && new Set(valeurs).size === 5;
}

// Détection d'un Carré (Four of a Kind)
function isFourOfAKind(main: Carte[]): boolean {
  const count = getRankCount(main);
  return Object.values(count).includes(4);
}

// Détection d'un Full (Full House)
function isFullHouse(main: Carte[]): boolean {
  const count = getRankCount(main);
  return Object.values(count).includes(3) && Object.values(count).includes(2);
}

// Détection d'un Brelan (Three of a Kind)
function isThreeOfAKind(main: Carte[]): boolean {
  const count = getRankCount(main);
  return Object.values(count).includes(3);
}

// Détection de Deux Paires (Two Pair)
function isTwoPair(main: Carte[]): boolean {
  const count = getRankCount(main);
  return Object.values(count).filter((val) => val === 2).length === 2;
}

// Détection d'une Paire (One Pair)
function isOnePair(main: Carte[]): boolean {
  const count = getRankCount(main);
  return Object.values(count).includes(2);
}

// Obtenir les comptages des rangs des cartes
function getRankCount(main: Carte[]): { [key: number]: number } {
  return main.reduce((acc, carte) => {
    const value = getCardValue(carte);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });
}

// Obtenir le tie breaker, qui est l'ordre des cartes restantes pour départager
function getTieBreaker(main: Carte[]): number[] {
  return main.map(getCardValue).sort((a, b) => b - a);
}

// Fonction pour comparer les deux mains
export function comparerMain(main1: Carte[], main2: Carte[]): string {
  const main1Value = getMainValue(main1);
  const main2Value = getMainValue(main2);

  // Si les deux mains sont des Quintes Flush Royales
  if (main1Value.score === 10 && main2Value.score === 10) {
    return "C'est une égalité"; // Toujours égalité pour les deux Quintes Flush Royales
  }

  // Comparaison des scores de chaque main
  if (main1Value.score > main2Value.score) {
    return "Main 1 gagne";
  } else if (main1Value.score < main2Value.score) {
    return "Main 2 gagne";
  }

  // Si les scores sont égaux, on compare les tie breakers
  for (let i = 0; i < main1Value.tieBreaker.length; i++) {
    if (main1Value.tieBreaker[i] > main2Value.tieBreaker[i]) {
      return "Main 1 gagne";
    } else if (main1Value.tieBreaker[i] < main2Value.tieBreaker[i]) {
      return "Main 2 gagne";
    }
  }

  return "C'est une égalité"; // Si tout est égal
}
