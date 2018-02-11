var app = angular.module('academico', ["ngResource"]);//Creamos el modulo


app.controller("AcademicoController", function($scope, dataResource){//creamos el controlador
											   
    //datosResource lo tenemos disponible en la vista gracias a $scope
    $scope.items = dataResource.get();

$scope.producto_sel=-1;											   
$scope.tipo_pago='efectivo';
$scope.tarjcred=false;
$scope.tarjeta='';


filaselect=0;

<!---------------- Listas -------------------------->
  $scope.listabanco = [
                    { value: "0", label: "Banco de Venezuela" },
                    { value: "1", label: "Banco Mercantil" },
					{ value: "2", label: "Banesco"},
					{ value: "3", label: "Banco Occidental de Descuento BOD"},
					{ value: "4", label: "BBVA Provincial"},
					{ value: "5", label: "Banco Exterior"},
					{ value: "6", label: "Banco Venezolano de Crédito"},
					{ value: "7", label: "Bancaribe"},
					{ value: "8", label: "Banco del Tesoro"},
					{ value: "9", label: "Banco Fondo Común"},
					{ value: "10", label: "Banplus"},
					{ value: "11", label: "Bicentenario Banco Universal"},
					{ value: "12", label: "Banco Activo"},
					{ value: "13", label: "Citibank"},
					{ value: "14", label: "" }
             ];

 	$scope.banco = $scope.listabanco[14].value; 
                


<!----------------- funciones -------------------------->

$scope.limpiar = function() {	
	$scope.items.length = 0; 
	$scope.tarjcred=false;
	$scope.producto_sel=-1;
};


$scope.cerrar = function() {	
	window.close();
	/*var popup = window.open(location, '_self', '');
	popup.close();*/
	//javascript:self.close();
};

$scope.agregar = function() {	

	
	$scope.items.push ({"idprod": $scope.idprod,"nombreprod": $scope.nombre, "descripcion": $scope.descripcion, "fecha": $scope.fecha,"precio": $scope.precio,"cantidad": $scope.cantidad, "imagen":$scope.imagen,"tipo_pago": $scope.tipo_pago,"banco":$scope.banco,"tarjeta":$scope.tarjeta,"numero_tarjeta":$scope.num_tarj,"mes":$scope.mes,"ano":$scope.ano,"nombreyapellido":$scope.nombre_apellido,"clave":$scope.clave}); 

$scope.tarjcred=false;
$scope.producto_sel=-1;
document.getElementById("myform").reset();
};


$scope.oc = function(id) {	
	
	for (var i=1; i<$scope.items.length+1; i++) {
		//alert ($scope.items[i].precio);
		  if (i == id) {
			$scope.items[i-1].visible = false;
			break;
		  }
	}
};


$scope.eliminar = function(id) {	
	//delete $scope.items[id];
	$scope.items.splice(id-1,1);
};


$scope.enfila = function(id) {	
	id++;
	 //$("#" + id).css('background', '#05f');
	 	//alert (filaselect);
	  $("#" + filaselect).toggleClass('tablaselect');
	  $("#" + id).toggleClass('tablaselect');
	  filaselect=id;
};

/*$scope.apagarfila = function(id) {	
	id++;
	 //$("#" + id).css('background', '#000');
	 console.log (filaselect);
	  $("#" + filaselect).toggleClass('tablaunselect');
};*/


$scope.editar = function(id) {
	//alert ($scope.producto_sel);
	$scope.producto_sel=id;
	$scope.idprod=$scope.items[id].idprod;
	$scope.nombre=$scope.items[id].nombreprod;
	$scope.descripcion=$scope.items[id].descripcion;
	$scope.cantidad=parseInt($scope.items[id].cantidad);
	$scope.precio=parseFloat($scope.items[id].precio);

	$scope.imagen=$scope.items[id].imagen;
	
	$scope.fecha=fechadmy($scope.items[id].fecha);

	$scope.banco=$scope.listabanco[$scope.items[id].banco].value;
	if ($scope.banco==''){$scope.tarjcred=false;}

	$scope.tipo_pago=$scope.items[id].tipo_pago;
	//muestra el div tarjeta de crédito
	if ($scope.items[id].tipo_pago=='credito'){$scope.tarjcred=true;}else{$scope.tarjcred=false;}
	
	$scope.tarjeta=$scope.items[id].tarjeta;
	
	$scope.num_tarj=parseInt($scope.items[id].numero_tarjeta);
	$scope.mes=parseInt($scope.items[id].mes);
	$scope.ano=parseInt($scope.items[id].ano);
	$scope.nombre_apellido=$scope.items[id].nombreyapellido;
	$scope.clave=parseInt($scope.items[id].clave);
	window.location.href = "#firstSection";	
};


$scope.guardar_modificar = function() {
	id=$scope.producto_sel;
	$scope.items[id].idprod=$scope.idprod;
	$scope.items[id].nombreprod=$scope.nombre;
	$scope.items[id].descripcion=$scope.descripcion;
	$scope.items[id].cantidad=$scope.cantidad;
	$scope.items[id].precio=$scope.precio;

	$scope.items[id].imagen=$scope.imagen;
	
	var fechaact=$('#fecha').val();
	$scope.items[id].fecha=fechautc(fechaact);

	$scope.items[id].banco=$scope.banco;

	$scope.items[id].tipo_pago=$scope.tipo_pago;
	
	$scope.items[id].tarjeta=$scope.tarjeta;
	
	$scope.items[id].numero_tarjeta=$scope.num_tarj;
	$scope.items[id].mes=$scope.mes;
	$scope.items[id].ano=$scope.ano;
	$scope.items[id].nombreyapellido=$scope.nombre_apellido;
	$scope.items[id].clave=$scope.clave;
	$scope.producto_sel=-1;
	document.getElementById("myform").reset();
};

$scope.mostrarocultos = function(id) {	
	
	for (var i=1; i<$scope.items.length+1; i++) {
			$scope.items[i-1].visible = true;
	}
};

$scope.obtener_tipo_pago = function(a,b,c) {	
	if (a==true){console.log(a);return 'Efectivo';} 
	if (b==true){console.log(b);return 'Contado';} 
	if (c==true){console.log(c);return 'Crédito';} 
};


});

