export interface Order {
  city: string,
  route: string,
  package_name: string,
  clientEmail: string,
  clientMessage: string,
  date: { incoming: number } 
}

export interface Question {
  question: string;
  answers: string[];
}
