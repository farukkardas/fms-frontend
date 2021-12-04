export class OrderDetailDto{
    id: number;
    sellerId: number;
    sellerName: string;
    customerName: string;
    productType: number;
    productName: string;
    deliveryCity: number;
    deliveryDistrict: string;
    deliveryAddress: string;
    boughtDate: Date;
    status: boolean
}