export class ErrorResponse {
	constructor(private body:any) {
		this.msg = body.msg;
		this.redirectUrl = body.redirectUrl? body.redirectUrl : "";
	}
	msg: string;
	redirectUrl: string;
}