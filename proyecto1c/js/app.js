var app = angular.module('academico', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);//Creamos el modulo

app.controller("AcademicoController", function($scope, $mdDialog){//creamos el controlador
//array de profesores
$scope.lista_profesores = [
 {
	ref: "P-2017-1",
	img: "img/profesor.jpg",
 	apellido : "Perez Ortega",	
 	nombre : "Juan Andrés",
 	cedula : "18.269.370",
 	sexo : "masculino",
 	nacimiento : "24/01/1960",
 	rif : "V-18.269.370",
 	email1 : "juan_perez@gmail.com",
 	email2 : "juan_perez@yahoo.com",
 	cel : "0424-589-70-60",
 	tel1 : "0212-963-70-90",
 	tel2 : "0212-697-66-70",
 	web : "www.juan_perez.com",
	color_letra : "azul oscuro",
	guardar: true,
	limpiar: true,
	salir: true,
 },
 {
	ref: "P-2017-2",
	img: "img/profesora.jpg",
 	apellido : "Romero",	
 	nombre : "Dianne Josefina",
 	cedula : "12.269.370",
 	sexo : "Femenino",
 	nacimiento : "25/06/1955",
 	rif : "V-12.269.370",
 	email1 : "dianne_romero@gmail.com",
 	email2 : "dianne_romero@yahoo.com",
 	cel : "0424-489-70-60",
 	tel1 : "0212-963-80-90",
 	tel2 : "0212-693-66-70",
 	web : "no tiene",
	color_letra : "azul oscuro",
	guardar: false,
	limpiar: false,
	salir: true,
 }];

		limpiar = function() {	
			$scope.lista_profesores.length = 0; 
		};

	
 $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAlert = function(ev) {
	  
     
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('')
        .textContent('Los datos se han guardado con éxito…')
        .ariaLabel('Alert Dialog Demo')
        .ok('Aceptar!')
        .targetEvent(ev)
    );
  };
  
  
	
  function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
		  $mdDialog.hide();
		};
	
		$scope.cancel = function() {
		  $mdDialog.cancel();
		};
	
		$scope.answer = function(answer) {
		  $mdDialog.hide(answer);
		};

		
	};
	 
 	this.profesores = $scope.lista_profesores;

});
