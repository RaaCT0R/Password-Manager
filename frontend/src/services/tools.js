import persianDate from 'persian-date/dist/persian-date'
import {getLanguage} from "react-multi-lang/lib";

const timestamp2Str = function (timestamp,locale) {
    if(locale==='fa'){
        return new persianDate(timestamp).toLocale(locale).format('YYYY/MM/DD');
    }else{
        return new Date(timestamp).toLocaleDateString();
    }

}
const timestamp2Obj = function (timestamp,locale) {
    if(locale==='fa'){
        const date = new persianDate(timestamp).toLocale(locale)
        return {
            day: date.dates(),
            month: date.month(),
            year: date.year()
        };
    }else{
        const date = timestamp?new Date(timestamp):new Date();
        return {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        };
    }
}

const obj2Timestamp = function (obj) {
    const locale = getLanguage();
    if(locale==='fa'){
        return new persianDate([obj.year,obj.month,obj.day]).unix()*1000
    }else{
        return new Date(obj.year,obj.month,obj.day).getTime()
    }
}

const detectLang = function (text) {
    if (/^[a-zA-Z]+$/.test(text[0])) {
        return "en";
    } else {
        return "fa";
    }
}

const checkRequired = function (formValues, fields, setValidation) {
    let isValid = true
    let validationBuffer = {}
    for(let i in fields){
        const id = fields[i]
        if(!formValues[id]){
            isValid = false
            validationBuffer[id] = {error: true}
        }
    }
    setValidation(validationBuffer)
    return isValid
}

export {
    timestamp2Str,
    timestamp2Obj,
    obj2Timestamp,
    detectLang,
    checkRequired
}
