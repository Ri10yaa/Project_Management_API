function con(){
    try{
        throw new Error();
    }catch(err){
        console.log(typeof(Error()))
    }
}

con()