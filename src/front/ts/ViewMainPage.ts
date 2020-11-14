class ViewMainPage
{
    private myf:MyFramework; 

    constructor(myf:MyFramework)
    {
        this.myf = myf;  
    }

    showDevices(list: DeviceInt[]):void
    {
        let e:HTMLElement = this.myf.getElementById ("devicesList"); // obtengo el lugar adonde tengo que agregar 

        for (let dev of list)  // por cada dispositvo inserto la estructura de un elemento de la maqueta que estaba fija y le agrego el contenido que viene del json
        {
            let image = 'lightbulb.png';
            if (dev.type == 1)
            {
                image = 'window.png'
            }

            let checked = '';
            if (dev.type == 1)
            {
                checked = 'checked'
            }

            e.innerHTML += `<li class="collection-item avatar">
                                <img src="static/images/${image}" alt="" class="circle">
                                <span class="title">${dev.name}</span>
                                <p>${dev.description}</p>
                                <a href="#!" class="secondary-content">
                                    <div class="switch">
                                        <label>
                                        Off
                                        <input id="dev_${dev.id}" type="checkbox" ${checked}> <!-- id para controlar el switch --!>
                                        <span class="lever"></span>
                                        On
                                        </label>
                                        <span class="material-icons">delete</span>
                                    </div>
                                </a>
                            </li>`;

            
        }
        e.innerHTML +=
        `<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Agregar Dispositivo</a>
      
        
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>`;
    }

    getSwitchStateById(id:string):boolean
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;  // se castea para ver el estado del id

        return i.checked; // al ser un input puedo ver si esta tildado.
    }

}