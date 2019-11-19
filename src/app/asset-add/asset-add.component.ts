import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Assetdef } from '../shared/assetdef';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitted = false;
  asset: Assetdef = new Assetdef();
  constructor(private http: HttpClient, private router: Router, private service: AssetService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      ad_name: ['', [Validators.required]],
      ad_type_id: null,
      ad_class: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.formGroup.controls;
  }

  addAsset() {
    //this.isSubmitted = true;

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
    this.isSubmitted = true;
  }

  logout() {
    this.router.navigateByUrl('/login');
  }


}
