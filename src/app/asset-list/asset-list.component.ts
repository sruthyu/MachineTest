import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Assetdef } from '../shared/assetdef';
import { Assettype } from '../shared/assettype';
import { AssetService } from '../shared/asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  assetdefs:Assetdef=new Assetdef();
  assetdef: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;

  constructor(private http: HttpClient, private router: Router,
    private toastr: ToastrService, private service: AssetService) { }

  ngOnInit() {
    this.list();
  }
  list() {
    this.assetdef = this.service.getAssetList();
  }

  onOptionsSelected(value: number){
    console.log("the selected value is " + value);

    if(value==0)
    {
      this.assetdef = this.service.getAssetList();
    }
    else
    {
      this.assettype = this.service.getAssettype(value);
    }
    
  }

  deleteAsset(ad_id: number)
{
  if(confirm('Do you want to delete this record?'))
  {
    this.service.deleteAsset(ad_id).subscribe(data=>{
      console.log(data);
      this.toastr.error('Oh no!!', 'Deleted successfully');
    })
  }
}

}
