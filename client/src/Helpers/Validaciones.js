export default (state) =>{
    let isError = false;
    let errores = {};   
   
    if(state.name){
        const regExpName = /\d/;
        if(regExpName.test(state.name) ){
            errores.name = "No puede contener numeros"
            isError= true;
        }
    }else if(!state.name){errores.name = "Debe tener un nombre";isError= true;}

    if(state.image){
        const regExpImage=  /\.png/;
        if(!regExpImage.test(state.image)){
            errores.image = "Tiene que ser un archivo .png"
            isError= true;
        }
    }else if(!state.image){errores.image = "Debe tener una imagen";isError= true;}

    if(state.hp > 100 || state.hp <= 0 ){errores.hp = "Hp tiene que ser mayor a 0 y menor a 100";isError= true;}

    if(state.attack > 100 || state.attack <= 0 ){ errores.attack = "Attack tiene que ser mayor a 0 y menor a 100";isError= true;}
    
    if(state.defense > 100 || state.defense <= 0 ){errores.defense = "Defense tiene que ser mayor a 0 y menor a 100";isError= true;}

   
    return isError?errores:null
};

