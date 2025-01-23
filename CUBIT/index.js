players = [0,0,0,0,0,0,0,0,0,0]
player = ["red","blue","rgb(9, 164, 9)","yellow","purple","rgb(54, 215, 215)","pink","white","orange","rgb(99, 41, 18)"] // 0 1 2 3 4 5 6 7 8 9
remaining = player.length
gamer = 0;
turns = 0;
attacks = 0;
transfers = 0;
action = null;
singleplayer = null;
pro = 0;
for(i = 0; i < 10; i++){
    team = document.createElement("div")
    team.classList.add("team")
    team.setAttribute("gamer", i)
    team.setAttribute("onclick", "start(this), singleplayer = true")
    team.style.backgroundColor = player[i]
    document.getElementById("menu").appendChild(team)
}
mp = document.createElement("div")
mp.style = "width: 100%; height: 90px; text-align: center; font-size: 215%; float: left; background-color: aliceblue; padding-top: 9%"
mp.innerHTML = "Tryb dla wielu graczy"
mp.classList.add("multiplayer")
mp.setAttribute("gamer", Math.floor(Math.random() * 10))
mp.setAttribute("onclick", "start(this), singleplayer = false")
document.getElementById("menu").appendChild(mp)
function generate(){
    for(i = 0; i < 100; i++){
        cube = document.createElement("div");
        cube.classList.add("cube");
        distribute();
        cube.setAttribute("id", i);
        cube.setAttribute("onclick", "pick(this)");
        cube.setAttribute("onmouseenter", "selector(this.id)")
        cube.setAttribute("onmouseleave", "selector2(this.id)")
        document.getElementById("field").appendChild(cube)
    }   
}
function distribute(){
    owner = Math.floor(Math.random() * 10);
    if(players[owner] > 9){
        reroll();
    }
    else{
        players[owner] = players[owner] + 1;
        cube.setAttribute("owner", owner);
        power = Math.floor(Math.random() * 3) + 1;
        cube.setAttribute("power", power);
        cube.style.backgroundColor = player[owner];
        cube.innerHTML = power;
    }
}
function reroll(){
    owner = Math.floor(Math.random() * 10);
    distribute();
}
function pick(s){
    if(s.getAttribute("owner") == gamer && s.classList.contains("outofreach") == false && action == null){
        action = s.id
        owner = s.getAttribute("owner");
        power = s.getAttribute("power");
        id = s.getAttribute("id");
        s.style.border = "dashed 2px"
        for(i = 0; i<100; i++){
            document.getElementById(i).classList.add("outofreach");
            if(document.getElementById(i).style.border == ("2px dashed") && action != document.getElementById(i).id){
                document.getElementById(i).style.border = "";
            }
        }
        document.getElementById(id).classList.remove("outofreach");
        document.getElementById("passbutton").classList.add("hidden")
        if(id == 10 || id == 20 || id == 30 || id == 40 || id == 50 || id == 60 || id == 70 || id == 80){
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
        else if(id == 19 || id == 29 || id == 39 || id == 49 || id == 59 || id == 69 || id == 79 || id == 89){
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
        else if(id == 0){
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
        else if(id == 9){
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
        else if(id == 99){
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
        }
        else if(id == 90){
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
        }
        else if(id > 0 && id < 9){
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
        else if(id > 90 && id < 99){
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
        }
        else{
            document.getElementById(Number(id)+1).classList.remove("outofreach")
            document.getElementById(Number(id)-1).classList.remove("outofreach")
            document.getElementById(Number(id)-10).classList.remove("outofreach")
            document.getElementById(Number(id)+10).classList.remove("outofreach")
        }
    }
    else if(action != null && document.getElementById(s.id).classList.contains("outofreach") == false){
        p1 = Number(document.getElementById(action).getAttribute("power"))
        p2 = Number(document.getElementById(s.id).getAttribute("power"))
        if(s.style.backgroundColor != player[owner] && attacks < 1){
            if(p1 - 1 > p2){
                attacks = attacks + 1;
                document.getElementById("attacks").innerHTML = "Attacks: " + attacks + " / 1"
                document.getElementById("passbutton").style.backgroundColor = "yellow"
                document.getElementById(action).setAttribute("power", p1 - p1 + 1);
                document.getElementById(s.id).setAttribute("power", p1 - 1 - p2)
                document.getElementById(action).innerHTML = document.getElementById(action).getAttribute("power")
                document.getElementById(s.id).innerHTML = document.getElementById(s.id).getAttribute("power")
                s.style.backgroundColor = player[owner]
                players[gamer] = players[gamer] + 1;
                players[document.getElementById(s.id).getAttribute("owner")] = players[document.getElementById(s.id).getAttribute("owner")] - 1;
                s.setAttribute("owner", gamer);
            }
            else if(p1 + 1 < p2){
                attacks = attacks + 1;
                document.getElementById("attacks").innerHTML = "Attacks: " + attacks + " / 1"
                document.getElementById("passbutton").style.backgroundColor = "yellow"
                document.getElementById(action).setAttribute("power", p1 - p1 + 1);
                document.getElementById(s.id).setAttribute("power", p2 - 1 - p1)
                document.getElementById(action).innerHTML = document.getElementById(action).getAttribute("power")
                document.getElementById(s.id).innerHTML = document.getElementById(s.id).getAttribute("power")
                document.getElementById(action).style.backgroundColor = player[document.getElementById(s.id).getAttribute("owner")];
                players[gamer] = players[gamer] - 1;
                players[document.getElementById(s.id).getAttribute("owner")] = players[document.getElementById(s.id).getAttribute("owner")] + 1;
                document.getElementById(action).setAttribute("owner", document.getElementById(s.id).getAttribute("owner"));
            }
            clearselection();
        }
        else if(s.style.backgroundColor == player[owner] && s.id != action && transfers < 5){
            if(document.getElementById(action).getAttribute("power") != document.getElementById(s.id).getAttribute("power") && Number(document.getElementById(action).getAttribute("power")) > 1){
                transfers = transfers + 1;
                document.getElementById("transfers").innerHTML = "Transfery: " + transfers + " / 5"
            }
            document.getElementById(action).setAttribute("power", p1 - p1 + 1);
            document.getElementById(s.id).setAttribute("power", p2 + p1 - 1);
            document.getElementById(action).innerHTML = document.getElementById(action).getAttribute("power");
            document.getElementById(s.id).innerHTML = document.getElementById(s.id).getAttribute("power");
            document.getElementById("passbutton").style.backgroundColor = "yellow"
            clearselection();
        }
        else{
            clearselection();
        }
    }
}
    function selector(b){
        if(document.getElementById(b).getAttribute("owner") == gamer && (document.getElementById(b).classList.contains("outofreach") == false)){
            document.getElementById(b).classList.add("div.selector", "selector");
        }
    }
    function selector2(b){
        if(document.getElementById(b).getAttribute("owner") == gamer && (document.getElementById(b).classList.contains("outofreach") == false)){
            document.getElementById(b).classList.remove("div.selector", "selector");
        }
    }
    function clearselection(){
        if(singleplayer == true && players[firstplayer] < 1){
            winner(null);
        }
        for(i = 0; i < players.length; i++){
            if(players[i] >= 100){
                winner(i);
            }
        }
        for(i = 0; i<100; i++){
            if(document.getElementById(i).style.border == ("2px dashed")){
                document.getElementById(i).style.border = "";
            }
            if(document.getElementById(i).classList.contains("outofreach")){
                document.getElementById(i).classList.remove("outofreach");
            }
        action = null;
        }
        if(attacks > 0 && transfers == 5){
            document.getElementById("passbutton").style.backgroundColor = "green"
        }
        document.getElementById("passbutton").classList.remove("hidden")
}
function start(g){
    gamer = g.getAttribute("gamer")
    firstplayer = gamer;
    document.getElementById("player").style.backgroundColor = player[gamer]
    generate();
    document.getElementById("menu").style.top = "100%"
    document.getElementById("stats").style.right = "0"
}
function NextTurn(){
    if(document.getElementById("passbutton").style.backgroundColor == "red"){
        if(pro > 2){
            gamer = Number(gamer) + 1;
            if(singleplayer == true){
                AI();
            }
            turns = turns + 1;
            isdead();
            if(gamer >= player.length){
                gamer = 0;
                isdead();
            }
            document.getElementById("player").style.backgroundColor = player[gamer]
            attacks = 0;
            transfers = 0;
            document.getElementById("attacks").innerHTML = "Ataki: " + attacks + " / 1"
            document.getElementById("transfers").innerHTML = "Transfery: " + transfers + " / 5"
            document.getElementById("passbutton").style.backgroundColor = "red"
        }
        else if(confirm("Nie wykonałeś żadnego ruchu, aby na pewno chcesz spasować?") == true){
            pro = pro + 1;
            gamer = Number(gamer) + 1;
            if(singleplayer == true){
                AI();
            }
            turns = turns + 1;
            isdead();
            if(gamer >= player.length){
                gamer = 0;
                isdead();
            }
            document.getElementById("player").style.backgroundColor = player[gamer]
            attacks = 0;
            transfers = 0;
            document.getElementById("attacks").innerHTML = "Ataki: " + attacks + " / 1"
            document.getElementById("transfers").innerHTML = "Transfery: " + transfers + " / 5"
            document.getElementById("passbutton").style.backgroundColor = "red"
            }
        }
        else{
            gamer = Number(gamer) + 1;
            if(singleplayer == true){
                AI();
            }
            turns = turns + 1;
            isdead();
            if(gamer >= player.length){
                gamer = 0;
                isdead();
            }
            document.getElementById("player").style.backgroundColor = player[gamer]
            attacks = 0;
            transfers = 0;
            document.getElementById("attacks").innerHTML = "Ataki: " + attacks + " / 1"
            document.getElementById("transfers").innerHTML = "Transfery: " + transfers + " / 5"
            document.getElementById("passbutton").style.backgroundColor = "red"
        }
        if(singleplayer == false){
            if(turns - remaining * 3 >= 0){
                turns = 0;
                for(i = 0; i<100; i++){
                    document.getElementById(i).setAttribute("power", Number(document.getElementById(i).getAttribute("power")) + 1);
                    document.getElementById(i).innerHTML = document.getElementById(i).getAttribute("power");
                }
            }
        }
        else if(singleplayer == true){
            if(turns > 3){
                turns = 0;
                for(i = 0; i<100; i++){
                    document.getElementById(i).setAttribute("power", Number(document.getElementById(i).getAttribute("power")) + 1);
                    document.getElementById(i).innerHTML = document.getElementById(i).getAttribute("power");
                }
            }
        }
        StrongestCube();
    }
function isdead(){
        if(players[gamer] < 1 && gamer != firstplayer){
            if(players[gamer] == 0){
                players[gamer] = 0 - 1;
                remaining = remaining - 1;
                console.log("remaining players: " + remaining)
            }
            gamer = gamer + 1;
            isdead();
        }
    }
function winner(w){
    if(w != null){
        document.getElementById("winner").innerHTML = "Wygrywa gracz " + w + "!";
        document.getElementById("winnertab").style.top = "50px";
        document.getElementById("winnertab").style.backgroundColor = player[w];
        document.getElementById("stats").style.right = "-100%"
    }
    else{
        document.getElementById("stats").style.transitionDelay = "0ms";
        document.getElementById("stats").style.transitionDuration = "200ms";
        document.getElementById("stats").style.right = "-100%";
    }
}
function AI(){
    while(singleplayer == true && gamer != firstplayer){
        if(singleplayer == true && players[firstplayer] < 1){
            winner(null);
        }
        const AIcubes = []
        AIAttacks = 0;
        AITransfers = 0;
        for(i = 0; i < 100; i++){
            if(Number(document.getElementById(i).getAttribute("owner")) == gamer){
                AIcubes.push(i)
            }
        }
        if(AIcubes.length < 1){
            gamer = gamer + 1;
            if(gamer >= player.length){
                gamer = 0;
            }
            AI();
        }
        else{
            function AITurn(){
                AIcube = AIcubes[Math.floor(Math.random() * AIcubes.length)]
                if(AIcube == 10 || AIcube == 20 || AIcube == 30 || AIcube == 40 || AIcube == 50 || AIcube == 60 || AIcube == 70 || AIcube == 80){
                    AIdecision = Math.floor(Math.random() * 3)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 2){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube == 19 || AIcube == 29 || AIcube == 39 || AIcube == 49 || AIcube == 59 || AIcube == 69 || AIcube == 79 || AIcube == 89){
                    AIdecision = Math.floor(Math.random() * 3)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 2){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube == 0){
                    AIdecision = Math.floor(Math.random() * 2)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube == 9){
                    AIdecision = Math.floor(Math.random() * 2)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube == 99){
                    AIdecision = Math.floor(Math.random() * 2)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube == 90){
                    AIdecision = Math.floor(Math.random() * 2)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube > 0 && AIcube < 9){
                    AIdecision = Math.floor(Math.random() * 3)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 2){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                else if(AIcube > 90 && AIcube < 99){
                    AIdecision = Math.floor(Math.random() * 3)
                    if(AIdecision == 0){
                        if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                            document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                    else if(AIdecision == 2){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube - 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            if(AIcubes.length < 2){
                                document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                            }
                            else{
                                AITurn();
                            }
                        }
                    }
                }
                    else{
                        AIdecision = Math.floor(Math.random() * 4)
                        if(AIdecision == 0){
                            if(document.getElementById(AIcube - 10).getAttribute("owner") == gamer){
                                document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 10).getAttribute("power"))) - 1);
                                document.getElementById(AIcube).setAttribute("power", 1)
                                document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                                document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                            }
                            else if(Number(document.getElementById(AIcube - 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 10).getAttribute("power"))){
                                document.getElementById(AIcube - 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube - 10).getAttribute("power")) - 1));
                                document.getElementById(AIcube).setAttribute("power", 1)
                                document.getElementById(AIcube - 10).style.backgroundColor = player[gamer]
                                document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                                document.getElementById(AIcube - 10).innerHTML = document.getElementById(AIcube - 10).getAttribute("power")
                                players[gamer] = players[gamer] + 1;
                                players[document.getElementById(AIcube - 10).getAttribute("owner")] = players[document.getElementById(AIcube - 10).getAttribute("owner")] - 1;
                                document.getElementById(AIcube - 10).setAttribute("owner", gamer)
                            }
                            else{
                                if(AIcubes.length < 2){
                                    document.getElementById(AIcube).setAttribute("power", document.getElementById(AIcube).getAttribute("power") + 1);
                                }
                                else{
                                    AITurn();
                                }
                            }
                        }
                    else if(AIdecision == 1){
                        if(document.getElementById(AIcube + 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 1).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 1).getAttribute("power"))){
                            document.getElementById(AIcube + 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 1).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 1).innerHTML = document.getElementById(AIcube + 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 1).getAttribute("owner")] = players[document.getElementById(AIcube + 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 1).setAttribute("owner", gamer)
                        }
                        else{
                            AITurn();
                        }
                    }
                    else if(AIdecision == 2){
                        if(document.getElementById(AIcube + 10).getAttribute("owner") == gamer){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube + 10).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube + 10).getAttribute("power"))){
                            document.getElementById(AIcube + 10).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube + 10).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube + 10).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube + 10).getAttribute("owner")] = players[document.getElementById(AIcube + 10).getAttribute("owner")] - 1;
                            document.getElementById(AIcube + 10).setAttribute("owner", gamer)
                        }
                    else if(AIdecision == 3){
                        if(document.getElementById(AIcube - 1).getAttribute("owner") == gamer){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) + Number(document.getElementById(AIcube - 1).getAttribute("power"))) - 1);
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube + 10).getAttribute("power")
                        }
                        else if(Number(document.getElementById(AIcube + 10).getAttribute("owner")) != gamer && (Number(document.getElementById(AIcube).getAttribute("power")) - 1) > Number(document.getElementById(AIcube - 1).getAttribute("power"))){
                            document.getElementById(AIcube - 1).setAttribute("power", (Number(document.getElementById(AIcube).getAttribute("power")) - Number(document.getElementById(AIcube + 10).getAttribute("power")) - 1));
                            document.getElementById(AIcube).setAttribute("power", 1)
                            document.getElementById(AIcube - 1).style.backgroundColor = player[gamer]
                            document.getElementById(AIcube).innerHTML = document.getElementById(AIcube).getAttribute("power")
                            document.getElementById(AIcube - 1).innerHTML = document.getElementById(AIcube - 1).getAttribute("power")
                            players[gamer] = players[gamer] + 1;
                            players[document.getElementById(AIcube - 1).getAttribute("owner")] = players[document.getElementById(AIcube - 1).getAttribute("owner")] - 1;
                            document.getElementById(AIcube - 1).setAttribute("owner", gamer)
                        }
                        else{
                            AITurn();
                        }
                    }
                }
            }
        }
            AITurn();
            gamer = gamer + 1;
            isdead();
            if(gamer >= player.length){
                gamer = 0;
                isdead();
            }
        }
    }
}
function StrongestCube(){
    strongestplayer = null;
    strongestpower = null;
    for(i = 0; i < players.length; i++){
        totalcubes = 0;
        totalpower = 0;
        for(j = 0; j < 100; j++){
            if(document.getElementById(j).getAttribute("owner") == i){
                totalcubes = totalcubes + 1;
                totalpower = totalpower + Number(document.getElementById(j).getAttribute("power"));
            }
        }
        contender = (totalcubes * totalpower)
        if(contender > strongestpower){
            strongestplayer = i;
            strongestpower = contender;
        }
    }
    document.getElementById("strongestplayer").style.backgroundColor = player[strongestplayer]
}