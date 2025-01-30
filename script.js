const servers = [
    { name: "Lobby", address: "167.235.169.242:28217", description: "A welcoming place for all players." },
    { name: "Survival", address: "157.90.141.190:21512", description: "Explore and survive in a vast world." },
    { name: "Bedwars", address: "157.90.141.190:28377", description: "Team up to fight in bed destruction battles." },
    { name: "Minigames", address: "157.90.141.190:21819", description: "Enjoy a variety of fun mini-games." },
    { name: "Factions", address: "144.76.8.18:33690", description: "Create factions and fight for dominance." },
    { name: "Skyblock", address: "49.12.87.231:35907", description: "Survive on a tiny island in the sky." },
    { name: "Oneblock", address: "157.90.141.190:31927", description: "Start with a single block and survive." },
    { name: "Lifesteal", address: "157.90.141.190:32000", description: "Steal life from others in this hardcore server." },
    { name: "Skywars", address: "49.12.168.17:52302", description: "Battle on floating islands for survival." },
    { name: "PvP", address: "49.12.168.17:43357", description: "Engage in combat with other players." }
];

function checkServerStatus(serverAddress) {
    const [ip, port] = serverAddress.split(':');
    const url = `https://api.mcsrvstat.us/2/${ip}:${port}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const serverDiv = document.getElementById(serverAddress);
            if (data.online) {
                serverDiv.classList.add("online");
                serverDiv.classList.remove("offline");
                serverDiv.querySelector(".status").textContent = "Online";
            } else {
                serverDiv.classList.add("offline");
                serverDiv.classList.remove("online");
                serverDiv.querySelector(".status").textContent = "Offline";
            }
        })
        .catch(() => {
            const serverDiv = document.getElementById(serverAddress);
            serverDiv.classList.add("offline");
            serverDiv.classList.remove("online");
            serverDiv.querySelector(".status").textContent = "Offline";
        });
}

function displayServers() {
    const serverListDiv = document.getElementById("server-list");
    servers.forEach(server => {
        const serverDiv = document.createElement("div");
        serverDiv.classList.add("server");
        serverDiv.id = server.address;
        
        const serverName = document.createElement("h3");
        serverName.textContent = server.name;
        
        const serverDesc = document.createElement("p");
        serverDesc.textContent = server.description;
        
        const serverStatus = document.createElement("p");
        serverStatus.classList.add("status");
        serverStatus.textContent = "Checking...";

        // Appending elements to serverDiv
        serverDiv.appendChild(serverName);
        serverDiv.appendChild(serverDesc);
        serverDiv.appendChild(serverStatus);
        
        // Append serverDiv to the server list
        serverListDiv.appendChild(serverDiv);

        // Check the server's status
        checkServerStatus(server.address);
    });
}

// Display servers when the page loads
displayServers();
