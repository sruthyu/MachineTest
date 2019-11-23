import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Assetdef } from '../shared/assetdef';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitted = false;
  asset: Assetdef = new Assetdef();

  assettype: Observable<Assettype[]>;
  assettypes: Assettype=new Assettype();

  constructor(private http: HttpClient, private router: Router, private service: AssetService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    
    this.formGroup = this.formBuilder.group({
      ad_name: ['', [Validators.required]],
      ad_type_id: ['', [Validators.required]],
      ad_class: ['', [Validators.required]]
    });
    this.populateAssetType();
  }
  get formControls() {
    return this.formGroup.controls;
  }

  populateAssetType(){
    this.service.getAssettypeList().subscribe(data=>{
      //console.log(data)
      //this.assettype=data;
      data.forEach(element => {
        this.assettypes.at_id=element['at_id'];
        this.assettypes.at_name=element['at_name'];
        console.log(this.assettypes)
       
      });
      
    });
     
    
  }

  addAsset() {

    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.asset.ad_name = this.formGroup.controls.ad_name.value;
    this.asset.ad_type_id = this.formGroup.controls.ad_type_id.value;
    this.asset.ad_class = this.formGroup.controls.ad_class.value;
    console.log(this.asset);
    this.service.addAsset(this.asset).subscribe();
    this.toastr.success('Yayy!!', 'Asset added successfully');

    console.log(this.formGroup.value);

  }

  logout() {
    this.router.navigateByUrl('/login');
  }


}
