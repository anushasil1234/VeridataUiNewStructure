class VerificationStatus {

    constructor(success, action) {
        if (success === true) {
            this.color = "green";
        } else if (success === false) {
            this.color = "error";
        }else{
            this.color = "#000";
        }
        if (success === null) {
            this.message = "NA";
        } else {
            if (action === "V") {
                this.message = new VerificationMessage(success).message;
            }
            if (action === "F") {
                this.message = "Fetched";
            }
        }
        this.success = success
    }
}
class VerificationMessage {
    constructor(success) {
        this.message = success ? "Success" : "Failed";
    }
}

export default VerificationStatus;