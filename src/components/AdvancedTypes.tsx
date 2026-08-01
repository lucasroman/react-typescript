type Nullable<T> = {
    [K in keyof T]: T[K] | null;
}

interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

function createNullable<T extends object>(obj: T): Nullable<T> {
    const result: any = {};
    for (const k in obj) result[k] = null;
    return result;
}

export function AdvancedTypes() {
    const product: Product = { name: 'Laptop', price: 999, inStock: true };
    const nullableProduct = createNullable(product);

    console.log(nullableProduct.name);
    console.log(nullableProduct.price);
    console.log(nullableProduct.inStock);

    return <div>Check the console!</div>;
}