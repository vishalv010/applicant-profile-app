export const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';
// 'https://picsum.photos/v2/list' // use download_url in place of url

export const getFilteredData = (data, param,value) => {
    if(value) {
        if(param==='skill'){
            return data.filter(el => el.skill.toLowerCase().includes(value.toLowerCase()));
        }else if(param==='rating'){
            return data.filter(el => el.rating === value);
        }
    }else{
        return data;
    }
}

export const TABLE_CONTENT_TYPE = {
    INPUT: 'input',
    TEXT: 'text'
}

export const ACTION_BUTTON_CONTENT = {
    APPLY: 'Apply',
    UPDATE: 'Update',
    EDIT: 'Edit'
}