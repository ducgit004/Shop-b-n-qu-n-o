
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrls: string[];
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  cartItemId: string; // e.g., "1-L-Black"
}
