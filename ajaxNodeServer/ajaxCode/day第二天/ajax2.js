function ajax(obj){
    obj=obj||[];
    obj.url=obj.url||'';
    obj.type=obj.type||'get';
    obj.data=obj.data||{};

    let arr=[];
    for(let key in obj.data){
        arr.push(`${key}=${obj.data[key]}`);

    }
    obj.data=arr.join('$')
    let xhr=new XMLHttpRequest();
    if(obj.type.toLowerCase()==='get'){
        obj.url+='?'+obj.data
    };
    xhr.open(obj.type,obj.url);
    if(obj.type.toLowerCase()==='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(obj.data)
    }else{
        xhr.send();
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&& xhr.status===200){
            let response=xhr.responseText;
            if(xhr.getResponseHeader('Content-Type').indexOf('json')!=-1){
                response=JSON.parse(xhr.responseText)
            }

            obj.callback&&obj.callback(response)
        }
    }

}