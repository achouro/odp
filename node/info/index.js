const http=require('http');
const fs =require('fs');
const path=require('path');

const directory='pages';
const PORT=8080;

const server=http.createServer()

server.on('request', (request, response)=>{

    let file_path='';
    let status_code=200;

    if(request.url==='/' || request.url==='/index' || request.url==='/index.html'){
        file_path=path.join(directory, 'index.html')
    }
    else if(request.url==='/about'  || request.url==='/about.html'){
        file_path=path.join(directory, 'about.html')
    }
    else if(request.url==='/contact' || request.url==='/contact.html'){
        file_path=path.join(directory, 'contact.html')
    }
    else if (request.url === '/style.css') {
        file_path = path.join(directory, 'style.css');
        content_type = 'text/css';
    }
    else{
        file_path=path.join(directory, '404.html');
        status_code=404;

    }

    fs.readFile(file_path, (error, content)=>{
        if(error){
            //status_code=500;
            console.error("File read error:", error);
            response.writeHead(500, {'Content-Type':'text/plain'});
            response.end('500 Internal Server Error')
        }

        else{
            response.writeHead(status_code, {'Content-Type':'text/html'});
            response.end(content,'utf-8');
        }
    })
})

server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})

