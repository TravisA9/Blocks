using HttpServer
using WebSockets
import HttpServer.mimetypes

#global Dict to store open connections in
global connections = Dict{Int,WebSocket}()
global usernames   = Dict{Int,String}()

function decodeMessage( msg )
    String(copy(msg))
end

wsh = WebSocketHandler() do req, client
    global connections
    @show connections[client.id] = client
    while true
        msg = read(client)
        msg = decodeMessage(msg)
        if startswith(msg, "setusername:")
            println("SETTING USERNAME: $msg")
            usernames[client.id] = msg[13:end]
        end
        if startswith(msg, "say:")
            println("EMITTING MESSAGE: $msg")
            for (k,v) in connections
                if k != client.id
                    write(v, (usernames[client.id] * ": " * msg[5:end]))
                end
            end
        end
    end
end

dir = Pkg.dir("CodeServer","src") # ,"client.html"
println(dir)
# onepage = readstring(Pkg.dir("CodeServer","src","client.html"))
httph = HttpHandler() do req::Request, res::Response

  page = ""
  if ismatch(r"/?username=Hello/",req.resource)
    #println("hello")
    #page = dir*"/client.html"
     Response(readstring(dir*"/client.html"))
  else
    mime = mimetypes[match(r"(?:\.(\w+$))", req.resource)[1] ]
    println("   expected: " , mime) # ["Content-Type"]
    res.headers["Content-Type"] = mime

    println(req.resource, "   " ,res.headers["Content-Type"]) # ["Content-Type"]
    #page = dir*req.resource
    #onepage = readstring(page)
    #FileResponse(req.resource)
    Response(200, Dict{AbstractString,AbstractString}([("Content-Type",mime)]),readstring(dir*req.resource))
  end

#  Response(ismatch(r"^/hello/",req.resource) ? string("Hello ", split(req.resource,'/')[3], "!") : 404)

end

server = Server(httph, wsh)
println("Chat server listening on 8000...")
run(server,8000)
