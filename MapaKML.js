class Ejercicio13 {
    constructor() {
        // this.rutaKML = "red.kml";
    }

    leer(files) {
        var archivo = files[0];
        var reader = new FileReader();
        reader.onload = function (evento) {

            var kml = reader.result;
            kml.replace("\n", "");
            kml.replace("\r", "");
            var xml = $.parseXML(kml);

            var placemarks = $('placemark', xml);
            var coordinates = $('coordinates', xml);
            var c = new Array();
            for (let i = 0; i < coordinates.length; i++) {
                c.push(coordinates[i].textContent);
            }

            var names = $('name', xml);
            var n = new Array();
            for (let i = 0; i < names.length; i++) {
                n.push(names[i].textContent);
            }
            var centro = { lat: 40.416895133420645, lng: -3.703282134664379 };//el centro por defecto esta en el km0 en madrid
            var mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0], {//crea el mapa dinámico
                zoom: 5,
                center: centro,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            for (let i = 0; i < n.length; i++) {
                let coord = c[i].split(",");
                let infoWindow = new google.maps.InfoWindow;
                var pos = {
                    lat: parseFloat(coord[1]),
                    lng: parseFloat(coord[0])
                };
                infoWindow.setPosition(pos);//seteamos la posicion
                infoWindow.setContent(n[i]);//lo que trae el infowindow
                infoWindow.open(mapaGeoposicionado);

            }


        }
        
        reader.readAsText(archivo);
        
        
    }

    initMap() {
        var centro = { lat: 40.416895133420645, lng: -3.703282134664379 };//el centro por defecto esta en el km0 en madrid
        this.mapaGeoposicionado = new google.maps.Map(document.getElementsByTagName('main')[0], {//crea el mapa dinámico
            zoom: 5,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }



}
var ej13 = new Ejercicio13();