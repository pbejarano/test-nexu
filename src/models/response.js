class AzureReponse {
    constructor() {
        this.success = false;
        this.message = '';
        this.status = 'error';
        this.code = 0;
        this.data = [];
    }

    setSuccess(success) {
        this.success = success;
    }

    setMessage(message) {
        this.message = message;
    }

    setStatus(status) {
        this.status = status;
    }

    setCode(code) {
        this.code = code;
    }

    setData(data) {
        this.data = data;
    }

    ok(_message, _data){
        this.message = _message;
        this.data = _data;
        this.code = 200;
        this.status = 'success';
        this.success = true;
    }

    toResponse() {
        return {
            success: this.success,
            message: this.message,
            status: this.status,
            code: this.code,
            data: this.data
        };
    }
}

module.exports = AzureReponse;