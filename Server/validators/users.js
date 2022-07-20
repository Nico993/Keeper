function registerValidator(user,users){
    let band = true;
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    users.forEach(item => {
        if(item.email === user.email){
            band = false;
        }
    });
    
    if(validateEmail(user.email) && band){
        return true;
    }
    else{
        return false;
    }
      
}



export {registerValidator};