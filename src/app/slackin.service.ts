import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import './rxjs-operators';
import { Observable }     from 'rxjs/Observable';

import { ErrorResponse } from './errorResponse';

@Injectable()
export class SlackinService {
	constructor (private http: Http) {}

	private slackinUrl = 'http://localhost:4280/slackin/invite.php';

	submitRequest(user: Object): Observable<Object> {
		console.log("Submitting Request: "+JSON.stringify(user));
		let body = JSON.stringify(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.slackinUrl, body, options)
				.map(this.extractData)
				.catch(this.handleError);
	} 
  
	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}

	private handleError (error: any) {
		let errMsg = (error._body) ? JSON.parse(error._body) :
		
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		return Observable.throw(new ErrorResponse(errMsg));
	}
}
