export class ProductModel {
  id: number;
  visibility: boolean = true;
  createdDate: string;
  name: string;
  gender: string = 'MALE';
  ages: string;
  url: string;
  price : number = 0.00;
  tags : string[] = [];
  relationships : string[] = [];
  clicks: number = 0;
  twitterShares: number = 0;
  facebookShares: number = 0;
  pinterestShares: number = 0;
  productImage: string;
};
