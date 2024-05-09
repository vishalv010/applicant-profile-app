export const getFilteredData = (data, param,value) => {
    if(value) {
        if(param==='skill'){
            return data.filter(el => el.skill.includes(value));
        }else if(param==='rating'){
            return data.filter(el => el.rating === value);
        }
    }else{
        return data;
    }
}