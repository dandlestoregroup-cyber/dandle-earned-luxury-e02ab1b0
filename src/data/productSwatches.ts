/* Updated per user spec: specific swatches for all products including new RelaxMax Limited */

// Each product gets specific colors from PALETTE_14
export const productSwatches: Record<string, string[]> = {
  'relaxmax': ['cognac-leather', 'alexandria-linen', 'mocha-taupe', 'coastal-fog', 'nile-mist', 'oasis-green'],
  'relaxmax-limited': ['camel-leather', 'cognac-leather', 'espresso-brown'],
  'spacesaver': ['mocha-taupe', 'coastal-fog', 'desert-grey', 'terracotta', 'offwhite'],
  'comfortplus': ['alexandria-linen', 'desert-grey', 'amber-sand', 'coastal-fog', 'papyrus-stripe', 'clay-pottery', 'mocha-taupe'],
  // DIVA: Terracotta, Desert Sage, Giza Gold, Oasis Green, Red
  'diva': ['terracotta', 'desert-sage', 'giza-gold', 'oasis-green', 'nile-sapphire', 'alexandria-linen'],
  // COZYCOMPANION: Mocha Taupe, Sandstorm Ochre, Coastal Fog
  'cozycompanion': ['mocha-taupe', 'sandstorm-ochre', 'coastal-fog', 'papyrus-stripe', 'oasis-green', 'amber-sand'],
  'easyup': ['coastal-fog', 'mocha-taupe', 'oasis-green', 'desert-grey', 'alexandria-linen', 'papyrus-stripe', 'nile-sapphire'],
  'easyup-compact': ['charcoal', 'desert-grey', 'mocha-taupe'], // Limited to 3 colors (OMASH Damsuk)
  // WORKNEST: Oasis Green, Desert Grey, Blue Nile, Mocha Taupe, Alexandria Linen
  'worknest': ['oasis-green', 'desert-grey', 'blue-nile-denim', 'mocha-taupe', 'coastal-fog', 'alexandria-linen'],
  // COMPLETE SET: Family Modern, Alexandria Linen, Coastal Fog
  'complete-set': ['family-modern', 'alexandria-linen', 'coastal-fog', 'oasis-green', 'giza-gold', 'blue-nile-denim'],
};
