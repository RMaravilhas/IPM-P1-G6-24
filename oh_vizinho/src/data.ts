// src/data.ts
export const productData = [
    {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Tomates",
        address: "Rua dos Cliques N20",
        quantity: "2kg",
        expiry: "01/01/2025",
        price: "5.99€"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b5277f0b120b3280a2d5705132dc7da8bf28a590585b808574229f5e73e8cbb?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Gengibre",
        address: "Rua dos Cliques N20",
        quantity: "5kg",
        expiry: "01/01/2025",
        price: "5.99€"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Tomates",
        address: "Rua dos Cliques N20",
        quantity: "1kg",
        expiry: "01/01/2025",
        price: "2.99€"
      }
  ];
  
  export const recipeData = [
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Sopa de Tomate",
      description: "Xesque",
      ingredientCount: 2,
      ingredients: ["Tomates", "Alho", "Cebola", "Sal"],
      steps: ["Refogar cebola e alho", "Adicionar tomates", "Cozinhar por 20 minutos"],
      vegetarian : true,
      spicy : false,
      glutenFree: true,
      lactoseFree: true,
      vegan: true
    },
  ];
  
  export const orderData = [
    {
      orderId: "12345",
      product: "Tomates",
      quantity: "2kg",
      customerName: "João Silva",
      address: "Rua dos Cliques N20",
      status: "Entregue",
    },
  ];