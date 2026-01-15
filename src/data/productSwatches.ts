/* Updated per user spec: specific swatches for DIVA, WORKNEST, COZYCOMPANION, COMPLETE SET */

// Each product gets specific colors from PALETTE_14
export const productSwatches: Record<string, string[]> = {
  'relaxmax': ['nile-sapphire', 'alexandria-linen', 'desert-sage', 'mocha-taupe', 'nile-mist', 'giza-gold', 'oasis-green'],
  'comfortplus': ['alexandria-linen', 'desert-grey', 'amber-sand', 'coastal-fog', 'papyrus-stripe', 'clay-pottery', 'mocha-taupe'],
  // DIVA: Sapphire Blue, Amber Sand, Desert Grey, Terracotta, Giza Gold, Alexandria Linen
  'diva': ['nile-sapphire', 'amber-sand', 'desert-grey', 'nile-mist', 'giza-gold', 'alexandria-linen'],
  // COZYCOMPANION: Mocha Taupe, Sandstorm Ochre, Clay Pottery, Papyrus Stripe, Oasis Green, Amber Sand
  'cozycompanion': ['mocha-taupe', 'sandstorm-ochre', 'clay-pottery', 'papyrus-stripe', 'oasis-green', 'amber-sand'],
  'easyup': ['desert-grey', 'coastal-fog', 'mocha-taupe', 'amber-sand', 'alexandria-linen', 'papyrus-stripe', 'nile-sapphire'],
  'easyup-compact': ['nile-sapphire', 'desert-grey', 'mocha-taupe'], // Limited to 3 colors: Navy Blue, Stone Grey, Espresso Brown
  // WORKNEST: Desert Grey, Coastal Fog, Desert Sage, Blue Nile, Mocha Taupe, Alexandria Linen
  'worknest': ['desert-grey', 'coastal-fog', 'desert-sage', 'blue-nile-denim', 'mocha-taupe', 'alexandria-linen'],
  'spacesaver': ['nile-mist', 'alexandria-linen', 'desert-sage', 'papyrus-stripe', 'amber-sand', 'giza-gold', 'sandstorm-ochre'],
  // COMPLETE SET: Alexandria Linen, Coastal Fog, Nile Sapphire, Oasis Green, Giza Gold, Blue Nile
  'complete-set': ['alexandria-linen', 'coastal-fog', 'nile-sapphire', 'oasis-green', 'giza-gold', 'blue-nile-denim'],
};
