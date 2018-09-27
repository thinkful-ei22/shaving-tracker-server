const createFlattenedUserProduct = (populatedUserProduct) => {
  const flattened = {};
  const userProductProperties = ['nickname', 'comment'];
  const globalProductProperties = ['subtype', 'productType', 'brand', 'model', 'id'];

  // copy the user's custom properties into the new object
  userProductProperties.forEach((property) => {
    flattened[property] = populatedUserProduct[property];
  });
  // copy the global properties up to the same nesting level as the custom properties
  globalProductProperties.forEach((property) => {
    flattened[property] = populatedUserProduct.productId[property];
  });
  // manual handling of IDs
  flattened.productId = flattened.id;
  flattened.id = populatedUserProduct.id;

  return flattened;
};

module.exports = { createFlattenedUserProduct };
