export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Attributes[];
}


export interface Attributes {
  trait_type: string,
  value: string
}
