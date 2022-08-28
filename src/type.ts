export interface Order {
  city: string,
  route: string,
  packages: string,
  clientEmail: string,
  clientMessage: string,
  date: { incomingOrder: number } 
}
