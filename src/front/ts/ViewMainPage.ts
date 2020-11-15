class ViewMainPage{
    private myf:MyFramework; 

    constructor(myf:MyFramework)
    {
        this.myf = myf;  
    }

    createEditModal(device: DeviceInt): HTMLElement {
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
        e.appendChild(modal);
        return modal;
    }

    createAddModal(device: DeviceInt): HTMLElement {
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
              <input value="" id="device_name" type="text" class="validate">
              <label class="active" for="device_name">Nombre del Dispositivo</label>
              </div>
            <div class="input-field col s12">
            <input value="" id="device_description" type="text" class="validate">
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
        e.appendChild(modal);
        return modal;
    }

    closeModal(id: string) {
        let e = this.myf.getElementById(`modal_${id}`);
        e.remove();
    }

    showDevices(list: DeviceInt[]): void {
        let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar

        for (let dev of list)  // por cada dispositvo inserto la estructura de un elemento de la maqueta que estaba fija y le agrego el contenido que viene del json
        {
            let image = 'lightbulb.png';
            if (dev.type == 1) {
                image = 'window.png'
            }

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
            
        }
        
    getSwitchStateById(id:string):boolean
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;  // se castea para ver el estado del id

        return i.checked; // al ser un input puedo ver si esta tildado.
    }

}