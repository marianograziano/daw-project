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


class Main implements EventListenerObject, GETResponseListener, POSTResponseListener, DELETEResponseListener, PUTResponseListener {
    myf: MyFramework;
    view: ViewMainPage;
    // counter: number = 0;
    devices: Array<DeviceInt>;

    constructor(framework: MyFramework, view: ViewMainPage) {
        this.myf = framework;
        this.view = view;
    }


    start(): void {
        console.log("Metodo main de clase Main");
        //let usuarios: Array<User>;
       // usuarios = new Array<User>();
        //usuarios.push(new User(1, "Mariano", "mariano@gmail.com"));
       // usuarios.push(new User(2, "Juan", "juan@gmail.com"));
      //  usuarios.push(new User(3, "Pedro", "pedro@gmail.com"));

      // this.mostrarUsers(usuarios); 

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
                const device: DeviceInt = {id: null, type: 0,  state: 0, description: "nueva descrp", name: "nuevo nomb"}
                this.view.createModal(device,this.saveAddedDevice, this);
                break;
            }              
            case "edi": {
                const device = this.devices.find(d =>  `${d.id}` === id);//funca pero con es6 https://dev.to/wangonya/finding-an-element-in-the-array-the-es5-es6-and-es7-way-7cl
                this.view.createModal(device,this.saveEditedDevice, this);
                break;
            }

        }
    }

    saveEditedDevice(device: DeviceInt, modal: HTMLElement, main: Main) {
        
        console.log("device a salvar -> ", device);
        main.devices = main.devices.map(d => d.id === device.id ? device : d);
        main.myf.requestPUT("http://localhost:8000/dispositivos/${device.id}",device,main);
        modal.remove();
    }

    saveAddedDevice(device: DeviceInt, modal: HTMLElement, main: Main) {
        
        console.log("Added device -> ", device);
        main.myf.requestPOST("http://localhost:8000/dispositivos", device ,main);
        modal.remove();
    }

    handlePut(status: number, response: string) {
        console.log(status);
        console.log(response);
        this.refreshDevicesView();
    }
    

    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);

        this.devices = JSON.parse(response) as Array<DeviceInt>;

        console.log(this.devices);
        
        this.refreshDevicesView();

    }

    refreshDevicesView() {
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

        this.myf.getElementById("add_new").addEventListener("click", this);
    }

    handleDelete(status: number, response: string, id: string): void {
        switch (status) {
            case 200: {
                this.devices = this.devices.filter( d => `${d.id}` !== id);
                this.refreshDevicesView();
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
    const framework = new MyFramework()
    let m: Main = new Main(framework, new ViewMainPage(framework));
    m.start();
}


//=======[ Settings, Imports & Data ]==========================================



//=======[ Main module code ]==================================================







//=======[ End of file ]=======================================================