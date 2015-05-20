/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

startApp();


function startApp() {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Casa',
        icon: 'images/home_icon.png',
        subtitle: 'Rumbo a casa',
        identifier: 1
      }, {
        title: 'Trabajo',
        subtitle: 'Rumbo al trabajo',
        icon: 'images/work_icon.png',
        identifier: 2
      }]
    }]
  });
  
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    console.log('The item identifier "' + e.item.identifier + '"');
   
    var menuStops = new UI.Menu();
    var count = 0;
    
    if (e.item.identifier == 1) {
      
      menuStops.item(0, count++, { 
            title: 'Silla del Rey',
            subtitle: 'Línea L',
            icon: 'images/bus_icon.png',
            identifier: 1207 
      });
       
      menuStops.item(0, count++, { 
            title: 'Puente La Arganosa',
            subtitle: 'Línea J',
            icon: 'images/bus_icon.png',
            identifier: 1181
      });
      
      menuStops.item(0, count++, { 
            title: 'Independencia',
            subtitle: 'Líneas L y J',
            icon: 'images/bus_icon.png',
            identifier: 1111
      });
      
      menuStops.item(0, count++, { 
            title: 'Uria Centro',
            subtitle: 'Líneas L y J',
            icon: 'images/bus_icon.png',
            identifier: 1218
      });
      
      menuStops.item(0, count++, { 
            title: 'Marques de santa Cruz',
            subtitle: 'Líneas L y J',
            icon: 'images/bus_icon.png',
            identifier: 4143
      });
      
      menuStops.item(0, count++, { 
            title: 'Arz. Guisasola Campillin',
            subtitle: 'Líneas L y J',
            icon: 'images/bus_icon.png',
            identifier: 1011
      });

    } else {
      
      menuStops.item(0, count++, { 
            title: 'Cruce Villafria',
            subtitle: 'Línea L',
            icon: 'images/bus_icon.png',
            identifier: 4050 
      });
       
      menuStops.item(0, count++, { 
            title: 'Velasquita',
            subtitle: 'Línea J',
            icon: 'images/bus_icon.png',
            identifier: 1227
      });
      
      menuStops.item(0, count++, { 
            title: 'San Lázaro',
            subtitle: 'Líneas L y J',
            icon: 'images/bus_icon.png',
            identifier: 4200
      });
    }
    
     menuStops.on('select', function(e) {
       
      
        getStopCards(e.item.identifier);
       
       
     });
      
      menuStops.show();
  });
 
  menu.show();

}


function getStopCards(stop) {
  
 
  ajax({ url: 'http://www.tua.es/rest/estimaciones/' + stop, type: 'json' },
         function(data) {

           var busMenu = new UI.Menu();
           
           var count = 0;
           for (var i=0; i<data.estimaciones.value.publicEstimation.length; i++) { 
             var timeInSeconds = data.estimaciones.value.publicEstimation[i].vh_first.seconds;
             var meters = data.estimaciones.value.publicEstimation[i].vh_first.meters;
             var timeInMinutesString = (timeInSeconds < 60) ? 'Inminente' : '' + (timeInSeconds / 60).toFixed(0) + ' min. (' + meters + 'm)';
             var linea = data.estimaciones.value.publicEstimation[i].vh_first.destino.substr(0, 2);
             var title = '';
             var icon = '';
             var add = false;
             
             if (linea == "L1") {
               icon = 'images/L1_icon.png';
               title = "OTERO";
               add = true;
             } else if (linea == "L2") {
               icon = 'images/L2_icon.png';
               title = "SAN CLAUDIO";
               add = true;
             } else if (linea == "J1") {
               icon = 'images/J1_icon.png';
               title = "TUDELA VEGIN";
               add = true;
             } else if (linea == "J2") {
               icon = 'images/J2_icon.png';
               title = "SAN ANDRES";
               add = true;
             } else {
               add = false;
             }
             
             if (add === true) {
               busMenu.item(0, count++, {  title: title, icon: icon, subtitle: timeInMinutesString });
             }
           }
           
          busMenu.show();
         
         },function(error) {
        console.log('Download failed: ' + error);
        });
}
