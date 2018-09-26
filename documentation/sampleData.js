'use strict';

const sampleData = {
  userId: 123456789012,
  razors: [
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Gillette',
        model: 'Tech Travel'
      },
      comment: '1964 vintage',
      nickname: 'Gillette Tech Travel'
    },
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Above the Tie',
        model: 'Calypso R1'
      },
      comment: '',
      nickname: 'ATT Calypso R1'
    },
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Merkur',
        model: '34c'
      },
      comment: '',
      nickname: 'Merkur 34c'
    },
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Rockwell',
        model: '6S'
      },
      comment: 'R5',
      nickname: 'Rockwell 6S R5'
    },
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Above the Tie',
        model: 'Calypso M1'
      },
      comment: '',
      nickname: 'ATT Calypso M1'
    },
    {
      productId: {
        type: 'Straight',
        productType: 'razor',
        brand: 'Globusmen',
        model: 'Gold No.46'
      },
      comment: 'vintage German-made blade',
      nickname: 'Globusmen Straight'
    },
    {
      productId: {
        type: 'Double Edge',
        productType: 'razor',
        brand: 'Muhle',
        model: 'R108 Tortoise Shell'
      },
      comment: 'closed comb',
      nickname: 'Muhle Tortoise'
    },
  ],
  blades: [
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Gillette',
        model: 'Wilkinson'
      },
      comment: '',
      nickname: 'Gillette Wilkinson'
    },
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Gillette',
        model: 'Silver Blue'
      },
      comment: '',
      nickname: 'GSB'
    },
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Feather',
        model: 'Hi-STAINLESS'
      },
      comment: '',
      nickname: 'Feather'
    },
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Astra',
        model: 'Superior Platinum'
      },
      comment: '',
      nickname: 'Astra SP'
    },
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Gillette',
        model: '7 O\'Clock SharpEdge'
      },
      comment: '',
      nickname: 'Gillette 7 O\'Clock'
    },
    {
      productId: {
        type: null,
        productType: 'blade',
        brand: 'Polsilver',
        model: 'Super Iridium'
      },
      comment: '',
      nickname: 'Polsilver - Super Iridium'
    },
  ],
  brushes: [
    {
      productId: {
        type: 'Boar',
        productType: 'brush',
        brand: 'Surrey',
        model: '34014 Deluxe'
      },
      comment: '',
      nickname: 'Surrey 34014 Deluxe'
    },
    {
      productId: {
        type: 'Boar',
        productType: 'brush',
        brand: 'Semogue',
        model: 'Brushbutt 22mm'
      },
      comment: 'Limited Edition #78/100',
      nickname: 'Brushbutt LE'
    },
    {
      productId: {
        type: 'Synthetic',
        productType: 'brush',
        brand: 'RazoRock',
        model: 'Plissoft Monster'
      },
      comment: '',
      nickname: 'RazoRock Plissoft Monster'
    },
    {
      productId: {
        type: 'Synthetic',
        productType: 'brush',
        brand: 'Turtleship Shave Co',
        model: 'Admiral Blue'
      },
      comment: '24mm',
      nickname: 'TSC Admiral Blue 24mm'
    },
    {
      productId: {
        type: 'Badger',
        productType: 'brush',
        brand: 'Kent',
        model: 'BK8'
      },
      comment: '',
      nickname: 'Kent BK8'
    },
    {
      productId: {
        type: 'Badger',
        productType: 'brush',
        brand: 'Stirling Soap Company',
        model: 'Finest Badger Shave Brush'
      },
      comment: '26mm',
      nickname: 'Stirling Badger'
    },
  ],
  lathers: [
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Stirling Soap Company',
        model: 'Barbershop'
      },
      comment: '',
      nickname: 'Stirling\'s Barbershop'
    },
    {
      productId: {
        type: 'Cream',
        productType: 'lather',
        brand: 'L\'Occitane',
        model: 'Cade'
      },
      comment: '',
      nickname: 'L\'Occitane Cade Rich'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Chiseled Face',
        model: 'Cryogen'
      },
      comment: 'sampler',
      nickname: 'Chiseled Face Cryogen'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Lavanille'
      },
      comment: 'tre Citta Line',
      nickname: 'B&M Lavanille'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Leviathan'
      },
      comment: 'leather | coffee | sandalwood',
      nickname: 'B&M Leviathan'
    },
    {
      productId: {
        type: 'Cream',
        productType: 'lather',
        brand: 'Proraso',
        model: 'Green'
      },
      comment: 'horrible, no slickness',
      nickname: 'Proraso Green'
    },
    {
      productId: {
        type: 'Cream',
        productType: 'lather',
        brand: 'Above the Tie',
        model: 'Lavendar & Lemonade'
      },
      comment: 'awesome',
      nickname: 'ATT Lemonade'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Roam'
      },
      comment: 'Tobacco | Thyme | Grass | Damp Earth | Wood Smoke',
      nickname: 'B&M Roam'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Black Ship Grooming',
        model: 'Captain Joe'
      },
      comment: '',
      nickname: 'Black Ship Grooming Captain Joe'
    },
    {
      productId: {
        type: 'Soap',
        productType: 'lather',
        brand: 'Declaration Grooming',
        model: 'Reserve Lavender'
      },
      comment: '',
      nickname: 'Declaration Grooming - Reserve Lavender'
    },
  ],
  aftershaves: [
    {
      productId: {
        type: 'Splash',
        productType: 'aftershave',
        brand: 'Brut',
        model: 'Classic'
      },
      comment: '',
      nickname: 'Brut Classic'
    },
    {
      productId: {
        type: 'Splash',
        productType: 'aftershave',
        brand: 'Chatillon Lux',
        model: 'Taum Sauk'
      },
      comment: '',
      nickname: 'CL-Taum Sauk'
    },
    {
      productId: {
        type: 'Splash',
        productType: 'aftershave',
        brand: 'Barrister and Mann',
        model: 'Lavanille'
      },
      comment: '',
      nickname: 'Lavanille Splash'
    },
    {
      productId: {
        type: 'Splash',
        productType: 'aftershave',
        brand: 'Barrister and Mann',
        model: 'Leviathan'
      },
      comment: '',
      nickname: 'Leviathan Splash'
    },
    {
      productId: {
        type: 'Balm',
        productType: 'aftershave',
        brand: 'Stirling Soap Company',
        model: 'Sandalwood'
      },
      comment: '',
      nickname: 'Stirling Sandalwood Balm'
    },
    {
      productId: {
        type: 'Balm',
        productType: 'aftershave',
        brand: 'Black Ship Grooming',
        model: 'Captain Joe'
      },
      comment: '',
      nickname: 'Black Ship Grooming Captain Joe'
    },
  ],
  additionalcares: [
    {
      productId: {
        type: null,
        productType: 'additionalcare',
        brand: 'Proraso',
        model: 'Green'
      },
      comment: '',
      nickname: 'Proraso Green'
    },
    {
      productId: {
        type: null,
        productType: 'additionalcare',
        brand: 'Thayers',
        model: 'Witch Hazel'
      },
      comment: '',
      nickname: 'Thayers Witch Hazel'
    },
    {
      productId: {
        type: null,
        productType: 'additionalcare',
        brand: 'Stirling Soap Company',
        model: 'Red Delicious - Bath Soap'
      },
      comment: '',
      nickname: 'Stirling Red Delicious Bath Soap'
    },
  ]
};