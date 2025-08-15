import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Image {
  previewImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}

@Injectable({
	providedIn: 'root',
})
export class PhotoService {

	constructor(private http: HttpClient) { }

	getImages() {
		return this.http.get<any>('assets/data/photos.json')
			.toPromise()
			.then(res => res.data as Image[])
			.then(data => data);
	}
}
