// src/data.ts
export const productData = [
    {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Tomates",
        address: "Rua dos Cliques N20",
        quantity: "2kg",
        expiry: "01/01/2025",
        price: "5.99€",
        customerName: "João Silva"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b5277f0b120b3280a2d5705132dc7da8bf28a590585b808574229f5e73e8cbb?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Gengibre",
        address: "Rua dos Cliques N19",
        quantity: "5kg",
        expiry: "01/01/2025",
        price: "5.99€",
        customerName: "admin"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Tomates",
        address: "Avenida dos cliques N2",
        quantity: "1kg",
        expiry: "01/01/2025",
        price: "2.99€",
        customerName: "Francisca"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Farinha",
        address: "Rua dos Cliques N19",
        quantity: "1kg",
        expiry: "01/01/2025",
        price: "0.99€",
        customerName: "admin"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Mel",
        address: "Rua do Rato N14",
        quantity: "1.5kg",
        expiry: "01/01/2025",
        price: "10.99€",
        customerName: "Jose"
      },
      {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52154c430268fcbd56d389a3274e821f3031790dbaf213aa41beee900c89bb89?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
        name: "Pimenta",
        address: "Avenida dos cliques N2",
        quantity: "0.2kg",
        expiry: "01/01/2025",
        price: "3.99€",
        customerName: "Francisca"
      }
  ];
  
  export const recipeData = [
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Sopa de Tomate",
      description: "Uma sopa clássica de tomate, perfeita para dias frios e cheia de sabor.",
      ingredientCount: 4,
      ingredients: ["500g de tomates", "2 dentes de alho", "1 cebola média", "1 colher de chá de sal"],
      steps: [
        "Lavar e cortar os tomates em pedaços.",
        "Refogar a cebola e o alho picados num fio de azeite até dourar.",
        "Adicionar os tomates e deixar cozinhar por 15 minutos.",
        "Bater a mistura no liquidificador e ajustar o tempero com sal."
      ],
      vegetarian: true,
      spicy: false,
      glutenFree: true,
      lactoseFree: true,
      vegan: true
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Caril de Grão de Bico",
      description: "Um prato vegetariano exótico e aromático com grão de bico e especiarias.",
      ingredientCount: 8,
      ingredients: [
        "1 lata de grão de bico (400g)",
        "1 cebola média",
        "2 dentes de alho",
        "1 colher de sopa de pasta de caril",
        "200ml de leite de coco",
        "1 colher de chá de cominhos",
        "2 colheres de sopa de azeite",
        "Sal a gosto"
      ],
      steps: [
        "Refogar a cebola e o alho picados no azeite até dourar.",
        "Adicionar a pasta de caril e os cominhos, mexendo bem.",
        "Juntar o grão de bico (escorrido) e misturar.",
        "Adicionar o leite de coco e cozinhar em lume brando por 10 minutos.",
        "Ajustar o tempero com sal e servir com arroz branco."
      ],
      vegetarian: true,
      spicy: true,
      glutenFree: true,
      lactoseFree: true,
      vegan: true
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Bacalhau à Brás",
      description: "Um prato típico português com bacalhau desfiado, batata e ovos.",
      ingredientCount: 7,
      ingredients: [
        "400g de bacalhau desfiado",
        "300g de batata palha",
        "1 cebola média",
        "2 dentes de alho",
        "4 ovos",
        "Azeite q.b.",
        "Salsa picada a gosto"
      ],
      steps: [
        "Demolhar o bacalhau para retirar o excesso de sal.",
        "Refogar a cebola e o alho picados no azeite até ficarem translúcidos.",
        "Adicionar o bacalhau desfiado e cozinhar por 5 minutos.",
        "Juntar a batata palha e misturar bem.",
        "Bater os ovos e adicionar à mistura, mexendo até cozinhar ligeiramente.",
        "Polvilhar com salsa picada antes de servir."
      ],
      vegetarian: false,
      spicy: false,
      glutenFree: true,
      lactoseFree: true,
      vegan: false
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Pasta de Cogumelos",
      description: "Uma receita cremosa e rica, ideal para amantes de cogumelos.",
      ingredientCount: 6,
      ingredients: [
        "300g de cogumelos frescos",
        "250g de massa (espaguete ou fusilli)",
        "2 dentes de alho",
        "200ml de natas vegetais",
        "2 colheres de sopa de azeite",
        "Sal e pimenta a gosto"
      ],
      steps: [
        "Cozinhar a massa em água com sal até ficar al dente.",
        "Refogar os cogumelos laminados com alho picado no azeite.",
        "Adicionar as natas vegetais e temperar com sal e pimenta.",
        "Misturar o molho de cogumelos com a massa cozida.",
        "Servir quente e, se desejar, polvilhar com salsa picada."
      ],
      vegetarian: true,
      spicy: false,
      glutenFree: false,
      lactoseFree: true,
      vegan: true
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Tarte de Maçã",
      description: "Uma sobremesa doce e aromática, perfeita para o lanche.",
      ingredientCount: 6,
      ingredients: [
        "3 maçãs médias",
        "1 rolo de massa folhada",
        "50g de açúcar",
        "1 colher de chá de canela",
        "1 gema de ovo",
        "Açúcar em pó para decorar"
      ],
      steps: [
        "Pré-aquecer o forno a 180°C.",
        "Descascar e fatiar as maçãs em meias-luas finas.",
        "Estender a massa folhada numa forma de tarte e picar o fundo com um garfo.",
        "Dispor as fatias de maçã sobre a massa e polvilhar com açúcar e canela.",
        "Pincelar as bordas da massa com a gema de ovo batida.",
        "Levar ao forno por 25 minutos até dourar.",
        "Deixar arrefecer e polvilhar com açúcar em pó antes de servir."
      ],
      vegetarian: true,
      spicy: false,
      glutenFree: false,
      lactoseFree: false,
      vegan: false
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Guisado de Lentilhas",
      description: "Um prato nutritivo e reconfortante, ideal para um almoço leve.",
      ingredientCount: 9,
      ingredients: [
        "250g de lentilhas",
        "1 cebola grande",
        "2 dentes de alho",
        "2 cenouras",
        "1 batata-doce",
        "2 colheres de sopa de azeite",
        "1 folha de louro",
        "1 colher de chá de pimentão-doce",
        "Água ou caldo de legumes q.b."
      ],
      steps: [
        "Lavar as lentilhas e deixá-las de molho por 30 minutos.",
        "Refogar a cebola e o alho picados no azeite.",
        "Adicionar a batata-doce e as cenouras cortadas em pedaços pequenos.",
        "Juntar as lentilhas, a folha de louro e o pimentão-doce.",
        "Adicionar água ou caldo de legumes até cobrir os ingredientes.",
        "Deixar cozinhar em lume médio por 25 minutos.",
        "Ajustar os temperos e servir quente."
      ],
      vegetarian: true,
      spicy: false,
      glutenFree: true,
      lactoseFree: true,
      vegan: true
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Frango Assado com Limão",
      description: "Uma receita simples e deliciosa de frango assado com limão e ervas.",
      ingredientCount: 6,
      ingredients: [
        "1 frango inteiro (1,5kg)",
        "2 limões",
        "4 dentes de alho",
        "2 colheres de sopa de azeite",
        "Sal e pimenta a gosto",
        "Ervas aromáticas (alecrim e tomilho)"
      ],
      steps: [
        "Pré-aquecer o forno a 200°C.",
        "Temperar o frango com sal, pimenta, alho picado e ervas aromáticas.",
        "Cortar os limões ao meio e colocar dentro do frango.",
        "Regar o frango com azeite e levar ao forno numa assadeira.",
        "Assar por 1h30, regando ocasionalmente com o suco formado.",
        "Servir com legumes assados ou arroz branco."
      ],
      vegetarian: false,
      spicy: false,
      glutenFree: true,
      lactoseFree: true,
      vegan: false
    },
    {
      image: "https://i.ibb.co/fG5wMR8/download.jpg",
      title: "Salada de Quinoa",
      description: "Uma salada fresca e saudável com quinoa e vegetais.",
      ingredientCount: 7,
      ingredients: [
        "200g de quinoa",
        "1 pepino",
        "2 tomates médios",
        "1 cenoura ralada",
        "1 colher de sopa de azeite",
        "Sumo de 1 limão",
        "Sal e pimenta a gosto"
      ],
      steps: [
        "Cozinhar a quinoa conforme as instruções da embalagem e deixar arrefecer.",
        "Cortar o pepino e os tomates em cubos pequenos.",
        "Misturar todos os ingredientes numa tigela grande.",
        "Temperar com azeite, sumo de limão, sal e pimenta.",
        "Misturar bem e servir fresca."
      ],
      vegetarian: true,
      spicy: false,
      glutenFree: true,
      lactoseFree: true,
      vegan: true
    }
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
    {
      orderId: "54321",
      product: "Esparguete",
      quantity: "5kg",
      customerName: "admin",
      address: "Rua dos Cliques N19",
      status: "Entregue",
    },
    {
      orderId: "98912",
      product: "Feijão Preto",
      quantity: "1kg",
      customerName: "Cavaco",
      address: "Rua dos Cliques 18",
      status: "Entregue",
    },
    {
      orderId: "11111",
      product: "Arroz",
      quantity: "1kg",
      customerName: "Fernanda",
      address: "Rua dos Cliques N17",
      status: "Entregue",
    },
    {
      orderId: "22222",
      product: "Bananas",
      quantity: "0.5Kg",
      customerName: "admin",
      address: "Rua dos Cliques N19",
      status: "Entregue",
    },
  ];

  export const pantryData = [
    {
      product: "Gengibre",
      quantity: "5Kg",
      expiry: "01/01/2025"
    },
    {
      product: "Farinha",
      quantity: "1Kg",
      expiry: "01/01/2025"
    },
    {
      product: "Bacalhau",
      quantity: "2Kg",
      expiry: "01/01/2025",
    },
    {
      product: "Azeite",
      quantity: "0.7L",
      expiry: "01/01/2025",
    },
    {
      product: "Vinho Tinto",
      quantity: "0.7L",
      expiry: "01/01/2025",
    },
    {
      product: "Vinho Branco",
      quantity: "0.7L",
      expiry: "01/01/2025",
    },
    {
      product: "Sal",
      quantity: "2L",
      expiry: "01/01/2027",
    },
    {
      product: "Natas",
      quantity: "0.2L",
      expiry: "01/01/2025",
    },
  ]