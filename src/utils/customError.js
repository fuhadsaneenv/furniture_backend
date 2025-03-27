class CustomError extends Error{
    constructor(message ,status){
        super(message);
        this.status =status;
        Error.captureStackTrace(this,this.constructor)
    }
}
export default CustomError;

//Ithinte main use case error handling easy aakan aanu. Normal Error class use cheyyumbo message mathram store aavum. CustomError use cheyyumbo status code okke add cheyyam, ath kond structured error handling cheyyan pattum.
