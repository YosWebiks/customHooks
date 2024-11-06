export interface User {
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
    };
    location: {
      country: string;
      city: string;
    };
  }
  
  export interface RandomUserResponse {
    results: User[];
  }