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
    // counter: number = 0;
    devices: Array<DeviceInt>;

    main(): void {
        console.log("Metodo main de clase Main");
        //let usuarios: Array<User>;
       // usuarios = new Array<User>();
        //usuarios.push(new User(1, "Mariano", "mariano@gmail.com"));
       // usuarios.push(new User(2, "Juan", "juan@gmail.com"));
      //  usuarios.push(new User(3, "Pedro", "pedro@gmail.com"));

      // this.mostrarUsers(usuarios); 

        this.myf = new MyFramework(); // Framework 
        this.view = new ViewMainPage(this.myf); // Front


        this.myf.requestGET("http://localhost:8000/dispositivos", this);
    }


    handleEvent(evt: Event): void {
        let evtelement: HTMLElement = this.myf.getElementByEvent(evt);
        console.log(`se hizo "${evt.type}"`);
        console.log("En el elemento", evtelement);
        const [action, id] = evtelement.id.split("_");
        console.log("La accion es ", action);
        console.log("el id es", id);

        switch (action) {

            case "dev": {
                const state: boolean = this.view.getSwitchStateById(evtelement.id);

                const data = {"id": id, "state": state};
                this.myf.requestPOST("http://localhost:8000/dispositivos/estados", data, this);
                break;
            }

            case "del": {
                const data = {"id": id};
                this.myf.requestDelete("http://localhost:8000/dispositivos", data, this);
                break;
            }

            case "add": {
<<<<<<< HEAD
                
                const device = this.devices.find(d =>  `${d.id}` === id)
                console.log(this.devices.values);
                this.view.createAddModal(device);
                let saveButton = this.myf.getElementById(`add_${id}`);
                saveButton.addEventListener("click", () => {
                //this.myf.requestPOST("http://localhost:8000/dispositivos/estados", device, this);                   

                    console.log("click guardar por edi");
                });
=======
                const device: DeviceInt = {id: null, type: 0,  state: 0, description: "nuevo dispositivo", name: "nuevo dispositivo"}
                this.view.createModal(device,  this.saveEditedDevice);
                break;
>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
            }              
            case "edi": {
                console.log('entro al case');
                const device = this.devices.find(d =>  `${d.id}` === id);//funca pero con es6 https://dev.to/wangonya/finding-an-element-in-the-array-the-es5-es6-and-es7-way-7cl
<<<<<<< HEAD
                this.view.createModal(device,'edit');
                console.log(device);
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


=======
                this.view.createModal(device,this.saveEditedDevice);
>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
                break;
            }

        }
    }

    saveEditedDevice(device: DeviceInt, modal: HTMLElement) {
        // hacer request para guardar el dispositivo en la bd
        console.log("device -> ", device);
        modal.remove();
    }

    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);

        this.devices = JSON.parse(response) as Array<DeviceInt>;

        console.log(this.devices);
        
        this.view.showDevices(this.devices); // muestro los dispo 

        for (let dispo of this.devices) {  // creo los eventos
            let b: HTMLElement = this.myf.getElementById(`dev_${dispo.id}`);
            b.addEventListener("click", this);
            console.log('for_',dispo.id)
            console.log('b',this)

            let del: HTMLElement = this.myf.getElementById(`del_${dispo.id}`);
            del.addEventListener("click", this);

            let edi: HTMLElement = this.myf.getElementById(`edi_${dispo.id}`);
            edi.addEventListener("click", this);
        }
<<<<<<< HEAD
        let add: HTMLElement = this.myf.getElementById(`add_1`);
        add.addEventListener("click", this);
=======

        this.myf.getElementById("add_new").addEventListener("click", this);

>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
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



//=======[ Main module code ]==================================================







//=======[ End of file ]=======================================================