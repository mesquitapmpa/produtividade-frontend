import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class FileUploadModel {
  armamento_id!: string;
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUploadModel): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUploadModel): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number, id_carga: string): AngularFireList<FileUploadModel> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems).orderByChild('id_carga').equalTo(id_carga));
  }

  async deleteFile(fileUpload: FileUploadModel): Promise<void> {
    try {
      await this.deleteFileDatabase(fileUpload.key);
      await this.deleteFileStorage(fileUpload.name);
    } catch (error) {
      console.log(error);
    }
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  async deleteFileStorage(name: string): Promise<void>  {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
