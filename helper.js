        var feriaxhr = new XMLHttpRequest();
        var commxhr = new XMLHttpRequest();

        feriaxhr.open("GET","http://missa.standroid.ca/cgi-bin/missa/feria.html",true);
        feriaxhr.onload = function()  {
			$('feria').innerText = feriaxhr.responseText;
		}
        feriaxhr.send(null);

        commxhr.open("GET","http://missa.standroid.ca/cgi-bin/missa/commemoration.html",true);
        commxhr.onload = function()  {
			$('commemoration').innerText = commxhr.responseText;
		}
        commxhr.send(null);
