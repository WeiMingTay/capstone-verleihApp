export type Tools = {
    id: string;
    name: string;
    location: string;
    category: Category;
}


type Category = "GARDEN" | "TOOLS" | "KITCHEN" | "PLUMBING" | "ELECTRONICS" | "SEWING" | "OTHER";
export const allCategories: Category[] = ["GARDEN", "TOOLS", "KITCHEN", "PLUMBING", "ELECTRONICS", "SEWING", "OTHER"];