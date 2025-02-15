type User = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

type Place = {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      south: number;
      west: number;
      north: number;
      east: number;
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    height: number;
    html_attributions: string[];
    width: number;
  }[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  html_attributions: string[];
};

type PlacesResponse = Place[];
