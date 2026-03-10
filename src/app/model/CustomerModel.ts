export interface CustomerModel {
    id: string,
    name: string,
    email: string,
    mobile: string,
    remarks: string,
    isprime: boolean,
    address: Deliveryaddress[]
}

export interface Deliveryaddress {
   city:string,
   country:string,
   zipcode:string
}