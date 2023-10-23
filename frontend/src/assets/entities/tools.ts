export type Tools = {
    id: string;
    name: string;
    image: string;
    category: Category;
    author: string;
    location: string;
    description: string;
    timestamp: string;

}


type Category = "GARDEN" | "TOOLS" | "KITCHEN" | "PLUMBING" | "ELECTRONICS" | "SEWING" | "OTHER";
export const allCategories: Category[] = ["GARDEN", "TOOLS", "KITCHEN", "PLUMBING", "ELECTRONICS", "SEWING", "OTHER"];