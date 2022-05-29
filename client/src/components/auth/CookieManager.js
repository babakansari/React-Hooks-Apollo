const useCookies = (name) => {
    const serialize = (obj) => {
        return JSON.stringify(obj);
    };
    const deserialize = (str) => {
        return JSON.parse(str);
    };

    return {
        set: (value,days) => {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = date.toUTCString();
            }
            document.cookie = `${name}=${(serialize(value) || "")};expires=${expires}; path=/;SameSite=Lax`;
        },
        get: () => {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return deserialize(c.substring(nameEQ.length,c.length));
                }  
            }
            return null;
        },
        remove: () => {   
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    };
    
};

export default useCookies;