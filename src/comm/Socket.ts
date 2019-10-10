module socket {
    export class MQTTSocketComm {

        constructor(){
            let client = new TestClient({
                service: 'pg.srv.loadtest',
                id: 'f5ef197c-6021-4f43-90b4-71749d217957',
                secret: '4114f79f17c28ec6bfa01b80a28870a7',            
                authhost: 'http://18.139.237.86:8080/loadtest/api/auth',
                hostname:"18.139.237.86",
                port:"15675", 
                path:"/ws",
                protocol:"ws"
            })
            client.subscribe("CONNECT",function(){
                console.log("Connected")
            })
            client.connect()

            logger.l("MQTTSocketComm is created");
        }
    }
}