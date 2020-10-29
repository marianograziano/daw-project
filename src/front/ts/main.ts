/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
class User {
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;
    
    constructor (id:number, name:string, email:string) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    set id(id:number){
        this._id = id
    }
    
     get id():number{
         return this._id
     }

    set name(id:string){
        this._name = name;
    }
    
    get name():string{
         return this._name
     }

    set email(email:string){
        this._email = email;
    }
    
    get email():string{
         return this._email
     }
    
    set islogged(islogged:boolean){
        this.islogged = islogged;
    }
    
    get islogged():boolean{
         return this.islogged
     }

    printInfo():void{
        console.log("id : " + this._id + ") nombre : " + this._name + " email : " + this.email)


    }


}





class Main {
    main():void {
        console.log("Mensaje desde Main");
        
        let usuarios:Array<User>;
        usuarios = new Array<User>();
        usuarios.push(new User(1,"Mariano","mariano@gmail.com"))
        usuarios.push(new User(2,"Juan","juan@gmail.com"))
        usuarios.push(new User(3,"Pedro","pedro@gmail.com"))

        for (let i in usuarios)
        {
            usuarios[i].printInfo()
        }



}
}



window.onload = function() {
        let m:Main = new Main()
        m.main ();

}


//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
 }

 //document.body.innerHTML = greeter(user);
 console.log("Hola mundo!");

//=======[ End of file ]=======================================================
