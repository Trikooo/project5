
// const productValidationSchema = {
//     name: {
//       in: ["body"],
//       notEmpty: {
//         errorMessage: "Name is required",
//       },
//     },
//     description: {
//       in: ["body"],
//       notEmpty: {
//         errorMessage: "Description is required",
//       },
//     },
//     price: {
//       in: ["body"],
//       notEmpty: {
//         errorMessage: "Price is required",
//       },
//     },
//     brand: {
//       in: ["body"],
//       notEmpty: {
//         errorMessage: "Brand is required",
//       },
//     },
//     category: {
//       in: ["body"],
//       notEmpty: {
//         errorMessage: "Category is required",
//       },
//     },
//   };
// function validateProduct(product, schema) {
//     const errors = [];
  
//     for (const key in schema) {
//       if (schema.hasOwnProperty(key)) {
//         const field = schema[key];
//         if (!product.hasOwnProperty(key)) {
//           errors.push({ field: key, message: field.notEmpty.errorMessage });
//         }
//       }
//     }
  
//     return errors;
//   }
  
//   // Example usage:
//   const product = {
//     name: "Example Product",
//     description: "This is an example product",
//     price: 10.99,
//     brand: "Example Brand",
//     category: "phone"
// };
  
//   const errors = validateProduct(product, productValidationSchema);
  
//   if (errors.length > 0) {
//     console.log("Validation failed:");
//     errors.forEach(error => {
//       console.log(`${error.field}: ${error.message}`);
//     });
//   } else {
//     console.log("Validation passed!");
//   }