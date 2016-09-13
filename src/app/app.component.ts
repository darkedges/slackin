import { Component } from '@angular/core';
import { AngularFire,FirebaseObjectObservable } from 'angularfire2';
import { PopoverModule } from "ng2-popover";
import { SlackinService } from './slackin.service';
import { ErrorResponse } from './errorResponse';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { SlackinUser } from './slackinuser.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SlackinService],
  directives: [NgClass]
})
export class AppComponent {
	constructor(private af: AngularFire, private slackinService: SlackinService, fb: FormBuilder) {
	 	this.item = af.database.object('stats');
	 	this.slackinForm = fb.group({  
		      'email': ['']  
    		});
    		this.email = this.slackinForm.controls['email'];
    		this.email.valueChanges.subscribe(  
		      (value: string) => {  
		        this.resetDisabled(value);
		      }
    		);
	}
	item: FirebaseObjectObservable<any[]>;
	email: AbstractControl;
	buttonMessage: string = "Get My Invite";
	buttonClass: string = "";
	buttonDisabled: boolean = false;
	slackinForm: FormGroup;
	
	onSuccessResponse(response: Object) {
		this.buttonMessage = "WOOT. Check your email!";
		this.buttonClass = "success";
		this.buttonDisabled = true;
	}
	
	onErrorResponse(response: ErrorResponse) {
		this.buttonMessage = (response.msg)?response.msg:"Server Error!";
		this.buttonClass = "error";
		this.buttonDisabled = true;
		if (response.redirectUrl) {
			window.location.href = response.redirectUrl;
		}
	}
	
	isDisabled() {
		return this.buttonDisabled
	}
	
	onSubmitRequest(model: SlackinUser) {
		this.buttonMessage = "Please Wait"
		this.buttonDisabled = true;
		this.slackinService
		  .submitRequest(model)
		  .subscribe(
                     response => this.onSuccessResponse(response),
                     error =>  this.onErrorResponse(error)
                  );
	}
	
	resetDisabled(newValue) {
		if (this.buttonDisabled) {
			this.buttonDisabled = false;
			this.buttonMessage = "Get My Invite"
			this.buttonClass = "";
		}
	}
	
}
