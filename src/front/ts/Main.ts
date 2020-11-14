/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+a
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
interface DeviceInt
{
    id:number;
    name:string;
    description:string;
    state:number;
    type:number;
}


class Main implements EventListenerObject, GETResponseListener, POSTResponseListener
{
    myf:MyFramework;
    view:ViewMainPage;
    counter:number = 0;

    main():void 
    {
        console.log("estoy en main()");

        let usuarios:Array<User>;
        usuarios = new Array<User>();
        usuarios.push (new User(1, "Mariano", "mariano@gmail.com"));
        usuarios.push (new User(2, "Juan", "juan@gmail.com"));
        usuarios.push (new User(3, "Pedro", "pedro@gmail.com"));

        this.mostrarUsers (usuarios);

        this.myf = new MyFramework ();
        this.view = new ViewMainPage (this.myf); // Encapsular todo lo que es front 


        this.myf.configEventLister ("click", "boton", this);

        this.myf.requestGET ("http://localhost:8000/dispositivos", this);

        
    }

    mostrarUsers(users:Array<User>):void
    {
    //    for (let i in users)
    //    {
    //        users[i].printInfo ();
    //    }
    //    {
    //        o.printInfo ();
   //     }
    }

    handleEvent(evt: Event): void
    {
        console.log (`se hizo "${evt.type}"`);

        let b:HTMLElement = this.myf.getElementByEvent (evt); // QUE ELEMENTO ORigino el evento.
        console.log (b);

        if (b.id == "boton")
        {
            this.counter ++;
            b.textContent = `Click ${this.counter}`;
        }
        else 
        {
            let state:boolean = this.view.getSwitchStateById (b.id);

            let data = { "id":`${b.id}`, "state":state };
            this.myf.requestPOST ("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post", data, this);
            //this.myf.requestPOST ("Devices.php", data, this);
        }
    }

    handleGETResponse(status: number, response: string): void
    {
        console.log ("Respuesta del servidor: " + response);

        let data: Array<DeviceInt> = JSON.parse (response);

        console.log (data);

        this.view.showDevices (data);

        for (let d of data)
        {
            let b:HTMLElement = this.myf.getElementById (`dev_${d.id}`);
            b.addEventListener ("click", this);
        }
    }

    handlePOSTResponse(status: number, response: string): void
    {
        console.log (status);
        console.log (response);
    }
}


window.onload = () => {
    let m:Main = new Main ();
    m.main ();
}


//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
}
 
// document.body.innerHTML = greeter(user);

console.log("Hola mundo!");


//=======[ End of file ]=======================================================