// ------------------------fin app angular ------------------------

app.directive('tablaproductos', function() {
  return {
    restrict: 'E',
    scope: {
      data: '=info'
    },
    templateUrl: 'tabla_productos.html'
  };
});

//de esta forma tan sencilla consumimos con $resource en AngularJS
app.factory("dataResource", function ($resource) {
    return $resource("json/data.json", {}, { get: { method: "GET", isArray: true }
    })
})


app.filter('filterWithOr', function ($filter) {
      var comparator = function (actual, expected) {
        if (angular.isUndefined(actual)) {
          // No substring matching against `undefined`
          return false;
        }
        if ((actual === null) || (expected === null)) {
          // No substring matching against `null`; only match against `null`
          return actual === expected;
        }
        if ((angular.isObject(expected) && !angular.isArray(expected)) || (angular.isObject(actual) && !hasCustomToString(actual))) {
          // Should not compare primitives against objects, unless they have custom `toString` method
          return false;
        }

        actual = angular.lowercase('' + actual);
        if (angular.isArray(expected)) {
          var match = false;
          expected.forEach(function (e) {
            e = angular.lowercase('' + e);
            if (actual.indexOf(e) !== -1) {
              match = true;
            }
          });
          return match;
        } else {
          expected = angular.lowercase('' + expected);
          return actual.indexOf(expected) !== -1;
        }
      };
      return function (campaigns, filters) {
        return $filter('filter')(campaigns, filters, comparator);
      };
    });


function fechadmy(fecha){
	var fecha_r= fecha.substring(0, 4) + '-' + fecha.substring(4, 6)  + '-' + fecha.substring(6, 8) ;
	//alert (fecha_r);
	return fecha_r;
}


function fechautc(fecha){
	//20170422T00:00:00
	var fecha_r2= fecha.substring(0, 4) +fecha.substring(5, 7) + fecha.substring(8, 10) + 'T00:00:00' ;
	//alert (fecha_r);
	return fecha_r2;
}


//-------------------------------------------------FULL PAGE JS

// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});



// fullpage customization
$('#fullpage').fullpage({
  sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
  sectionSelector: '.vertical-scrolling',
  slideSelector: '.horizontal-scrolling',
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
  menu: '#menu',

  afterLoad: function(anchorLink, index) {
    $header_top.css('background', 'rgba(0, 47, 77, .3)');
    $nav.css('background', 'rgba(0, 47, 77, .25)');
    if (index == 5) {
        $('#fp-nav').hide();
      }
  },

  onLeave: function(index, nextIndex, direction) {
    if(index == 5) {
      $('#fp-nav').show();
    }
  },

  afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(false, 'up');
      $header_top.css('background', 'transparent');
      $nav.css('background', 'transparent');
      $(this).css('background', '#374140');
      $(this).find('h2').css('color', 'white');
      $(this).find('h3').css('color', 'white');
      $(this).find('p').css(
        {
          'color': '#DC3522',
          'opacity': 1,
          'transform': 'translateY(0)'
        }
      );
    }
  },

  onSlideLeave: function( anchorLink, index, slideIndex, direction) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(true, 'up');
      $header_top.css('background', 'rgba(0, 47, 77, .3)');
      $nav.css('background', 'rgba(0, 47, 77, .25)');
    }
  } 
});