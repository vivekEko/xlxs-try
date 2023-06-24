function readData(text){
    text+=","
    let start = 0;
    let count = text.indexOf(",");
    let arr = [];
    while(count!==-1){
        let sub = text.substring(start,count)
        if(countOf(sub,"\"")%2===0 && countOf(sub,"\"")>0){
            start = count+1;
            count = text.indexOf(",",start);
            
            arr.push(setOf(sub));
        }
        else if(countOf(sub,"\"")%2===0 && countOf(sub,"\"")===0){
            start = count+1;
            count = text.indexOf(",",start);
            arr.push(sub);
        }
        else{
            count = text.indexOf(",",count+1);
        }
    }
    return arr;
}

export default function thisData(text,type){
    let array = readData(text);
    let duplarray = array;
    let arr = [];
    let newarr = [];
    if(type===".xlsx"){
    array.push("\n");
    /*for(let i=0;i<arraycountof(duplarray,"\n");i++){
        newarr = [];
        for(let j=0;j<arrayIndexOf(array,"\n",1);j++){
            newarr.push({value: array[j].startsWith("\n")?""+array[j].substring(1):array[j], readOnly: true})
        }
        arr.push(newarr);
        array = array.slice(arrayIndexOf(array,"\n",1))
    }*/
    do{ 
        if(duplarray[0].includes("\n")){
            newarr.push({value: (duplarray[0].substring(0,duplarray[0].indexOf("\n"))),readOnly: true})
            arr.push(newarr);
            newarr=[];
            let temparray = [duplarray[0].substring(duplarray[0].indexOf("\n")+1)];
            for(let i=1;i<duplarray.length;i++){
                temparray.push(duplarray[i])
            }
            duplarray = temparray;
        }
        else{
            newarr.push({value: duplarray[0], readOnly: true});
            duplarray = duplarray.slice(1);
        }

    }while(duplarray.length!==0);
    return arr;
    }else if(type===".csv"){
       return new Promise((resolve) =>{
        do{ 
            if(duplarray[0].includes("\n")){
                newarr.push({value: (duplarray[0].substring(0,duplarray[0].indexOf("\n"))),readOnly: true})
                arr.push(newarr);
                newarr=[];
                let temparray = [duplarray[0].substring(duplarray[0].indexOf("\n")+1)];
                for(let i=1;i<duplarray.length;i++){
                    temparray.push(duplarray[i])
                }
                duplarray = temparray;
            }
            else{
                newarr.push({value: duplarray[0], readOnly: true});
                duplarray = duplarray.slice(1);
            }

        }while(duplarray.length!==0);
        /*for(let i=0;i<arraycountof(duplarray,"\n");i++){
            let thisword;
            newarr = [];
            console.log(arrayIndexOf(array,"\n"))
            console.log(array)
            for(let j=0;j<=arrayIndexOf(array,"\n");j++){
                newarr.push({value: array[j].includes("\n")?array[j].substring(0,array[j].indexOf("\n")):array[j], readOnly: true})
                console.log(newarr)
                if(array[j].includes("\n")){
                    thisword = array[j].substring(array[j].indexOf("\n")+1);
                    console.log(thisword);
                }
            }
            arr.push(newarr);
            console.log([""]+array.slice(arrayIndexOf(array,"\n")+1))
            array = thisword!==undefined?[(thisword===""?"":thisword)] + array.slice(arrayIndexOf(array,"\n")+1):array.slice(arrayIndexOf(array,"\n")+1)
            
        }*/
        resolve(arr);
    });}

}

function countOf(text,othertext){
    let count=0; let occurance=text.indexOf(othertext);
    while(occurance!=-1){
        count+=1;
        occurance=text.indexOf(othertext,occurance+1);
    }
    return count;
}

function arraycountof(text,othertext){
    let count=0; 
    for(let i=0;i<text.length;i++){
        if(text[i].toString().includes(othertext)){
            count++;
        }
    }
    return count;
}
function arrayIndexOf(text,othertext,num=0){
    let index = -1;
    for(let i=num;i<text.length;i++){
        if(text[i].includes(othertext)){
            index = i;
            break;
        }
    }
    return index;
}
function setOf(text){
    let nextcount = 0;
    let appendtext ="";
    while(text.indexOf("\"",nextcount+1)===(text.indexOf("\"",nextcount)+1)){
        nextcount++;
    }
    nextcount++;
    for(let i =0;i<nextcount;i++){
        text = text.substring(1,text.length)
    }
    let othernum = (nextcount-1)/2;
    text = ("\"").repeat(othernum) + text;
    let othercount = 1;
    if(text.indexOf("\"",nextcount)!=-1){
    nextcount = text.indexOf("\"",nextcount)
    while(text.indexOf("\"",nextcount+1)===(text.indexOf("\"",nextcount)+1)){
        othercount++;
        nextcount++;
    }
    }else{
        othercount=0;
    }
    while(othercount!=0)
    {
        let startfr = text.indexOf("\"",(othernum+1))
        let duptext = text;
        text = text.substring(0,startfr);
        appendtext = duptext.substring(startfr,duptext.length)
        for(let i =0;i<othercount;i++){
        appendtext = appendtext.substring(1,appendtext.length)
        }
        
        if(othercount%2==0)
        {
        othernum = text.length + othercount/2;
        text += (("\"").repeat(othercount/2) + appendtext);
        othercount = text.indexOf("\"",othernum+1)===-1?0:1;
        nextcount = text.indexOf("\"",nextcount)
        while(text.indexOf("\"",nextcount+1)===(text.indexOf("\"",nextcount)+1)){
            othercount++;
            nextcount++;
        }
        }
        else{
            text += (("\"").repeat((othercount-1)/2) + appendtext);
            othercount=0;
        }
    }
    return text;
    
}

