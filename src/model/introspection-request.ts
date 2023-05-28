import { CollectionPaths } from '../constant';
import { Entity } from './entity';

enum IntrospectionRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface IntrospectionRequestSchema {
  /** @description Introspection request id */
  iid: string;

  /** @description client uid */
  clientId: string;

  /** @description resident uid */
  residentId: string;

  status: IntrospectionRequestStatus;

  /** @description 체크리스트 구글 폼즈 URL */
  checklistUrl: string;
}

export class IntrospectionRequest
  extends Entity
  implements IntrospectionRequestSchema
{
  constructor(
    public iid: string,
    public clientId: string,
    public residentId: string,
    public status: IntrospectionRequestStatus,
    public checklistUrl: string
  ) {
    super(CollectionPaths.introspectionRequests);
  }

  static fromJSON(data: IntrospectionRequestSchema): IntrospectionRequest {
    return new IntrospectionRequest(
      data.iid,
      data.clientId,
      data.residentId,
      data.status,
      data.checklistUrl
    );
  }

  toJSON(): IntrospectionRequestSchema {
    return {
      iid: this.iid,
      clientId: this.clientId,
      residentId: this.residentId,
      status: this.status,
      checklistUrl: this.checklistUrl,
    };
  }
}
