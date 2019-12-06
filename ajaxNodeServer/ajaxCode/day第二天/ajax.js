function ajax(obj){
    obj=obj||{};
    obj.url=obj.url||'';
    obj.type=obj.type||'get';
    obj.data=obj.data||{};
    
        let arr=[];
        for(let key in obj.data){
     
            arr.push(`${key}=${obj.data[key]}`);
        }
        obj.data=arr.join('&')
        // 创建一个异步对象
    let xhr=new XMLHttpRequest();
    // 请求类型和地址
    // 如果是get请求，需要在url后面添加？键=值
    if(obj.type.toLowerCase()==='get'){
        obj.url+='?'+obj.data
    };
     xhr.open(obj.type,obj.url);
    //  发送请求
    if(obj.type.toLowerCase()==='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(obj.data)
    }else{
        xhr.send();
    }
    
    //  监听状态
     xhr.onreadystatechange=function(){
         if(xhr.readyState===4 && xhr.status===200){
          let response=xhr.responseText;
          if(xhr.getResponseHeader('content-Type').indexOf('json')!==-1){
                response=JSON.parse(xhr.responseText)
          }
        console.log(response);
        
          obj.callback && obj.callback(response)
         }
     }
        
    
    }
    