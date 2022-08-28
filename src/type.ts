export interface Order {
  city: string,
  route: string,
  package_name: string,
  clientEmail: string,
  clientMessage: string,
  date: { incomingOrder: number } 
}
