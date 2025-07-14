# Create a Deck class to model a deck of cards, with shuffling and drawing functionality.

import random

class Deck:
    def __init__(self):
        """Initialize a standard 52-card deck"""
        self.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        self.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 
                     'Jack', 'Queen', 'King', 'Ace']
        self.cards = []
        self.reset()
    
    def reset(self):
        """Reset the deck to a full, unshuffled 52-card deck"""
        self.cards = [(rank, suit) for suit in self.suits for rank in self.ranks]
        self.discarded = []
    
    def shuffle(self):
        """Shuffle the deck using Fisher-Yates algorithm"""
        for i in range(len(self.cards)-1, 0, -1):
            j = random.randint(0, i)
            self.cards[i], self.cards[j] = self.cards[j], self.cards[i]
    
    def draw(self, num=1):
        """
        Draw cards from the top of the deck
        
        Args:
            num (int): Number of cards to draw (default 1)
            
        Returns:
            list: List of drawn cards (as tuples)
            
        Raises:
            ValueError: If trying to draw more cards than available
        """
        if num > len(self.cards):
            raise ValueError(f"Not enough cards in deck (tried to draw {num}, only {len(self.cards)} left)")
        
        drawn = self.cards[:num]
        self.cards = self.cards[num:]
        return drawn
    
    def discard(self, cards):
        """Add cards to the discard pile"""
        self.discarded.extend(cards)
    
    def reshuffle_discarded(self):
        """Add discarded cards back to the deck and shuffle"""
        self.cards.extend(self.discarded)
        self.discarded = []
        self.shuffle()
    
    def peek(self, num=1):
        """
        Look at the top cards without drawing them
        
        Args:
            num (int): Number of cards to peek at (default 1)
            
        Returns:
            list: List of cards (as tuples)
        """
        return self.cards[:num]
    
    def remaining_cards(self):
        """Return the number of cards remaining in the deck"""
        return len(self.cards)
    
    def __str__(self):
        """String representation of the deck"""
        return f"Deck with {self.remaining_cards()} cards remaining"
    
    def __repr__(self):
        """Official string representation"""
        return f"Deck(cards={self.cards}, discarded={self.discarded})"


# Example usage
if __name__ == "__main__":
    # Create and shuffle a deck
    deck = Deck()
    print("Fresh deck created")
    print(f"Cards remaining: {deck.remaining_cards()}")
    
    deck.shuffle()
    print("\nDeck shuffled")
    
    # Draw some cards
    hand = deck.draw(5)
    print("\nDrew 5 cards:")
    for i, card in enumerate(hand, 1):
        print(f"{i}. {card[0]} of {card[1]}")
    
    print(f"\nCards remaining: {deck.remaining_cards()}")
    
    # Discard some cards
    deck.discard(hand[:2])
    print(f"\nDiscarded 2 cards, {deck.remaining_cards()} remain in deck")
    
    # Peek at next card
    next_card = deck.peek()[0]
    print(f"\nNext card will be: {next_card[0]} of {next_card[1]}")
    
    # Reshuffle discarded cards
    deck.reshuffle_discarded()
    print("\nReshuffled discard pile into deck")
    print(f"Cards remaining: {deck.remaining_cards()}")
    
    # Reset the deck
    deck.reset()
    print("\nDeck reset to full 52 cards")
    print(f"Cards remaining: {deck.remaining_cards()}")