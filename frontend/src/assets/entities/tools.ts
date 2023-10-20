export type Tools = {

    name: string;
    location: string;
    category: Category;
}


type Category = "GARDEN" | "TOOLS" | "KITCHEN" | "PLUMBING" | "ELECTRONICS" | "SEWING" | "OTHER";
export const allCategories : Category[] = ["GARDEN", "TOOLS", "KITCHEN", "PLUMBING", "ELECTRONICS", "SEWING", "OTHER"];