var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.397,
            lng: 20.644
        },
        zoom: 8
    });

    var myLatlng = new google.maps.LatLng(50.061389, 19.938333);

    var marker = new google.maps.Marker({
        position: myLatlng,
        draggable: true,
        title: "Hello World!"
    });

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content: "Tu zaczynam wszytskie podróże  "
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

var link = 'https://restcountries.eu/rest/v2/all';

function startApi(n) {
    var api = $.get(link)
        .done(function(data) {

            var numerPanstwa = n - 1;


            $("#nazwa").html(data[numerPanstwa].name); // nazwy pol pochodza z json, ulatwi https://jsonformatter.org/json-pretty-print
            $("#stolica").html(data[numerPanstwa].capital);
            $("#waluta").html(data[numerPanstwa].currencies[0].symbol);
            $("#flaga").attr("src", data[numerPanstwa].flag);

        })
        .fail(function(data) {
            alert('blad api');
        });
}



function myFunction() {

    startApi($("#liczba").val());

};

function quiz() {

    $("#pytanie").html(data[10].name);

}

function quizFunction() {
    var d = new Date();
    var mm = d.getMilliseconds();

    var api = $.get(link)

    .done(function(data) {

            var numerPanstwa = mm % 250;
            $("#pytanie").html(" Jaka jest stolica państwa " + data[numerPanstwa].name + "?");

            $("#A").css('color', 'white').removeClass("odpowiedz");
            $("#B").css('color', 'white').removeClass("odpowiedz");
            $("#C").css('color', 'white').removeClass("odpowiedz");

            $("#inlineRadio1").removeClass("important");
            $("#inlineRadio2").removeClass("important");
            $("#inlineRadio3").removeClass("important");
			
			var a=data[numerPanstwa].capital;
			if(a=="") a=data[numerPanstwa].name;
			var b=data[(numerPanstwa + 23) % 251].capital;
			if(b=="") b=data[(numerPanstwa + 23) % 251].name; 
			var c=data[(numerPanstwa + 178) % 251].capital;
			if(c=="") c=data[(numerPanstwa + 178) % 251].capital;
			

            if (mm % 3 == 0) {
                $("#A").html(a);
                $("#B").html(b);
                $("#C").html(c);
                $("#inlineRadio1").addClass("important");
                $("#A").addClass("odpowiedz");

            } else if (mm % 3 == 1) {
                $("#A").html(c);
                $("#B").html(a);
                $("#C").html(b);
                $("#inlineRadio2").addClass("important");
                $("#B").addClass("odpowiedz");
            } else {
                $("#A").html(b);
                $("#B").html(c);
                $("#C").html(a);
                $("#inlineRadio3").addClass("important");
                $("#C").addClass("odpowiedz");
            }

            $("#wybor").show();
            $("#inlineRadio1").attr('disabled', false);
            $("#inlineRadio2").attr('disabled', false);
            $("#inlineRadio3").attr('disabled', false);
            $("#inlineRadio1").prop('checked', false);
            $("#inlineRadio2").prop('checked', false);
            $("#inlineRadio3").prop('checked', false);
            $("#wynik").text("");

        })
        .fail(function(data) {
            alert('blad api');
        });
}

function odpFunction() {

    if ($(".important").is(':checked')) {
        $("#wynik").text("Dobra odpowiedź!");
        $(".odpowiedz").css('color', '#33cc33');
    } else {
        $("#wynik").text("Zła odpowiedź!");
        $(".odpowiedz").css('color', '#ff3300');
    }

    $("#inlineRadio1").attr('disabled', true);
    $("#inlineRadio2").attr('disabled', 'disabled');
    $("#inlineRadio3").attr('disabled', 'disabled');



};