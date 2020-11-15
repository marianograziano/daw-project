/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+a
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
interface DeviceInt {
    id: number;
    name: string;
    description: string;
    state: number;
    type: number;
}


class Main implements EventListenerObject, GETResponseListener, POSTResponseListener, DELETEResponseListener {
    myf: MyFramework;
    view: ViewMainPage;
    counter: number = 0;
    devices: Array<DeviceInt>;

    main(): void {
        console.log("estoy en main()");

        let usuarios: Array<User>;
        usuarios = new Array<User>();
        usuarios.push(new User(1, "Mariano", "mariano@gmail.com"));
        usuarios.push(new User(2, "Juan", "juan@gmail.com"));
        usuarios.push(new User(3, "Pedro", "pedro@gmail.com"));

        this.mostrarUsers(usuarios);

        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf); // Encapsular todo lo que es front


        this.myf.requestGET("http://localhost:8000/dispositivos", this);
    }

    mostrarUsers(users: Array<User>): void {
        //    for (let i in users)
        //    {
        //        users[i].printInfo ();
        //    }
        //    {
        //        o.printInfo ();
        //     }
    }

    handleEvent(evt: Event): void {
        console.log(`se hizo "${evt.type}"`);

        let b: HTMLElement = this.myf.getElementByEvent(evt);
        console.log("element", b);
        const [action, id] = b.id.split("_");
        console.log("action", action);
        console.log("id", id);

        switch (action) {

            case "dev": {
                const state: boolean = this.view.getSwitchStateById(b.id);

                const data = {"id": id, "state": state};
                this.myf.requestPOST("http://localhost:8000/dispositivos/estados", data, this);
                break;
            }

            case "del": {
                const data = {"id": id};
                this.myf.requestDelete("http://localhost:8000/dispositivos", data, this);
                break;
            }

            case "edi": {
                //const device = this.devices.lastIndexOf(id)
                const device = this.devices.find(d =>  `${d.id}` === id);//funca pero con es6 https://dev.to/wangonya/finding-an-element-in-the-array-the-es5-es6-and-es7-way-7cl
                this.view.createEditModal(device);
                let saveButton = this.myf.getElementById(`save_${id}`);
                saveButton.addEventListener("click", () => {
                //this.myf.requestPOST("http://localhost:8000/dispositivos/estados", device, this);                   

                    console.log("click guardar por edi");
                });

                let closeButton = this.myf.getElementById(`close_${id}`);
                closeButton.addEventListener("click", () => {
                    // buscar todos los input y hacer un guardar
                    console.log("cerrar modal");
                    this.view.closeModal(id);
                });


                break;
            }

        }
    }


    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);

        this.devices = JSON.parse(response) as Array<DeviceInt>;

        console.log(this.devices);

        this.view.showDevices(this.devices);

        for (let d of this.devices) {
            let b: HTMLElement = this.myf.getElementById(`dev_${d.id}`);
            b.addEventListener("click", this);

            let del: HTMLElement = this.myf.getElementById(`del_${d.id}`);
            del.addEventListener("click", this);

            let edi: HTMLElement = this.myf.getElementById(`edi_${d.id}`);
            edi.addEventListener("click", this);
        }
    }

    handleDelete(status: number, response: string, id: string): void {
        switch (status) {
            case 200: {
                let row: HTMLElement = this.myf.getElementById(`row_${id}`);
                row.remove();
                break;
            }

            default:
                console.log("Ocurrio un error: ", response)
        }
    }

    handlePOSTResponse(status: number, response: string): void {
        console.log(status);
        console.log(response);
    }
}


window.onload = () => {
    let m: Main = new Main();
    m.main();
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