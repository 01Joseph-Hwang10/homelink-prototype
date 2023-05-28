import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Entity } from './entity';
import { CollectionPaths } from '../constant';

export enum UserRole {
  Client = 0,
  Resident = 1,
}

interface UserSchema {
  /** @description 유저의 id. uuid로 생성 */
  uid: string;

  /** @description Kakao OAuth로부터 얻는 카카오 이메일 */
  email: string;

  /** @description 설명 */
  description?: string;

  /** @description Inspection Request ids */
  requests: string[];
}

export type ClientSchema = UserSchema;

export class Client extends Entity<ClientSchema> implements ClientSchema {
  constructor(
    public uid: string,
    public email: string,
    public description: string | undefined,
    public requests: string[]
  ) {
    super(CollectionPaths.clients);
  }

  static fromJSON(json: ClientSchema): Client {
    return new Client(json.uid, json.email, json.description, json.requests);
  }

  static async fromUserId(uid: string): Promise<Client> {
    const q = await query(
      collection(getFirestore(), CollectionPaths.clients),
      where('uid', '==', uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('Client not found');
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return Client.fromJSON(data as ClientSchema);
  }

  public toJSON(): ClientSchema {
    return {
      uid: this.uid,
      email: this.email,
      description: this.description,
      requests: this.requests,
    };
  }
}

export enum AbodeLocation {
  UNKNOWN = -1,
  구영리 = 0,
  천상리 = 1,
  언양읍 = 2,
  // ...
  // 사계서에 처음에는 유니 사람들한테 서비스 할거라고 써놓고
  // 구영리 천상리 언양읍만 지원하는 것도 괜춘한듯?
}

export interface ResidentSchema extends UserSchema {
  /** @description 레지던트의 거주지 */
  abode: AbodeLocation;
}

export class Resident extends Entity<ResidentSchema> implements ResidentSchema {
  constructor(
    public uid: string,
    public email: string,
    public description: string | undefined,
    public requests: string[],
    public abode: AbodeLocation
  ) {
    super(CollectionPaths.residents);
  }

  static fromJSON(json: ResidentSchema): Resident {
    return new Resident(
      json.uid,
      json.email,
      json.description,
      json.requests,
      json.abode
    );
  }

  static async fromUserId(uid: string): Promise<Resident> {
    const q = await query(
      collection(getFirestore(), CollectionPaths.residents),
      where('uid', '==', uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('Resident not found');
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return Resident.fromJSON(data as ResidentSchema);
  }

  public toJSON(): ResidentSchema {
    return {
      uid: this.uid,
      email: this.email,
      description: this.description,
      requests: this.requests,
      abode: this.abode,
    };
  }
}
