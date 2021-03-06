import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assetdef } from './assetdef';
import { Assettype } from './assettype';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assettype: Assettype;
  assetdef: Assetdef;

  constructor(private http: HttpClient) { }

  getAsset(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/assetdef' + id);
  }
  getAssetList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/assetdef');
  }
  getAssettype(id: number): Observable<any> {
    return this.http.get(environment.baseUrl + '/assettype/' + id);
  }
  getAssettypeList(): Observable<any> {
    return this.http.get(environment.baseUrl + '/assettype');
  }
  addAsset(assetdef: Assetdef) {
    return this.http.post(environment.baseUrl + '/assetdef', assetdef);
  }
  deleteAsset(ad_id: number) {
    return this.http.delete(environment.baseUrl + '/assetdef/' + ad_id);
  }
  updateAsset(ad_id: number, asset: Assetdef) {
    return this.http.put(environment.baseUrl + '/assetdef/' + ad_id, asset);
  }

}
