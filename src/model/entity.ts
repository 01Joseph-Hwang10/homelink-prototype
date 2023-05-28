import {
  getFirestore,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  DocumentReference,
  UpdateData,
} from 'firebase/firestore';

export abstract class Entity<T = unknown> {
  collectionName: string;
  ref?: DocumentReference<T>;

  get collection() {
    return collection(getFirestore(), this.collectionName);
  }

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public toJSON(): Record<string, any> {
    throw new Error('Not implemented');
  }

  /**
   * @description
   * 1. Read a document with given document reference.
   * 2. Assign the read data to this object.
   *
   * @returns {Promise<DocumentReference<T>>} Document reference of the read document.
   */
  async read(): Promise<DocumentReference<T>> {
    if (!this.ref) throw new Error('Document reference not found');
    const docSnap = await getDoc(this.ref);
    if (docSnap.exists()) {
      this.ref = docSnap.ref as DocumentReference<T>;
    } else {
      throw new Error('Document not found');
    }
    const data = docSnap.data();
    if (!data) throw new Error('Document data not found');
    Object.assign(this, data);
    return this.ref;
  }

  /**
   * @description
   * 1. Create a document in firestore.
   * 2. Assign the created document reference to this object.
   * 3. Read the data from the created document and assign it to this object.
   *
   * @returns {Promise<DocumentReference<T>>} Document reference of the created document.
   */
  async create(): Promise<DocumentReference<T>> {
    const db = getFirestore();
    const docRef = await addDoc(
      collection(db, this.collectionName),
      this.toJSON()
    );
    this.ref = docRef as DocumentReference<T>;
    await this.read();
    return this.ref;
  }

  /**
   * @description
   * 1. Update the document with the data of this object.
   * 2. Read the data from the updated document and assign it to this object.
   *
   * @returns {Promise<void>}
   */
  async update(): Promise<void> {
    if (!this.ref) throw new Error('Document reference not found');
    await updateDoc(this.ref, this.toJSON() as UpdateData<T>);
    await this.read();
  }

  /**
   * @description
   * Delete the document with the document reference of this object.
   *
   * @returns {Promise<void>}
   */
  async delete(): Promise<void> {
    if (!this.ref) throw new Error('Document reference not found');
    await deleteDoc(this.ref);
  }
}
