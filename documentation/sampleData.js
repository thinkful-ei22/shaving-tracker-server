'use strict';

const sampleData = {
  userId: 123456789012,
  razors: [
    {
      productId: {
        subtype: 'Double Edge',
        productType: 'razor',
        brand: 'Gillette',
        model: 'Tech Travel'
      },
      comment: '1964 vintage',
      nickname: 'Gillette Tech Travel'
    },
    {
      productId: {
        subtype: 'Double Edge',
        productType: 'razor',
        brand: 'Above the Tie',
        model: 'Calypso R1'
      },
      comment: '',
      nickname: 'ATT Calypso R1'
    },
    {
      productId: {
        subtype: 'Double Edge',
        productType: 'razor',
        brand: 'Merkur',
        model: '34c'
      },
      comment: '',
      nickname: 'Merkur 34c'
    },
    {
      productId: {
        subtype: 'Double Edge',
        productType: 'razor',
        brand: 'Rockwell',
        model: '6S'
      },
      comment: 'R5',
      nickname: 'Rockwell 6S R5'
    },
    {
      productId: {
        subtype: 'Double Edge',
        productType: 'razor',
        brand: 'Above the Tie',
        model: 'Calypso M1'
      },
      comment: '',
      nickname: 'ATT Calypso M1'
    },
    {
      productId: {
        subtype: 'Straight',
        productType: 'razor',
        brand: 'Globusmen',
        model: 'Gold No.46'
      },
      comment: 'vintage German-made blade',
      nickname: 'Globusmen Straight'
    },
    {
      productId: {
        subtype: 'Double Edge',
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
        subtype: null,
        productType: 'blade',
        brand: 'Gillette',
        model: 'Wilkinson'
      },
      comment: '',
      nickname: 'Gillette Wilkinson'
    },
    {
      productId: {
        subtype: null,
        productType: 'blade',
        brand: 'Gillette',
        model: 'Silver Blue'
      },
      comment: '',
      nickname: 'GSB'
    },
    {
      productId: {
        subtype: null,
        productType: 'blade',
        brand: 'Feather',
        model: 'Hi-STAINLESS'
      },
      comment: '',
      nickname: 'Feather'
    },
    {
      productId: {
        subtype: null,
        productType: 'blade',
        brand: 'Astra',
        model: 'Superior Platinum'
      },
      comment: '',
      nickname: 'Astra SP'
    },
    {
      productId: {
        subtype: null,
        productType: 'blade',
        brand: 'Gillette',
        model: '7 O\'Clock SharpEdge'
      },
      comment: '',
      nickname: 'Gillette 7 O\'Clock'
    },
    {
      productId: {
        subtype: null,
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
        subtype: 'Boar',
        productType: 'brush',
        brand: 'Surrey',
        model: '34014 Deluxe'
      },
      comment: '',
      nickname: 'Surrey 34014 Deluxe'
    },
    {
      productId: {
        subtype: 'Boar',
        productType: 'brush',
        brand: 'Semogue',
        model: 'Brushbutt 22mm'
      },
      comment: 'Limited Edition #78/100',
      nickname: 'Brushbutt LE'
    },
    {
      productId: {
        subtype: 'Synthetic',
        productType: 'brush',
        brand: 'RazoRock',
        model: 'Plissoft Monster'
      },
      comment: '',
      nickname: 'RazoRock Plissoft Monster'
    },
    {
      productId: {
        subtype: 'Synthetic',
        productType: 'brush',
        brand: 'Turtleship Shave Co',
        model: 'Admiral Blue'
      },
      comment: '24mm',
      nickname: 'TSC Admiral Blue 24mm'
    },
    {
      productId: {
        subtype: 'Badger',
        productType: 'brush',
        brand: 'Kent',
        model: 'BK8'
      },
      comment: '',
      nickname: 'Kent BK8'
    },
    {
      productId: {
        subtype: 'Badger',
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
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Stirling Soap Company',
        model: 'Barbershop'
      },
      comment: '',
      nickname: 'Stirling\'s Barbershop'
    },
    {
      productId: {
        subtype: 'Cream',
        productType: 'lather',
        brand: 'L\'Occitane',
        model: 'Cade'
      },
      comment: '',
      nickname: 'L\'Occitane Cade Rich'
    },
    {
      productId: {
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Chiseled Face',
        model: 'Cryogen'
      },
      comment: 'sampler',
      nickname: 'Chiseled Face Cryogen'
    },
    {
      productId: {
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Lavanille'
      },
      comment: 'tre Citta Line',
      nickname: 'B&M Lavanille'
    },
    {
      productId: {
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Leviathan'
      },
      comment: 'leather | coffee | sandalwood',
      nickname: 'B&M Leviathan'
    },
    {
      productId: {
        subtype: 'Cream',
        productType: 'lather',
        brand: 'Proraso',
        model: 'Green'
      },
      comment: 'horrible, no slickness',
      nickname: 'Proraso Green'
    },
    {
      productId: {
        subtype: 'Cream',
        productType: 'lather',
        brand: 'Above the Tie',
        model: 'Lavendar & Lemonade'
      },
      comment: 'awesome',
      nickname: 'ATT Lemonade'
    },
    {
      productId: {
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Barrister and Mann',
        model: 'Roam'
      },
      comment: 'Tobacco | Thyme | Grass | Damp Earth | Wood Smoke',
      nickname: 'B&M Roam'
    },
    {
      productId: {
        subtype: 'Soap',
        productType: 'lather',
        brand: 'Black Ship Grooming',
        model: 'Captain Joe'
      },
      comment: '',
      nickname: 'Black Ship Grooming Captain Joe'
    },
    {
      productId: {
        subtype: 'Soap',
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
        subtype: 'Splash',
        productType: 'aftershave',
        brand: 'Brut',
        model: 'Classic'
      },
      comment: '',
      nickname: 'Brut Classic'
    },
    {
      productId: {
        subtype: 'Splash',
        productType: 'aftershave',
        brand: 'Chatillon Lux',
        model: 'Taum Sauk'
      },
      comment: '',
      nickname: 'CL-Taum Sauk'
    },
    {
      productId: {
        subtype: 'Splash',
        productType: 'aftershave',
        brand: 'Barrister and Mann',
        model: 'Lavanille'
      },
      comment: '',
      nickname: 'Lavanille Splash'
    },
    {
      productId: {
        subtype: 'Splash',
        productType: 'aftershave',
        brand: 'Barrister and Mann',
        model: 'Leviathan'
      },
      comment: '',
      nickname: 'Leviathan Splash'
    },
    {
      productId: {
        subtype: 'Balm',
        productType: 'aftershave',
        brand: 'Stirling Soap Company',
        model: 'Sandalwood'
      },
      comment: '',
      nickname: 'Stirling Sandalwood Balm'
    },
    {
      productId: {
        subtype: 'Balm',
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
        subtype: null,
        productType: 'additionalcare',
        brand: 'Proraso',
        model: 'Green'
      },
      comment: '',
      nickname: 'Proraso Green'
    },
    {
      productId: {
        subtype: null,
        productType: 'additionalcare',
        brand: 'Thayers',
        model: 'Witch Hazel'
      },
      comment: '',
      nickname: 'Thayers Witch Hazel'
    },
    {
      productId: {
        subtype: null,
        productType: 'additionalcare',
        brand: 'Stirling Soap Company',
        model: 'Red Delicious - Bath Soap'
      },
      comment: '',
      nickname: 'Stirling Red Delicious Bath Soap'
    },
  ]
};