import { Component } from '@angular/core';
import { AngularFire,FirebaseObjectObservable } from 'angularfire2';
import { PopoverModule } from "ng2-popover";
import { SlackinService } from './slackin.service';
import { ErrorResponse } from './errorResponse';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SlackinService],
  directives: [NgClass]
})
export class AppComponent {
	constructor(private af: AngularFire, private slackinService: SlackinService) {
	 	this.item = af.database.object('stats');
	 	this.buttonMessage = "Get My Invite"
	 	this.buttonClass = "";
	 	this.buttonDisabled=false;
	 	this.user = {email: ""};
	}
	item: FirebaseObjectObservable<any[]>;
	user: Object = {};
	buttonMessage: string = "";
	buttonClass: string = "";
	buttonDisabled: boolean = false;
	
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
	
	onSubmitRequest() {
		this.buttonMessage = "Please Wait"
		this.buttonDisabled = true;
		console.log(this.user);
		this.slackinService
		  .submitRequest(this.user)
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
