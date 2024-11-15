export interface Query {
    /**
     * Receitas:
     * -> Filtrar por nomes de receitas;
     * Ofertas/Pedidos:
     * -> Filtrar por nomes de alimentos;
     */
    name?: string;
    /**
     * Receitas:
     * -> Array de alimentos usados na receita, a receita deve conter todos
     *    alimentos da array em questão
     * Ofertas/Pedidos:
     * -> não tem utilidade
     */
    products?: string[];
    /**
     * Todas as restantes restrições são apenas uteis em Receitas
     * em caso de não conter valor tratar como false: undefined == false
     */
    vegetarian?: boolean;
    spicy?: boolean;
    glutenFree?: boolean;
    lactoseFree?: boolean;
    vegan?: boolean;
  
}