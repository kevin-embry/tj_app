export default class DataChecker {

    static checkFirstName(firstName) {
        const regex = /^[A-Za-z0-9]+((\s)?((\'|\-|\.)?([A-Za-z0-9])+))*$/;
        var check = regex.test(String(firstName));
        return check;
    }

    static checkLastName(lastName) {
        const regex = /^[A-Za-z0-9]+((\s)?((\'|\-|\.)?([A-Za-z0-9])+))*$/;
        var check = regex.test(String(lastName));
        return check;
    }

    static checkEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var check = regex.test(String(email));
        return check;
    }

    static checkPassword(password) {
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,20}$/;
        var check = regex.test(String(password));
        return check;
    }

    static checkServedYears(startYear, endYear) {
        return startYear <= endYear;
    }
}