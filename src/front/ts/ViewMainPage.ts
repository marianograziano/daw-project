class ViewMainPage {
    private myf: MyFramework;

    constructor(myf: MyFramework) {
        this.myf = myf;
    }

<<<<<<< HEAD
    createModal(device: DeviceInt,layout: string): HTMLElement {
        
        switch (layout) {
            
            case "edit": {

            let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar
            let modal: HTMLElement = document.createElement("div");
            modal.setAttribute("class", "modal open");
            modal.setAttribute("id",  `modal_${device.id}`);
            modal.setAttribute("tabindex", "0");
            modal.setAttribute("style", "z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);");

            modal.innerHTML +=
                `            
                
            <div class="row">
                <h4>Modificar Dispositivo</h4>
=======
    createModal(device: DeviceInt, listener: (device: DeviceInt, modal: HTMLElement) => void): HTMLElement {
        let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar
        let modal: HTMLElement = document.createElement("div");
        modal.setAttribute("class", "modal open");
        modal.setAttribute("tabindex", "0");
        modal.setAttribute("style", "z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);");

        modal.innerHTML =
            `
            <div class="row">
            <form>
                <h4>Detalles dispositivo</h4>
>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
                <div class="input-field col s12">
                <input value="${device.name}" id="device_name" type="text" class="validate">
                <label class="active" for="device_name">Nombre del Dispositivo</label>
                </div>
                <div class="input-field col s12">
                <input value="${device.description}" id="device_description" type="text" class="validate">
                <label class="active" for="device_description">Descripción del Dispositivo</label>
                </div>     
                <div class="switch input-field col s12">
<<<<<<< HEAD
                <label class="active" for="dev_${device.id}">Estado del Dispositivo</label>                            
                <label>
                                            Off
                                            <input id="dev_${device.id}" type="checkbox" ${device.state === 1 ? "checked" : ""}> <!-- id para controlar el switch --!> 
=======
                <label class="active" for="device_state">Estado del Dispositivo</label>                            
                <label>
                                            Off
                                            <input id="device_state" type="checkbox" ${device.state === 1 ? "checked" : ""}> <!-- id para controlar el switch --!> 
>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
                                            <span class="lever"></span>
                                            On
                                            </label>
                                            
                </div>
                <div class="switch input-field col s8">
<<<<<<< HEAD
                    <label>DImmer del Dispositivo</label>                            
                    <p class="range-field">
                    <input type="range" id="test5" min="0" max="100" />
                </p>
                                        
                </div>
                                                                        
            </div>
            
            <!--  ${device.id} --!>
            <!--<p>${device.name}</p> --!>
            <!--<p>${device.description}</p>--!> 
            <!--<p>${device.state}</p> --!>
            <!--<p>${device.type}</p> --!>
            </div>
            <div class="modal-footer">
            <a href="#!" id="save_${device.id}" class="modal-close waves-effect waves-green btn-flat">guardar</a>
            <a href="#!" id="close_${device.id}" class="modal-close waves-effect waves-green btn-flat">cerrar</a>

            </div>`;
            e.appendChild(modal);
            return modal;
            }
        case "add": {
    
        console.log('Llego al modal', device)
        let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar

        let modal: HTMLElement = document.createElement("div");
        modal.setAttribute("class", "modal open");
        modal.setAttribute("id",  `modal_${device.id}`);
        modal.setAttribute("tabindex", "0");
        modal.setAttribute("style", "z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);");

        modal.innerHTML +=
            `            
            
        <div class="row">
            <h4>Modificar Dispositivo</h4>
            <div class="input-field col s12">
              <input value="${device.name}" id="device_name" type="text" class="validate">
              <label class="active" for="device_name">Nombre del Dispositivo</label>
              </div>
            <div class="input-field col s12">
            <input value="${device.description}" id="device_description" type="text" class="validate">
            <label class="active" for="device_description">Descripción del Dispositivo</label>
            </div>     
            <div class="switch input-field col s12">
            <label class="active" for="dev_${device.id}">Estado del Dispositivo</label>                            
            <label>
                                        Off
                                        <input id="dev_${device.id}" type="checkbox" ${device.state === 1 ? "checked" : ""}> <!-- id para controlar el switch --!> 
                                        <span class="lever"></span>
                                        On
                                        </label>
                                        
            </div>
            <div class="switch input-field col s8">
                 <label>DImmer del Dispositivo</label>                            
                 <p class="range-field">
                 <input type="range" id="test5" min="0" max="100" />
               </p>
                                     
            </div>
                                                                    
        </div>
          
        <!--  ${device.id} --!>
        <!--<p>${device.name}</p> --!>
        <!--<p>${device.description}</p>--!> 
        <!--<p>${device.state}</p> --!>
        <!--<p>${device.type}</p> --!>
        </div>
        <div class="modal-footer">
        <a href="#!" id="save_${device.id}" class="modal-close waves-effect waves-green btn-flat">guardar</a>
        <a href="#!" id="close_${device.id}" class="modal-close waves-effect waves-green btn-flat">cerrar</a>

         </div>`;
=======
                    <label>Dimmer del Dispositivo</label>                            
                    <p class="range-field">
                    <input type="range" id="device_dimmer" min="0" max="100" value="30"/>
                </p>
                                        
                </div>
                                                                 
            </div>
             </form>  
            </div>
            <div id="modal-footer" class="modal-footer">
            </div>`;

        let saveButton = document.createElement("a");
        saveButton.setAttribute("href", "#!");
        saveButton.setAttribute("id", `save_${device.id}`);
        saveButton.setAttribute("class", "modal-close waves-effect waves-green btn-flat");
        saveButton.innerText = "guardar";
        saveButton.addEventListener("click", () => {
            const name = modal.querySelector("#device_name").getAttribute("value");
            const description = modal.querySelector("#device_description").getAttribute("value");
            const state = modal.querySelector("#device_state").getAttribute("checked");
            const dimmer = modal.querySelector("#device_dimmer").getAttribute("value");

            console.log("name", name);
            console.log("description", description);
            console.log("sate", state);
            console.log("dimmer", dimmer);

            listener({...device, name, description, state: parseInt(state)}, modal);
        });

        let closeButton = document.createElement("a");
        closeButton.setAttribute("href", "#!");
        closeButton.setAttribute("id", `close_${device.id}`);
        closeButton.setAttribute("class", "modal-close waves-effect waves-green btn-flat");
        closeButton.innerText = "cerrar";
        closeButton.addEventListener("click", () => {
            modal.remove();
        });

        let modalFooter = modal.querySelector("#modal-footer");
        modalFooter.append(saveButton, closeButton);

>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
        e.appendChild(modal);

        return modal;
    }
<<<<<<< HEAD
}   }
    
   
=======


>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
    closeModal(id: string) {
        let e = this.myf.getElementById(`modal_${id}`);
        e.remove();
    }

    showDevices(list: DeviceInt[]): void {
        console.log('Show Devices')
        let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar
        let nuevo_id = 0;
        for (let dev of list)  // por cada dispositvo inserto la estructura de un elemento de la maqueta que estaba fija y le agrego el contenido que viene del json
        {
            let image = 'lightbulb.png';
<<<<<<< HEAD
            
=======

>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7
            if (dev.type == 1) {
                image = 'window.png'
            }
            if (dev.id >> nuevo_id) {
                nuevo_id = dev.id;
            }
<<<<<<< HEAD
            
            
=======

>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7

            e.innerHTML += `<li id="row_${dev.id}" class="collection-item avatar">
                                <img src="static/images/${image}" alt="" class="circle">
                                <span class="title">${dev.name}</span>
                                <p>${dev.description}</p>
                                <a href="#!" class="secondary-content">
                                    <div class="switch">
                                        <label>
                                        Off
                                        <input id="dev_${dev.id}" type="checkbox" ${dev.state === 1 ? "checked" : ""}> <!-- id para controlar el switch --!>
                                        <span class="lever"></span>
                                        On
                                        </label>
                                        
                                       <span class="material-icons" id="del_${dev.id}">delete</span>
                                       <span class="material-icons" id="edi_${dev.id}">edit</span>
                                    </div>
                                  </a>
                            </li>`;


        }
<<<<<<< HEAD
        console.log("nuevo_id ",nuevo_id)
        nuevo_id += 1;
        console.log("nuevo_id ",nuevo_id)
        // e.innerHTML +=`<a href="#!"><span  id="add_${nuevo_id}">playlist_add</span>Agregar Dispositivo</a>`
        e.innerHTML +=`<a href="#!" id="add_${nuevo_id}" class="modal-close waves-effect waves-green btn-flat">Agregar</a>`
        }
        
    getSwitchStateById(id:string):boolean
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;  // se castea para ver el estado del id
=======
        e.innerHTML += `<a href="#!" id="add_new" class="modal-close waves-effect waves-green btn-flat">Agregar</a>`
    }

    getSwitchStateById(id: string): boolean {
        let e: HTMLElement = this.myf.getElementById(id);
        let i: HTMLInputElement = <HTMLInputElement>e;  // se castea para ver el estado del id
>>>>>>> d40da119de1a66872b459e42de86632e4f9bbca7

        return i.checked; // al ser un input puedo ver si esta tildado.
    }

}