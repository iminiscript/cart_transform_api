const NO_CHANGES = { operations: [] };

export function run(input) {
  console.log("input:", JSON.stringify(input, null, 2));

  const operations = input.cart.lines
    .filter(line => {
      console.log("line:", JSON.stringify(line, null, 2));
      return (
        line.merchandise.__typename === "ProductVariant" &&
        line.merchandise.product.GWP && // Check for GWP presence
        line.merchandise.product.GWP.value === "true" && // Check if GWP is "true"
        line.GWP_Product && // Ensure GWP_Product exists
        line.GWP_Product.value === "GWP" // Check if GWP_Product is "GWP"
      );
    })
    .map(line => ({
      update: {
        cartLineId: line.id,
        price: {
          adjustment: {
            fixedPricePerUnit: {
              amount: "0.0" // Set price to 0 for one quantity
            }
          }
        },
      }
    }));

  console.log("operations:", JSON.stringify(operations, null, 2));

  return operations.length ? { operations } : NO_CHANGES;
}









// const NO_CHANGES = { operations: [] };

// export function run(input) {
//   console.log("input:", JSON.stringify(input, null, 2));

//   const operations = input.cart.lines
//     .filter(line => {
//       console.log("line:", JSON.stringify(line, null, 2));
//       return line.merchandise.__typename === "ProductVariant" && line.merchandise.product.title.includes(":");
//     })
//     .map(line => ({
//       update: {
//         cartLineId: line.id,
//         title: line.merchandise.product.title.split(":")[0],
//         price: {
//           adjustment: {
//             fixedPricePerUnit: {
//               amount: 100
//             }
//           }
//         }
//       }
//     }));

//     console.log("operations:", JSON.stringify(operations, null, 2));

//   return operations.length ? { operations } : NO_CHANGES;
// }
