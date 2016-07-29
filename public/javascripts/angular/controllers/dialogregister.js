(function(){
	//'use strict';

	angular
		.module('culturi')
		.controller('registerDialog', registerDialog);

		var PLACE_ID = "57840161e3c5073e9a7a4841";
		var EVENT_ID = "57840161e3c5073e9a7a4842";
		registerDialog.$inject = ['$scope', '$q', '$mdDialog', '$http', 'culturiURL', '$location', 'Upload'];

		function registerDialog($scope, $q, $mdDialog, $http, culturiURL, $location, Upload){
            var vm = this;

			$scope.showRegister = showRegister;
			$scope.hide = hide;
    		$scope.cancel = cancel;
    		$scope.answer = answer;
            $scope.getFoto = getPhoto;0

			function showRegister(){
				return $mdDialog.show({
					controller: registerDialog,
					controllerAs: 'rm',
					templateUrl: 'partials/form.html',
					parent: angular.element(document.body),
					clickOutsideToClose: true
				});
			};

			function hide() {
		      return $mdDialog.hide();
		    };

		    function cancel() {
		      return $mdDialog.cancel();
		    };

		    function answer(answer, registro, lo) {
                if($scope.form.file.$valid && registro.file) {
                    getPhoto(registro.file)
                        .then(function(reader){
                            // console.log(JSON.stringify(vm.photo));
                            return vm.photo = reader;
                        })
                        .then(function(){
                            var json = preparaJson(lo,registro);
                            console.log(json);
                        });
                } else {
                    var json = preparaJson(lo,registro);
                    console.log(json);
                }

		        return $mdDialog.hide(answer);
		     };

            function getPhoto(file){
                var deferred = $q.defer();
                var reader = new window.FileReader();
        
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    deferred.resolve(e.target.result);
                };

                return deferred.promise;
            };

		     function trata_data(data){
		   
		     	var date = JSON.stringify(data);
		     	
		     	var indice = date.search("T");
		     	
		     	return date.slice(1,indice);

		     };


		     function horas_to_float(date){
		     					
				var time_initial = document.getElementById("timeI");
				var time_final = document.getElementById("timeF");
		     	var result, aux1, aux2;

		     	aux1 = time_initial.value.split(":");
		     	aux2 = time_final.value.split(":");

		     	result = {
		     		time_i: (aux1[0]/60) + aux1[1],
		     		time_f: (aux2[0]/60) + aux2[1]
		     	};

		     	return result;
		     };

		    function preparaJson(lo, registro){
		    	var json = {};
		    	var lat, lng;
		    	var initial_date;
		    	var final_date;
		    	var time_initial;
		    	var horas;
		    	var id_categorie;

		    	if(lo == undefined){
		    		lat = 0;
		    		lng = 0;
		    	}else{
		    		lat = lo.location.lat();
		   			lng = lo.location.lng();
		    	}

		   		initial_date = trata_data(registro.initial_date);
		   		final_date = trata_data(registro.final_date);
		   		//time_initial = horas_to_float(registro.time_initial);
		   		horas = horas_to_float(registro.time_initial);

		   		if(registro.id === "Evento"){
		   			id_categorie = EVENT_ID;
		   		}else if(registro.id === "Lugar"){
		   			id_categorie = PLACE_ID;
		   		}
		   		if (registro.all_day == null) {
		   			registro.all_day = true;
		   		}

                var json = {
                 	"category_id" : id_categorie,
                 	"title" : registro.title,
                 	"address" : registro.address,
                 	"district" : lo.district,
                 	"description" : registro.discription,
                 	"city"	   : lo.city,
                 	"state"    : lo.state,
                 	"location" : [lat, lng],
                 	"cover"	   : vm.photo,
                 	"date_info" : {
                 	   "initial_date": initial_date,
				       "final_date" : final_date, 
				       "open_time" : horas.time_i, 
				       "close_time" : horas.time_f,
				       "repeat": "1111111",
				       "all_day" : registro.all_day, 
				       "always": false
                 	},
                 	"price_info"     : {
				        "min" : 0,
				        "max" : registro.price,
				        "payment" : [
				            "Dinheiro", 
				            "Cartao",
				            "Debito"],
				        "payment_details" : ""
				    }
                };
		    	
		    	// $http.post(culturiURL.API_URL + culturiURL.HERITAGE_URL,json).
		    	// 	success(function (response, status){
		    	// 		window.alert( registro.id+" criado com Sucesso!");
		    	// 	}).
		    	// 	error(function(headers, config, data){
		    	// 		window.alert("O "+registro.id+" não foi criado. Por favor tentar novamente.");
		    	// 	});
		    	// console.log(json);

		    	return json;
		    };
		};
})();