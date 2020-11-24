interface GETResponseListener
{
    handleGETResponse(status:number, response:string):void;
}

interface POSTResponseListener
{
    handlePOSTResponse(status:number, response:string):void;
}

interface DELETEResponseListener {
    handleDelete(status: number, response: string, id: string): void;
}

interface PUTResponseListener {
    handlePut(status: number, response: string): void;
}

type DeleteRequest = {
    id: string;
}

type UpdateRequest = {
    id: string;
    state: boolean;
}

class MyFramework {
    private xhr: XMLHttpRequest;

    constructor() {

        this.xhr = new XMLHttpRequest();
    }


    getElementById(id: string): HTMLElement {
        let e: HTMLElement;
        e = document.getElementById(id);
        return e;
    }

    getElementByEvent(evt: Event): HTMLElement {
        return <HTMLElement>evt.target;
    }

    // request(url: string, method: string, body: any?, success: (...any) => void, error: (...any) => void) {
    //     this.xhr.onreadystatechange = function () {
    //         //0	UNINITIALIZED	todavía no se llamó a open().
    //         //1	LOADING	todavía no se llamó a send().
    //         //2	LOADED	send() ya fue invocado, y los encabezados y el estado están disponibles.
    //         //3	INTERACTIVE	Descargando; responseText contiene información parcial.
    //         //4	COMPLETED	La operación está terminada.
    //         if (this.readyState == 4) {
    //             if (this.status == 200) {
    //                 success(this.status, this.responseText);
    //             } else {
    //                 error(this.status, this.responseText);
    //             }
    //         }
    //     };

    //     this.xhr.open(method, url);
        
    //     this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //     if(body) {
    //         this.xhr.send(null);
    //     } else {
    //         this.xhr.send(JSON.stringify(body));
    //     }
    // }

    requestGET(url: string, listener: GETResponseListener): void {


        this.xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    listener.handleGETResponse(this.status, this.responseText);
                } else {
                    console.log("no devices found");
                }
            }
        };

        this.xhr.open('GET', url, true);
        this.xhr.send(null);
    }

    requestPOST(url: string, data: UpdateRequest, listener: POSTResponseListener): void {
        console.log(data)
        this.xhr.onreadystatechange = function () {

            if (this.readyState == 4) {
                if (this.status == 200) {
                    listener.handlePOSTResponse(this.status, this.responseText);
                } else {
                    listener.handlePOSTResponse(this.status, null);
                }
            }
        };

        this.xhr.open('POST', url);
        
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(data)
        this.xhr.send(JSON.stringify(data));
        console.log(JSON.stringify(data))
        //______________________________
        // envio Formdata en body de request (Usar con Apache,PythonWS,etc.)
        //let formData:FormData = new FormData();
        //for (let key in data) {
        //formData.append(key, data[key]);
        //}

        //xhr.send(formData);
        //______________________________
    }

    requestDelete(url: string, data: DeleteRequest, listener: DELETEResponseListener) {
        this.xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    listener.handleDelete(this.status, this.responseText, data.id);
                } else {
                    console.log("no pudo borrar");
                }
            }
        };
  

        this.xhr.open('DELETE', url);

        // envio JSON en body de request (Usar con NODEJS)
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhr.send(JSON.stringify(data));
    }


    requestPUT(url: string, data: DeviceInt, listener: PUTResponseListener) {
        console.log('data que va al request',data)
        this.xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    listener.handlePut(this.status, this.responseText);
                } else {
                    console.log("no pudo put ");
                    listener.handlePut(this.status, this.responseText);
                }
            }
        };
  

        this.xhr.open('PUT', url);

        // envio JSON en body de request (Usar con NODEJS)
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhr.send(JSON.stringify(data));
    }
    

    configEventLister(event: string, id: string, listener: EventListenerObject): void {
        let b: HTMLElement = document.getElementById(id);
        b.addEventListener(event, listener);
    }