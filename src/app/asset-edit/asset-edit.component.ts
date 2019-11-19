import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assetdef } from '../shared/assetdef';
import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  formGroup: FormGroup;
  asset: Assetdef=new Assetdef();

  constructor(private service:AssetService,private formBuilder: FormBuilder,
    private toastr: ToastrService,private route: ActivatedRoute) { }

  ad_id: number;

  ngOnInit() {
    this.ad_id=this.route.snapshot.params["id"];
    this.formGroup = this.formBuilder.group({
      ad_name: ['', [Validators.required]],
      ad_type_id: null,
      ad_class: ['', [Validators.required]]
    });

    console.log("AssetID: "+this.ad_id);
    this.service.getAsset(this.ad_id).subscribe(data=>{
      this.asset=data;
      console.log(data)
    },error=>console.log(error));
  }

  updateAsset()
  {
   this.asset.ad_name=this.formGroup.controls.ad_name.value;
   this.asset.ad_type_id=this.formGroup.controls.ad_type_id.value;
   this.asset.ad_class=this.formGroup.controls.ad_class.value;
   
   //console.log(this.product);
   this.service.updateAsset(this.ad_id,this.asset).subscribe();
   this.toastr.warning('Yippee!','Updated successfully');
  }

}
