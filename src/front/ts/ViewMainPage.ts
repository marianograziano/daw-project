class ViewMainPage {
    private myf: MyFramework;
  
    constructor(myf: MyFramework) {
      this.myf = myf;
    }
  
    createModal(
      device: DeviceInt,
      listener: (device: DeviceInt, modal: HTMLElement, main: Main) => void,
      main: Main
    ): HTMLElement {
      let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar
      let modal: HTMLElement = document.createElement("div");
      modal.setAttribute("class", "modal open");
      modal.setAttribute("tabindex", "0");
      modal.setAttribute(
        "style",
        "z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);"
      );
  
      modal.innerHTML = `
  
              <div class="row">
              <form id="modal_form">
                  <h4>Detalles dispositivo</h4>
                  <div class="input-field col s12">
                  <input value="${
                    device.name
                  }" id="device_name" type="text" class="validate">
                  <label class="active" for="device_name">Nombre del Dispositivo</label>
                  </div>
                  <div class="input-field col s12">
                  <input value="${
                    device.description
                  }" id="device_description" type="text" class="validate">
                  <label class="active" for="device_description">Descripción del Dispositivo</label>
                  </div>     
                  <div class="switch input-field col s12">
                  <label class="active" for="device_state">Estado del Dispositivo</label>                            
                  <label>
                                              Off
                                              <input id="modal_device_state" type="checkbox" ${
                                                device.state === 1
                                                  ? "checked"
                                                  : ""
                                              }> <!-- id para controlar el switch --!> 
                                              <span class="lever"></span>
                                              On
                                              </label>
                                              
                  </div>
                  <div class="switch input-field col s8">
                      <label>Dimmer del Dispositivo</label>                            
                      <p class="range-field">
                      <input type="range" id="device_dimmer" min="0" max="100" value="30"/>
                  </p>
                                          
                  </div>
          </form>                                                 
              </div>
              
              </div>
              <div id="modal-footer" class="modal-footer">
              </div>`;
  
      let saveButton = document.createElement("a");
      saveButton.setAttribute("href", "#!");
      saveButton.setAttribute("id", `save_${device.id}`);
      saveButton.setAttribute(
        "class",
        "modal-close waves-effect waves-green btn-flat"
      );
      saveButton.innerText = "guardar";
      saveButton.addEventListener("click", () => {
        const name: HTMLInputElement = modal.querySelector("#device_name");
        const description: HTMLInputElement = modal.querySelector(
          "#device_description"
        );
        const state: HTMLInputElement = modal.querySelector(
          "#modal_device_state"
        );
        const dimmer: HTMLInputElement = modal.querySelector("#device_dimmer");
  
        console.log("name", name.value);
        console.log("description", description);
        console.log("sate", state);
        console.log("dimmer", dimmer);
  
        listener(
          {
            ...device,
            name: name.value,
            description: description.value,
            state: state.checked ? 1 : 0,
          },
          modal,
          main
        );
      });
  
      let closeButton = document.createElement("a");
      closeButton.setAttribute("href", "#!");
      closeButton.setAttribute("id", `close_${device.id}`);
      closeButton.setAttribute(
        "class",
        "modal-close waves-effect waves-green btn-flat"
      );
      closeButton.innerText = "cerrar";
      closeButton.addEventListener("click", () => {
        modal.remove();
      });
  
      let modalFooter = modal.querySelector("#modal-footer");
      modalFooter.appendChild(saveButton);
      modalFooter.appendChild(closeButton);
  
      e.appendChild(modal);
  
      return modal;
    }
  
    closeModal(id: string) {
      let e = this.myf.getElementById(`modal_${id}`);
      e.remove();
    }
  
    showDevices(list: DeviceInt[]): void {
      console.log("Show Devices");
      let e: HTMLElement = this.myf.getElementById("devicesList"); // obtengo el lugar adonde tengo que agregar
      let nuevo_id = 0;
      e.innerHTML = "";
      for (let dev of list) {
        // por cada dispositvo inserto la estructura de un elemento de la maqueta que estaba fija y le agrego el contenido que viene del json
        let image = "lightbulb.png";
  
        if (dev.type == 1) {
          image = "window.png";
        }
        if (dev.id >> nuevo_id) {
          nuevo_id = dev.id;
        }
  
        e.innerHTML += `<li id="row_${dev.id}" class="collection-item avatar">
                                  <img src="static/images/${image}" alt="" class="circle">
                                  <span class="title">${dev.name}</span>
                                  <p>${dev.description}</p>
                                  <a href="#!" class="secondary-content">
                                      <div class="switch">
                                          <label>
                                          Off
                                          <input id="dev_${
                                            dev.id
                                          }" type="checkbox" > <!-- id para controlar el switch --!>
                                          <span class="lever"></span>
                                          On
                                          </label>
                                          
                                         <span class="material-icons" id="del_${
                                           dev.id
                                         }">delete</span>
                                         <span class="material-icons" id="edi_${
                                           dev.id
                                         }">edit</span>
                                      </div>
                                    </a>
                              </li>`;
      }
      e.innerHTML += `<a href="#!" id="add_new" class="modal-close waves-effect waves-green btn-flat">Agregar</a>`;
    }
  
    getSwitchStateById(id: string): boolean {
      let e: HTMLElement = this.myf.getElementById(id);
      let i: HTMLInputElement = <HTMLInputElement>e; // se castea para ver el estado del id
  
      return i.checked; // al ser un input puedo ver si esta tildado.
    }