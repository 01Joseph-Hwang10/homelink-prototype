enum PropertyType {
  UNKNOWN = -1,
  원룸 = 0,
  투쓰리룸 = 1,
  오피스텔도시형생활주택 = 2,
  아파트 = 3,
}

export interface PropertySchema {
  x: number;
  y: number;
  name: string;
  price: number;
  type: PropertyType;
}
