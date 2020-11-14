/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
interface DeviceInt
{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
}
    
    class Main implements EventListenerObject, GETResponseListener{
        
        myf:MyFramework;
        
        main():void {
            console.log("Mensaje desde Main");
            
            let usuarios:Array<User>;
            usuarios = new Array<User>();
            usuarios.push(new User(1,"Mariano","mariano@gmail.com"))
            usuarios.push(new User(2,"Juan","juan@gmail.com"))
            usuarios.push(new User(3,"Pedro","pedro@gmail.com"))

            this.mostrarUsers(usuarios)
            this.myf = new MyFramework();    
            let b:HTMLElement = document.getElementById ("boton");       
            b.addEventListener("click",this)
            this.myf.requestGET('devices.txt',this)
        }

    mostrarUsers(users:Array<User>):void {
        for (let i in users)
        {
            users[i].printInfo();
        }

    }
    handleEvent(evt: Event): void {
        console.log("Se hizo click");
        console.log(this);
                }
    handleGETResponse(status: number, response: string): void {
        console.log("Respujesta del servidor: "+ response)
        let data: Array<DeviceInt> = JSON.parse (response);       
        console.log (data);
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
